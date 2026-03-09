package com.projeto.alphabakery.service;

import com.projeto.alphabakery.dto.BrandResponse;
import com.projeto.alphabakery.dto.ProductResponse;
import com.projeto.alphabakery.dto.ProductTypeResponse;
import com.projeto.alphabakery.entity.Brand;
import com.projeto.alphabakery.entity.Product;
import com.projeto.alphabakery.entity.ProductType;
import com.projeto.alphabakery.repository.ProductRepository;
import com.projeto.alphabakery.repository.ProductTypeRepository;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Log4j2
public class ProductTypeServiceImpl implements ProductTypeService {

    private final ProductTypeRepository productTypeRepository;

    public ProductTypeServiceImpl(ProductTypeRepository productTypeRepository) {
        this.productTypeRepository = productTypeRepository;
    }

    @Override
    public List<ProductTypeResponse> getAllProductTypes() {
        log.info("Fetching all product types");

        return productTypeRepository.findAll()
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    @Override
    public ProductTypeResponse createProductType(ProductType productType) {
        log.info("Creating product type: {}", productType.getName());

        ProductType savedProductType = productTypeRepository.save(productType);

        return mapToResponse(savedProductType);
    }

    @Override
    public ProductTypeResponse getProductTypeById(Integer productTypeId) {
        log.info("Fetching product type with id: {}", productTypeId);

        ProductType productType = productTypeRepository.findById(productTypeId)
                .orElseThrow(() -> new RuntimeException("ProductType not found with id: " + productTypeId));

        return mapToResponse(productType);
    }

    @Override
    public ProductTypeResponse updateProductType(Integer productTypeId, ProductType productType) {
        log.info("Updating product type with id: {}", productTypeId);

        ProductType existingProductType = productTypeRepository.findById(productTypeId)
                .orElseThrow(() -> new RuntimeException("ProductType not found with id: " + productTypeId));

        existingProductType.setName(productType.getName());

        ProductType updatedProductType = productTypeRepository.save(existingProductType);

        return mapToResponse(updatedProductType);
    }

    @Override
    public void deleteProductType(Integer productTypeId) {
        log.info("Deleting product type with id: {}", productTypeId);

        productTypeRepository.deleteById(productTypeId);
    }

    private ProductTypeResponse mapToResponse(ProductType productType) {
        return ProductTypeResponse.builder()
                .id(productType.getId())
                .name(productType.getName())
                .build();
    }
}