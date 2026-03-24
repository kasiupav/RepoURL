package com.uep.wap.controller;

import com.uep.wap.dto.ProductDTO;
import com.uep.wap.model.Product;
import com.uep.wap.service.ProductService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path = "/api/products")
public class ProductController {

    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping
    public Iterable<Product> getAllProducts() {
        return productService.getAllProducts();
    }

    @PostMapping
    public String addProduct(@RequestBody ProductDTO productDTO) {
        productService.addProduct(productDTO);
        return "Product added!";
    }
}