package com.projeto.alphabakery.controller;

import com.projeto.alphabakery.dto.BrandResponse;
import com.projeto.alphabakery.dto.ProductResponse;
import com.projeto.alphabakery.dto.ProductTypeResponse;
import com.projeto.alphabakery.entity.Brand;
import com.projeto.alphabakery.entity.Product;
import com.projeto.alphabakery.entity.ProductType;
import com.projeto.alphabakery.service.BrandService;
import com.projeto.alphabakery.service.ProductService;
import com.projeto.alphabakery.service.ProductTypeService;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/products")
public class ProductController {

    private final ProductService productService;
    private final BrandService brandService;
    private final ProductTypeService productTypeService;

    public ProductController(ProductService productService,
                             BrandService brandService,
                             ProductTypeService productTypeService) {
        this.productService = productService;
        this.brandService = brandService;
        this.productTypeService = productTypeService;
    }


    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public List<ProductResponse> getProducts() {
        return productService.getProducts();
    }

    @GetMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public ProductResponse getProductById(@PathVariable Integer id) {
        return productService.getProductsById(id);
    }

    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.CREATED)
    public ProductResponse createProduct(@RequestBody Product product) {
        return productService.createProduct(product);
    }

    @PutMapping(value = "/{id}", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.OK)
    public ProductResponse updateProduct(@PathVariable Integer id,
                                         @RequestBody Product product) {
        return productService.updateProduct(id, product);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteProduct(@PathVariable Integer id) {
        productService.deleteProduct(id);
    }


    @GetMapping("/brands")
    public ResponseEntity<List<BrandResponse>> getBrands() {
        return ResponseEntity.ok(brandService.getAllBrands());
    }

    @GetMapping("/brands/{id}")
    public ResponseEntity<BrandResponse> getBrandById(@PathVariable Integer id) {
        return ResponseEntity.ok(brandService.getBrandById(id));
    }

    @PostMapping("/brands")
    public ResponseEntity<BrandResponse> createBrand(@RequestBody Brand brand) {
        return new ResponseEntity<>(brandService.createBrand(brand), HttpStatus.CREATED);
    }

    @PutMapping("/brands/{id}")
    public ResponseEntity<BrandResponse> updateBrand(@PathVariable Integer id,
                                                     @RequestBody Brand brand) {
        return ResponseEntity.ok(brandService.updateBrand(id, brand));
    }

    @DeleteMapping("/brands/{id}")
    public ResponseEntity<Void> deleteBrand(@PathVariable Integer id) {
        brandService.deleteBrand(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/producttypes")
    public ResponseEntity<List<ProductTypeResponse>> getTypes() {
        return ResponseEntity.ok(productTypeService.getAllProductTypes());
    }

    @GetMapping("/producttypes/{id}")
    public ResponseEntity<ProductTypeResponse> getTypeById(@PathVariable Integer id) {
        return ResponseEntity.ok(productTypeService.getProductTypeById(id));
    }

    @PostMapping("/producttypes")
    public ResponseEntity<ProductTypeResponse> createType(@RequestBody ProductType productType) {
        return new ResponseEntity<>(productTypeService.createProductType(productType), HttpStatus.CREATED);
    }

    @PutMapping("/producttypes/{id}")
    public ResponseEntity<ProductTypeResponse> updateType(@PathVariable Integer id,
                                                          @RequestBody ProductType productType) {
        return ResponseEntity.ok(productTypeService.updateProductType(id, productType));
    }

    @DeleteMapping("/producttypes/{id}")
    public ResponseEntity<Void> deleteType(@PathVariable Integer id) {
        productTypeService.deleteProductType(id);
        return ResponseEntity.noContent().build();
    }
}