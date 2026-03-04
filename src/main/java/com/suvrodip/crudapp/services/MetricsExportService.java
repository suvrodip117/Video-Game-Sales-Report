package com.suvrodip.crudapp.services;

import org.springframework.http.MediaType;

import java.util.Map;

public interface MetricsExportService {
    byte[] generateMetricsSpreadSheet(Map<String, Double> metrics, String modelName, Map<String,String> plot);
    String getMetricsFileName();
    MediaType getMetricsMediaType();
}
