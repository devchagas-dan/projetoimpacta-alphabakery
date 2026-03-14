package com.projeto.alphabakery.service;

import com.projeto.alphabakery.dto.BrandResponse;
import com.projeto.alphabakery.dto.ProductResponse;
import com.projeto.alphabakery.dto.ProductTypeResponse;
import com.projeto.alphabakery.entity.Product;
import com.projeto.alphabakery.repository.ProductRepository;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Log4j2
public class ProductServiceImpl implements ProductService{

    private final ProductRepository productRepository;

    public ProductServiceImpl(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    @Override
    public ProductResponse getProductsById(Integer productId) {
        log.info("fetching Product by Id: {}", productId);
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));
        return mapToResponse(product);

    }

    @Override
    public List<ProductResponse> getProducts() {
        return productRepository.findAll()
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    @Override
    public ProductResponse createProduct(Product product) {

        Product savedProduct = productRepository.save(product);

        return mapToResponse(savedProduct);
    }
    @Override
    public ProductResponse updateProduct(Integer productId, Product product) {

        Product existingProduct = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        existingProduct.setName(product.getName());
        existingProduct.setDescription(product.getDescription());
        existingProduct.setPrice(product.getPrice());
        existingProduct.setQuantity(product.getQuantity());
        existingProduct.setPictureUrl(product.getPictureUrl());
        existingProduct.setBrand(product.getBrand());
        existingProduct.setProductType(product.getProductType());

        Product updatedProduct = productRepository.save(existingProduct);

        return mapToResponse(updatedProduct);
    }

    @Override
    public void deleteProduct(Integer productId) {
        productRepository.deleteById(productId);
    }

    private ProductResponse mapToResponse(Product product) {

        return ProductResponse.builder()
                .id(product.getId())
                .name(product.getName())
                .description(product.getDescription())
                .price(product.getPrice())
                .quantity(product.getQuantity())
                .pictureUrl(product.getPictureUrl())
                .brand(
                        BrandResponse.builder()
                                .id(product.getBrand().getId())
                                .name(product.getBrand().getName())
                                .build()
                )
                .productType(
                        ProductTypeResponse.builder()
                                .id(product.getProductType().getId())
                                .name(product.getProductType().getName())
                                .build()
                )
                .build();
    }
}
