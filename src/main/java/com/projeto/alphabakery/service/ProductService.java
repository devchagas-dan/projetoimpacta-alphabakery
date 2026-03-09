package com.projeto.alphabakery.service;

import com.projeto.alphabakery.dto.ProductResponse;
import com.projeto.alphabakery.entity.Product;

import java.util.List;

public interface ProductService {
    ProductResponse getProductsById(Integer productId);
    List<ProductResponse> getProducts();

    ProductResponse createProduct(Product product);
    ProductResponse updateProduct(Integer productId, Product product);

    void deleteProduct(Integer productId);



}
