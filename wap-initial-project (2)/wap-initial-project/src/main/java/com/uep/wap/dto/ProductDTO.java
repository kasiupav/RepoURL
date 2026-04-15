package com.uep.wap.dto;

public class ProductDTO {

    private String name;
    private Double price; // Zmieniamy punkty na cenę
    private Integer stockQuantity; // Dodajemy ilość na magazynie

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public Integer getStockQuantity() {
        return stockQuantity;
    }

    public void setStockQuantity(Integer stockQuantity) {
        this.stockQuantity = stockQuantity;
    }
}
