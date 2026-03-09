package com.projeto.alphabakery.service;

import com.projeto.alphabakery.dto.ProductTypeResponse;
import com.projeto.alphabakery.entity.ProductType;

import java.util.List;

public interface ProductTypeService {
    List<ProductTypeResponse> getAllProductTypes();

    ProductTypeResponse createProductType(ProductType productType);
    ProductTypeResponse getProductTypeById(Integer id);
    ProductTypeResponse updateProductType(Integer productTypeId, ProductType productType);
    void deleteProductType(Integer id);

}
