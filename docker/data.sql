-- =========================================
-- DATABASE
-- =========================================

CREATE DATABASE IF NOT EXISTS alphabakery;
USE alphabakery;

-- =========================================
-- DROP TABLES (ordem reversa por causa das FK)
-- =========================================

DROP TABLE IF EXISTS product;
DROP TABLE IF EXISTS product_type;
DROP TABLE IF EXISTS brand;

-- =========================================
-- TABLE: BRAND
-- =========================================

CREATE TABLE brand (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

-- =========================================
-- TABLE: PRODUCT TYPE
-- =========================================

CREATE TABLE product_type (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

-- =========================================
-- TABLE: PRODUCT
-- =========================================

CREATE TABLE product (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    picture_url VARCHAR(255),
    product_type_id INT NOT NULL,
    brand_id INT NOT NULL,

    CONSTRAINT fk_product_type
        FOREIGN KEY (product_type_id)
        REFERENCES product_type(id),

    CONSTRAINT fk_product_brand
        FOREIGN KEY (brand_id)
        REFERENCES brand(id)
);

-- =========================================
-- INSERT: BRAND
-- =========================================

INSERT INTO brand (name) VALUES
                                ('Padaria Sabor da Vila'),
                                ('Casa do Trigo'),
                                ('Delícia Francesa'),
                                ('Doce Encanto'),
                                ('Sabor da Manhã'),
                                ('Forno & Cia'),
                                ('Minas Sabor'),
                                ('Café Supremo'),
                                ('Ninho'),
                                ('Natural Fresh');

-- =========================================
-- INSERT: PRODUCT TYPE
-- =========================================

INSERT INTO product_type (name) VALUES
                                        ('Pão'),
                                        ('Massa Folhada'),
                                        ('Bolo'),
                                        ('Salgado'),
                                        ('Bebida'),
                                        ('Doce');

-- =========================================
-- INSERT: PRODUCT
-- =========================================

INSERT INTO product
(name, description, price, picture_url, product_type_id, brand_id)
VALUES
('Bolo de Cenoura com Cobertura', 'Massa macia com cobertura cremosa de chocolate.', 50.00, 'uploads/products/bolo-cenoura-chocolate.jpg', 3, 4),

('Bolo de Chocolate', 'Massa fofinha com sabor intenso de chocolate.', 49.90, 'uploads/products/bolo-chocolate.jpg', 3, 4),

('Bolo Red Velvet', 'Clássico bolo vermelho com creme suave e delicado.', 60.00, 'uploads/products/bolo-red-velvet.jpg', 3, 4),

('Café Expresso', 'Café encorpado e aromático, preparado na hora.', 7.00, 'uploads/products/cafe-expresso.jpg', 5, 8),

('Cappuccino Cremoso', 'Bebida quente com café, leite e espuma cremosa.', 14.00, 'uploads/products/capuccino-cremoso.jpg', 5, 8),

('Croissant de Chocolate', 'Croissant macio recheado com chocolate cremoso.', 7.50, 'uploads/products/croissant-chocolate.jpg', 2, 3),

('Croissant de Manteiga', 'Folhado e amanteigado, com textura leve e crocante.', 5.50, 'uploads/products/croissant-manteiga.jpg', 2, 3),

('Empada de Camarão', 'Empada delicada com recheio saboroso de camarão.', 12.50, 'uploads/products/empada-camarao.jpg', 4, 2),

('Empada de Frango', 'Massa amanteigada com recheio cremoso de frango.', 6.50, 'uploads/products/empada-frango.jpg', 4, 2),

('Leite Integral', 'Bebida vendida na caixinha.', 6.50, 'uploads/products/leite-integral.jpg', 5, 9),

('Pão de Forma Artesanal', 'Macio e fresco, perfeito para sanduíches.', 7.50, 'uploads/products/pao-forma-artesanal.jpg', 1, 2),

('Pão Francês Tradicional', 'Pão leve e crocante, ideal para o café da manhã.', 0.50, 'uploads/products/pao-frances.jpg', 1, 1),

('Pão Integral 100%', 'Feito com farinha integral, rico em fibras.', 0.80, 'uploads/products/pao-integral.jpg', 1, 1),

('Pão de Queijo Recheado', 'Versão especial com recheio cremoso.', 5.50, 'uploads/products/pao-queijo-recheado.jpg', 4, 7),

('Pão de Queijo Tradicional', 'Crocante por fora e macio por dentro.', 4.50, 'uploads/products/pao-queijo-tradicional.jpg', 4, 7),

('Rosca Doce com Coco', 'Rosca macia coberta com coco ralado e açúcar.', 12.50, 'uploads/products/rosca-doce-coco.jpg', 6, 1),

('Sonho com Creme', 'Massa macia recheada com creme confeiteiro.', 6.50, 'uploads/products/sonho-creme.jpg', 6, 5),

('Sonho com Doce de Leite', 'Sonho tradicional com recheio generoso de doce de leite.', 6.50, 'uploads/products/sonho-doce-de-leite.jpg', 6, 5),

('Suco Natural de Laranja', 'Suco fresco feito com laranjas selecionadas.', 9.50, 'uploads/products/suco-laranja.jpg', 5, 10),

('Torta de Frango', 'Torta cremosa com recheio temperado de frango.', 9.50, 'uploads/products/torta-frango.jpg', 4, 5),

('Torta de Palmito', 'Recheio suave de palmito em massa leve.', 9.50, 'uploads/products/torta-palmito.jpg', 4, 5);

