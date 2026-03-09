package com.projeto.alphabakery.service;

import com.projeto.alphabakery.dto.BrandResponse;
import com.projeto.alphabakery.entity.Brand;
import com.projeto.alphabakery.repository.BrandRepository;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Log4j2
public class BrandServiceImpl implements BrandService {

    private final BrandRepository brandRepository;

    public BrandServiceImpl(BrandRepository brandRepository) {
        this.brandRepository = brandRepository;
    }

    @Override
    public List<BrandResponse> getAllBrands() {
        log.info("Fetching all brands");

        List<BrandResponse> brands = brandRepository.findAll()
                .stream()
                .map(this::mapToResponse)
                .toList();

        log.info("Fetched {} brands", brands.size());
        return brands;
    }

    @Override
    public BrandResponse createBrand(Brand brand) {
        log.info("Creating brand: {}", brand.getName());

        Brand savedBrand = brandRepository.save(brand);

        log.info("Brand created with id {}", savedBrand.getId());
        return mapToResponse(savedBrand);
    }

    @Override
    public BrandResponse getBrandById(Integer id) {
        log.info("Fetching brand with id {}", id);

        Brand brand = brandRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Brand not found"));

        return mapToResponse(brand);
    }

    @Override
    public BrandResponse updateBrand(Integer brandId, Brand brand) {
        log.info("Updating brand with id {}", brandId);

        Brand existingBrand = brandRepository.findById(brandId)
                .orElseThrow(() -> new RuntimeException("Brand not found"));

        existingBrand.setName(brand.getName());

        Brand updatedBrand = brandRepository.save(existingBrand);

        log.info("Brand {} updated", brandId);
        return mapToResponse(updatedBrand);
    }

    @Override
    public void deleteBrand(Integer brandId) {
        log.info("Deleting brand with id {}", brandId);

        Brand brand = brandRepository.findById(brandId)
                .orElseThrow(() -> new RuntimeException("Brand not found"));

        brandRepository.delete(brand);

        log.info("Brand {} deleted", brandId);
    }

    private BrandResponse mapToResponse(Brand brand) {
        return BrandResponse.builder()
                .id(brand.getId())
                .name(brand.getName())
                .build();
    }
}