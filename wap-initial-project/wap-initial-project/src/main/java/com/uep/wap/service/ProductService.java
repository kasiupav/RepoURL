package com.uep.wap.service;

import com.uep.wap.dto.ProductDTO;
import com.uep.wap.model.Product;
import com.uep.wap.repository.ProductRepository;
import org.springframework.stereotype.Service;

@Service
public class ProductService {

    private final ProductRepository productRepository;

    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public Iterable<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public void addProduct(ProductDTO dto) {
        Product product = new Product(
                dto.getName(),
                dto.getCategory(),
                dto.getPrice(),
                dto.getQuantity()
        );

        productRepository.save(product);
    }
}
