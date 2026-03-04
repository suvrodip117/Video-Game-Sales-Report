package com.suvrodip.crudapp.controllers;

import com.suvrodip.crudapp.models.dto.MetricsDTO;
import com.suvrodip.crudapp.models.dto.PredictionDTO;
import com.suvrodip.crudapp.models.Game;
import com.suvrodip.crudapp.models.dto.TrainingResponseDTO;
import com.suvrodip.crudapp.models.dto.UpdateGameRequestDTO;
import com.suvrodip.crudapp.services.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.HttpEntity;


import java.util.List;

@RestController
@RequestMapping(value = "/api")
@CrossOrigin(origins = "${frontend-url}")
public class GameController {

    private final GameRepository gameRepository;
    private final MetricsExportService metricsExportService;
    private final UpdateVideoGameService updateVideoGameService;
    private final DeleteVideoGameService deleteVideoGameService;

    @Value("${ml.service.base-url}")
    private String machineLearningBaseURL;
    @Value("${ml.service.train}")
    private String machineLearningTrainEndpoint;
    @Value("${ml.service.predict}")
    private String machineLearningPredictEndpoint;

    @Autowired
    public GameController(GameRepository gameRepository,
                          @Qualifier("excel_export_report_service") MetricsExportService metricsExportService,
                          UpdateVideoGameService updateVideoGameService,
                          DeleteVideoGameService deleteVideoGameService){
        this.gameRepository=gameRepository;
        this.metricsExportService=metricsExportService;
        this.updateVideoGameService = updateVideoGameService;
        this.deleteVideoGameService=deleteVideoGameService;
    }

    @GetMapping(value = "/getall")
    public List<Game> fetchGames(){
        return gameRepository.findAll();
    }

    @GetMapping(value = "/getdropdowns")
    public List<String> getPlatformDropdowns(@RequestParam String paramName){
        System.out.println("Distinct dropdown service called!!");
        return switch (paramName) {
            case "platform" -> gameRepository.getPlatforms();
            case "platformGroup" -> gameRepository.getPlatformGroups();
            case "genre" -> gameRepository.getGenres();
            default -> throw new IllegalArgumentException("Invalid parameter name passed!");
        };
    }


    @PostMapping(value = "/savegame")
    public String saveGame(@RequestBody Game game)
    {
        try
        {
            System.out.println(game);
            gameRepository.save(game);
            return "Game saved successfully.";
        }
        catch (Exception e)
        {
            return "Error while saving " + e.getMessage();
        }
    }

    @PutMapping(value = "/updategame")
    public String updateGame(@RequestParam("id") Integer id, @RequestBody UpdateGameRequestDTO request)
    {
        return this.updateVideoGameService.updateVideoGameById(id, request);
    }

    @DeleteMapping(value = "/deletegame")
    public String deleteGame(@RequestParam("id") Integer id)
    {
        return this.deleteVideoGameService.deleteVideoGame(id);
    }

    @PostMapping(value = "/train")
    public TrainingResponseDTO trainModel()
    {
        final RestTemplate restTemplate = new RestTemplate();
        try{
            System.out.println("Train Button Clicked1");
            String mlServiceUrl = machineLearningBaseURL+machineLearningTrainEndpoint;
            System.out.println("mlServiceUrl->"+mlServiceUrl);
            TrainingResponseDTO response = restTemplate.postForObject(mlServiceUrl, null, TrainingResponseDTO.class);
            System.out.println(response);
            return response;
        }
        catch(Exception e)
        {
            e.printStackTrace();
            TrainingResponseDTO response = new TrainingResponseDTO();
            response.setStatus("Error while training the model");
            return response;
        }
    }

    @PostMapping(value = "/predict")
    public ResponseEntity<?> predictModel(@RequestBody PredictionDTO request){
        final RestTemplate restTemplate = new RestTemplate();
        try{
            String mlServiceUrl = machineLearningBaseURL + machineLearningPredictEndpoint;
            System.out.println(request);
            System.out.println(mlServiceUrl);
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            HttpEntity<PredictionDTO> entity =new HttpEntity<>(request, headers);
            ResponseEntity<Object> response =restTemplate.postForEntity(mlServiceUrl,entity,Object.class);
            System.out.println(response);
            return ResponseEntity.ok(response.getBody());
        }
        catch(Exception e){
            e.printStackTrace();
            return ResponseEntity.internalServerError().body("Error while predicting model");
        }
    }

    @PostMapping(value="/report/model")
    public ResponseEntity<byte[]> downloadModelMetricsReport(@RequestBody MetricsDTO request){
        //System.out.println(request);
        try{
            byte spreadsheetData[]=metricsExportService.generateMetricsSpreadSheet(request.getMetrics(), request.getModelName(), request.getPlot());
            //System.out.println("spreadsheetData--"+ Arrays.toString(spreadsheetData));
            return ResponseEntity.ok().
                    header(HttpHeaders.CONTENT_DISPOSITION,"attachment; filename=" + metricsExportService.getMetricsFileName()).
                    contentType(metricsExportService.getMetricsMediaType()).
                    body(spreadsheetData);
        }
        catch(Exception e){
            e.printStackTrace();
            return ResponseEntity.internalServerError().build();
        }
    }

    //--------------pinging to fastapi render endpoint to stop server sleep-----------
    @GetMapping(value = "/ping")
    public String pingAppScript(){
        System.out.println("app script called");
        return "pinged";
    }

}
