package com.projeto.alphabakery.service;

import com.projeto.alphabakery.dto.BrandResponse;
import com.projeto.alphabakery.entity.Brand;
import com.projeto.alphabakery.entity.Product;

import java.util.List;

public interface BrandService {


    List<BrandResponse> getAllBrands();

    Brand createBrand(Brand brand);

    Brand getBrandById(Integer id);
    Brand updateBrand(Integer brandId, Brand brand);

    void deleteBrand(Integer id);



}
