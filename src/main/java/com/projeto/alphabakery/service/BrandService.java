package com.projeto.alphabakery.service;

import com.projeto.alphabakery.dto.BrandResponse;
import com.projeto.alphabakery.entity.Brand;
import java.util.List;

public interface BrandService {


    List<BrandResponse> getAllBrands();

    BrandResponse createBrand(Brand brand);

    BrandResponse getBrandById(Integer id);
    BrandResponse updateBrand(Integer brandId, Brand brand);

    void deleteBrand(Integer id);



}
