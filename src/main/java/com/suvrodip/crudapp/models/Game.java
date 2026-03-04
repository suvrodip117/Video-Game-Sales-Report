package com.suvrodip.crudapp.models;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "tbl_games")
@Data                       //handles Getters and Setters
public class Game {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(columnDefinition = "INT", name = "Game_Rank")
    private Integer gameRank;

    @Column(columnDefinition = "TEXT", name = "Name")
    private String name;

    @Column(columnDefinition = "TEXT", name = "Platform")
    private String platform;

    @Column(columnDefinition = "TEXT", name = "Platform_Group")
    private String platformGroup;

    @Column(columnDefinition = "INT", name = "Game_Year")
    private Integer gameYear;

    @Column(columnDefinition = "TEXT", name = "Genre")
    private String genre;

    @Column(columnDefinition = "TEXT", name = "Publisher")
    private String publisher;

    @Column(columnDefinition = "DOUBLE", name = "NA_Sales")
    private Double naSales;

    @Column(columnDefinition = "DOUBLE", name = "EU_Sales")
    private Double euSales;

    @Column(columnDefinition = "DOUBLE", name = "JP_Sales")
    private Double jpSales;

    @Column(columnDefinition = "DOUBLE", name = "Other_Sales")
    private Double otherSales;

    @Column(columnDefinition = "DOUBLE", name = "Global_Sales")
    private Double globalSales;
}
