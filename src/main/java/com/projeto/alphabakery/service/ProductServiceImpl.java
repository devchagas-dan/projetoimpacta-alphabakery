package com.projeto.alphabakery.service;

import com.projeto.alphabakery.dto.BrandResponse;
import com.projeto.alphabakery.dto.ProductResponse;
import com.projeto.alphabakery.dto.ProductTypeResponse;
import com.projeto.alphabakery.entity.Brand;
import com.projeto.alphabakery.entity.Product;
import com.projeto.alphabakery.entity.ProductType;
import com.projeto.alphabakery.repository.BrandRepository;
import com.projeto.alphabakery.repository.ProductRepository;
import com.projeto.alphabakery.repository.ProductTypeRepository;
import jakarta.persistence.criteria.CriteriaBuilder;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.List;
import java.util.UUID;

@Service
@Log4j2
public class ProductServiceImpl implements ProductService{

    private final ProductRepository productRepository;
    private final BrandRepository brandRepository;
    private final ProductTypeRepository productTypeRepository;


    public ProductServiceImpl(
            ProductRepository productRepository,
            BrandRepository brandRepository,
            ProductTypeRepository productTypeRepository
    ) {
        this.productRepository = productRepository;
        this.brandRepository = brandRepository;
        this.productTypeRepository = productTypeRepository;
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
    public ProductResponse createProduct(String name, String description, Long price, Integer quantity, Integer brandId, Integer productTypeId, MultipartFile image
    ) {
        try{
            Brand brand = brandRepository.findById(brandId)
                    .orElseThrow(() -> new RuntimeException("Marca não encontrada"));

            ProductType productType = productTypeRepository.findById(productTypeId)
                    .orElseThrow(() -> new RuntimeException("Tipo de produto não encontrado"));

            String originalFileName = image.getOriginalFilename();
            String fileName = UUID.randomUUID() + "-" + originalFileName;

            Path uploadPath = Path.of(
                    "C:",
                    "Java-projects",
                    "projetoimpacta-alphabakery",
                    "uploads",
                    "products"
            );

            Files.createDirectories(uploadPath);

            Path filePath = uploadPath.resolve(fileName);

            Files.copy(image.getInputStream(), filePath);

            Product product = new Product();
            product.setName(name);
            product.setDescription(description);
            product.setPrice(price);
            product.setQuantity(quantity);
            product.setPictureUrl("products/" + fileName);
            product.setBrand(brand);
            product.setProductType(productType);

            Product savedProduct = productRepository.save(product);

            return mapToResponse(savedProduct);
        } catch (IOException error){
            log.error("Erro ao salvar a imagem do produto", error);
            throw new RuntimeException("Erro ao salvar a imagem do produto");
        }
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

        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product não encontrado"));

        productRepository.delete(product);
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
