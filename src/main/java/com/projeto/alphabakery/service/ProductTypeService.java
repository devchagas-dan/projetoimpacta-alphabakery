package com.projeto.alphabakery.service;

import com.projeto.alphabakery.dto.ProductTypeResponse;
import com.projeto.alphabakery.entity.Brand;
import com.projeto.alphabakery.entity.ProductType;
import jakarta.persistence.criteria.CriteriaBuilder;

import java.util.List;

public interface ProductTypeService {
    List<ProductTypeResponse> getAllProductTypes();

    ProductTypeResponse createProductType(ProductType productType);
    ProductTypeResponse getProductTypeById(Integer id);
    ProductTypeResponse updateProductType(Integer productTypeId, ProductType productType);
    void deleteProductType(Integer id);

}
