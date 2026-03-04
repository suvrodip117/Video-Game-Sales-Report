package com.suvrodip.crudapp.models.dto;

import lombok.Data;

@Data
public class DeleteGameRequestDTO {
    private Integer gameRank;
    private String name;
    private String platform;
    private String platformGroup;
    private Integer gameYear;
    private String genre;
    private String publisher;
    private Double naSales;
    private Double euSales;
    private Double jpSales;
    private Double otherSales;
    private Double globalSales;
}
