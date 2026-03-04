package com.suvrodip.crudapp.models.dto;

import lombok.Data;
import java.util.Map;

@Data
public class MetricsDTO {
    private String modelName;
    private Map<String, Double> metrics;
    private Map<String, String> plot;
}
