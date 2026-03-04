package com.suvrodip.crudapp.models.dto;

import lombok.Data;

import java.util.Map;

@Data
public class TrainingResponseDTO {
    private String status;
    private Map<String,String> plots;
}
