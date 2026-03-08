package com.projeto.alphabakery.dto;

import com.projeto.alphabakery.entity.Brand;
import com.projeto.alphabakery.entity.ProductType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ProductResponse {

    private Integer id;
    private String name;
    private String description;
    private Long price;
    private String pictureUrl;
    private BrandResponse brand;
    private ProductTypeResponse productType;
}
