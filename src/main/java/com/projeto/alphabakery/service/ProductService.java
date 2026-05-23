package com.projeto.alphabakery.service;

import com.projeto.alphabakery.dto.ProductResponse;
import com.projeto.alphabakery.entity.Product;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface ProductService {
    ProductResponse getProductsById(Integer productId);
    List<ProductResponse> getProducts();

    ProductResponse createProduct(
            String name,
            String description,
            Long price,
            Integer quantity,
            Integer brandId,
            Integer productTypeId,
            MultipartFile image
    );
    ProductResponse updateProduct(Integer productId, Product product);

    void deleteProduct(Integer productId);



}
