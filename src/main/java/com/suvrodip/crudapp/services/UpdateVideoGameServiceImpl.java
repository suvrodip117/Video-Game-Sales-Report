package com.suvrodip.crudapp.services;

import com.suvrodip.crudapp.models.Game;
import com.suvrodip.crudapp.models.dto.UpdateGameRequestDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UpdateVideoGameServiceImpl implements UpdateVideoGameService{

    private final GameRepository gameRepository;

    @Autowired
    public UpdateVideoGameServiceImpl(GameRepository gameRepository){
        this.gameRepository=gameRepository;
    }

    @Override
    public String updateVideoGameById(Integer id, UpdateGameRequestDTO request){
        Game gameFound= gameRepository.findById(id).orElseThrow();

        gameFound.setGameRank(request.getGameRank());
        gameFound.setName(request.getName());
        gameFound.setPlatform(request.getPlatform());
        gameFound.setPlatformGroup(request.getPlatformGroup());
        gameFound.setGameYear(request.getGameYear());
        gameFound.setGenre(request.getGenre());
        gameFound.setPublisher(request.getPublisher());
        gameFound.setNaSales(request.getNaSales());
        gameFound.setEuSales(request.getEuSales());
        gameFound.setJpSales(request.getJpSales());
        gameFound.setOtherSales(request.getOtherSales());
        gameFound.setGlobalSales(request.getGlobalSales());

        gameRepository.save(gameFound);

        return "Video Game ID "+id+" has been updated.";
    }
}
