package com.projeto.alphabakery.service;

import com.projeto.alphabakery.dto.ProductTypeResponse;
import com.projeto.alphabakery.entity.ProductType;
import com.projeto.alphabakery.repository.ProductTypeRepository;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Log4j2
public class ProductTypeServiceImpl implements ProductTypeService{

    private final ProductTypeRepository productTypeRepository;

    public ProductTypeServiceImpl(ProductTypeRepository productTypeRepository) {
        this.productTypeRepository = productTypeRepository;
    }

    @Override
    public List<ProductTypeResponse> getAllProductTypes() {
        log.info("Fetching all product types");
        List<ProductType> productTypesList = productTypeRepository.findAll();
        List<ProductTypeResponse> productTypeResponses = productTypesList.stream()
                .map(this::convertIntoproductTyperesponse)
                .collect(Collectors.toList());
        return productTypeResponses;
    }

    @Override
    public ProductTypeResponse createProductType(ProductType productType) {

        ProductType savedProductType = productTypeRepository.save(productType);

        return new ProductTypeResponse(
                savedProductType.getId(),
                savedProductType.getName()
        );
    }

    @Override
    public ProductTypeResponse getProductTypeById(Integer productTypeId) {

        ProductType productType = productTypeRepository.findById(productTypeId)
                .orElseThrow(() -> new RuntimeException("ProductType not found"));

        return new ProductTypeResponse(
                productType.getId(),
                productType.getName()
        );
    }

    @Override
    public ProductTypeResponse updateProductType(Integer productTypeId, ProductType productType) {

        ProductType existingProductType = productTypeRepository.findById(productTypeId)
                .orElseThrow(() -> new RuntimeException("Product type not found"));

        existingProductType.setName(productType.getName());

        ProductType updatedProductType = productTypeRepository.save(existingProductType);

        return new ProductTypeResponse(
                updatedProductType.getId(),
                updatedProductType.getName()
        );
    }

    @Override
    public void deleteProductType(Integer productTypeId) {
        productTypeRepository.deleteById(productTypeId);

    }

    private ProductTypeResponse convertIntoproductTyperesponse(ProductType productType) {
        return ProductTypeResponse.builder()
                .id(productType.getId())
                .name(productType.getName())
                .build();
    }
}
