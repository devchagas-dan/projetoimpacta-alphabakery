package com.projeto.alphabakery.service;

import com.projeto.alphabakery.dto.BrandResponse;
import com.projeto.alphabakery.entity.Brand;
import com.projeto.alphabakery.repository.BrandRepository;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Log4j2
public class BrandServiceImpl implements BrandService{

    private final BrandRepository brandRepository;

    public BrandServiceImpl(BrandRepository brandRepository) {
        this.brandRepository = brandRepository;
    }

    @Override
    public List<BrandResponse> getAllBrands() {
        log.info("Fetching all brands");
        List<Brand> brandList = brandRepository.findAll();
        List<BrandResponse> brandResponses = brandList.stream()
                .map(this::convertIntoBrandResponse)
                .collect(Collectors.toList());
        log.info("All brands were fetched");
        return brandResponses;
    }

    @Override
    public Brand createBrand(Brand brand) {
        return brandRepository.save(brand);
    }

    @Override
    public Brand getBrandById(Integer brandId) {
        return brandRepository.findById(brandId)
                .orElseThrow(() -> new RuntimeException("Brand not found"));
    }

    @Override
    public Brand updateBrand(Integer brandId, Brand brand) {

        Brand existingBrand = brandRepository.findById(brandId)
                .orElseThrow(() -> new RuntimeException("Brand not found"));

        existingBrand.setName(brand.getName());
        return brandRepository.save(existingBrand);
    }

    @Override
    public void deleteBrand(Integer brandId) {
        brandRepository.deleteById(brandId);
    }

    private BrandResponse convertIntoBrandResponse(Brand brand) {
        return BrandResponse.builder()
                .id(brand.getId())
                .name(brand.getName())
                .build();
    }
}
