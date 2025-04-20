package com.islam.product.service;

import com.islam.product.dto.ProductDTO;
import com.islam.product.entity.Product;
import com.islam.product.repository.ProductRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ProductService {

    private final ProductRepository productRepository;
    private final ModelMapper modelMapper;

    @Autowired
    public ProductService(ProductRepository productRepository, ModelMapper modelMapper) {
        this.productRepository = productRepository;
        this.modelMapper = modelMapper;
    }

    public List<ProductDTO> getAllProducts() {
        return productRepository.findAll()
                .stream()
                .map(product -> modelMapper.map(product, ProductDTO.class))
                .collect(Collectors.toList());
    }

    public ProductDTO createProduct(ProductDTO productDTO) {
        try {
            Product product = modelMapper.map(productDTO, Product.class);
            Product savedProduct = productRepository.save(product);
            return modelMapper.map(savedProduct, ProductDTO.class);
        } catch (DataIntegrityViolationException e) {
            throw new RuntimeException("Product with the same name already exists");
        }
    }

    public ProductDTO deleteProductByName(String name) {
        Optional<Product> productOpt = productRepository.findByName(name);
        Product product = productOpt.orElseThrow(() -> new RuntimeException("Product not found"));
        productRepository.delete(product);
        productRepository.flush();
        return modelMapper.map(product, ProductDTO.class);
    }

    public ProductDTO deleteProductById(Long id) {
        Optional<Product> productOpt = productRepository.findById(id);
        Product product = productOpt.orElseThrow(() -> new RuntimeException("Product not found"));
        productRepository.delete(product);
        productRepository.flush();
        return modelMapper.map(product, ProductDTO.class);
    }

    public ProductDTO updateProduct(Long id, ProductDTO productDTO) {
        Optional<Product> productOpt = productRepository.findById(id);
        Product existingProduct = productOpt.orElseThrow(() -> new RuntimeException("Product not found"));
        productDTO.setId(id);
        modelMapper.map(productDTO, existingProduct);
        Product updatedProduct = productRepository.save(existingProduct);
        return modelMapper.map(updatedProduct, ProductDTO.class);
    }
}