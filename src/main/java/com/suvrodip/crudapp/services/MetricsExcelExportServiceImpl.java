package com.suvrodip.crudapp.services;

import org.apache.poi.ss.usermodel.*;
import org.apache.poi.util.IOUtils;
import org.apache.poi.xssf.usermodel.XSSFClientAnchor;
import org.apache.poi.xssf.usermodel.XSSFDrawing;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;
import java.util.Map;
import java.io.ByteArrayOutputStream;

@Service("excel_export_report_service")
public class MetricsExcelExportServiceImpl implements MetricsExportService {
    @Override
    public byte[] generateMetricsSpreadSheet(Map<String, Double> metrics, String modelName, Map<String,String>plot) {
        Workbook workbook = new XSSFWorkbook();
        Sheet sheet = workbook.createSheet(modelName);

        Row row = sheet.createRow(0);
        System.out.println("metrics--"+metrics);
        //System.out.println("plot-->"+plot);
        List<String> metricsKeyList=new ArrayList<>(metrics.keySet());
        for(int i=0;i<metricsKeyList.size();i++)
        {
            String key=metricsKeyList.get(i);
            Cell cell=row.createCell(i);
            cell.setCellValue(key);
        }

        row = sheet.createRow(1);
        List<Double> metricsValueList = new ArrayList<>(metrics.values());
        for (int i = 0; i < metricsValueList.size(); i++) {
            double value = metricsValueList.get(i);
            Cell cell = row.createCell(i);
            cell.setCellValue(value);
        }

        //adding plot images to Excel
        int startingRowPos = 5;
        for (Map.Entry<String, String> entry: plot.entrySet()){
            String key=entry.getKey();
            String val=entry.getValue();
            byte[] imgBytes = Base64.getDecoder().decode(val);
            int imgIndex = workbook.addPicture(imgBytes, Workbook.PICTURE_TYPE_PNG);
            XSSFDrawing drawing = (XSSFDrawing) sheet.createDrawingPatriarch();
            XSSFClientAnchor anchorObj=new XSSFClientAnchor();

            anchorObj.setCol1(2);
            anchorObj.setRow1(startingRowPos);
            anchorObj.setCol2(3);
            anchorObj.setRow2(startingRowPos+1);
            Picture img=drawing.createPicture(anchorObj,imgIndex);
            img.resize();
            startingRowPos+=40;
        }

        ByteArrayOutputStream bos = new ByteArrayOutputStream();
        try {
            workbook.write(bos);
        }catch(IOException e) {
            e.printStackTrace();
        } finally {
            try{
                workbook.close();
                bos.close();
            }catch(IOException e){
                e.printStackTrace();
            }
        }
        return bos.toByteArray();
    }

    @Override
    public String getMetricsFileName(){
        return "regression_model.xlsx";
    }

    @Override
    public MediaType getMetricsMediaType() {
        return MediaType.parseMediaType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
    }
}
