CREATE DATABASE IF NOT EXISTS `alpha-bakery`;

USE `alpha-bakery` ;

DROP TABLE IF EXISTS Brand;
DROP TABLE IF EXISTS Type;
DROP TABLE IF EXISTS Product;

CREATE TABLE `Brand` (
                         `Id` INT AUTO_INCREMENT PRIMARY KEY,
                         `Name` VARCHAR(255) NOT NULL
);

INSERT INTO Brand (Name) VALUES
                             ('Padaria Sabor da Vila'),
                             ('Casa do Trigo'),
                             ('Delícia Francesa'),
                             ('Doce Encanto'),
                             ('Sabor da Manhã'),
                             ('Forno & Cia'),
                             ('Minas Sabor'),
                             ('Café Supremo'),
                             ('Ninho')
                             ('Natural Fresh');

CREATE TABLE `Type` (
                        `Id` INT AUTO_INCREMENT PRIMARY KEY,
                        `Name` VARCHAR(255) NOT NULL
);

INSERT INTO Type (Name) VALUES
                            ('Pão'),
                            ('Massa Folhada'),
                            ('Bolo'),
                            ('Salgado'),
                            ('Bebida'),
                            ('Doce');

CREATE TABLE `Product` (
                           `Id` INT AUTO_INCREMENT PRIMARY KEY,
                           `Name` VARCHAR(255) NOT NULL,
                           `Description` TEXT,
                           `Price` DECIMAL(10, 2) NOT NULL,
                           `PictureUrl` VARCHAR(255),
                           `ProductTypeId` INT NOT NULL,
                           `ProductBrandId` INT NOT NULL,
                           FOREIGN KEY (`ProductTypeId`) REFERENCES `Type`(`Id`),
                           FOREIGN KEY (`ProductBrandId`) REFERENCES `Brand`(`Id`)
);

INSERT INTO Product (Name, Description, Price, PictureUrl, ProductTypeId, ProductBrandId) VALUES
                                                                                              ('Bolo de Cenoura com Cobertura', 'Massa macia com cobertura cremosa de chocolate.', 50.00, 'uploads/products/bolo-cenoura-chocolate.jpg', 3, 4),
                                                                                              ('Bolo de Chocolate', 'Massa fofinha com sabor intenso de chocolate.', 49.90, 'uploads/products/bolo-chocolate.jpg', 3, 4),
                                                                                              ('Bolo Red Velvet', 'Clássico bolo vermelho com creme suave e delicado.', 60.00, 'uploads/products/bolo-red-velvet.jpg', 3, 4),
                                                                                              ('Café Expresso', 'Café encorpado e aromático, preparado na hora.', 7.00, 'uploads/products/cafe-expresso.jpg', 5, 8),
                                                                                              ('Cappuccino Cremoso', 'Bebida quente com café, leite e espuma cremosa.', 14.00, 'uploads/products/capuccino-cremoso.jpg', 5, 8),
                                                                                              ('Croissant de Chocolate', 'Croissant macio recheado com chocolate cremoso.', 7.50, 'uploads/products/croissant-chocolate.jpg', 2, 3),
                                                                                              ('Croissant de Manteiga', 'Folhado e amanteigado, com textura leve e crocante.', 5.50, 'uploads/products/croissant-manteiga.jpg', 2, 3),
                                                                                              ('Empada de Camarão', 'Empada delicada com recheio saboroso de camarão.', 12.50, 'uploads/products/empada-camarao.jpg', 4, 2),
                                                                                              ('Empada de Frango', 'Massa amanteigada com recheio cremoso de frango.', 6.50, 'uploads/products/empada-frango.jpg', 4, 2),
                                                                                              ('Leite Integral', 'Bebida vendida na caixinha', 6.50, 'uploads/products/leite-integral.jpg', 5, 9),
                                                                                              ('Pão de Forma Artesanal', 'Macio e fresco, perfeito para sanduíches.', 7.50, 'uploads/products/pao-forma-artesanal.jpg', 1, 2),
                                                                                              ('Pão Francês Tradicional', 'Pão leve e crocante, ideal para o café da manhã.', 0.50, 'uploads/products/pao-frances.jpg', 1, 1),
                                                                                              ('Pão Integral 100%', 'Feito com farinha integral, rico em fibras e sabor.', 0.80, 'uploads/products/pao-integral.jpg', 1, 1),
                                                                                              ('Pão de Queijo Recheado', 'Versão especial com recheio cremoso.', 5.50, 'uploads/products/pao-queijo-recheado.jpg', 4, 7),
                                                                                              ('Pão de Queijo Tradicional', 'Crocrante por fora e macio por dentro', 4.50, 'uploads/products/pao-queijo-tradicional.jpg', 4, 7),
                                                                                              ('Rosca Doce com Coco', 'Rosca macia coberta com coco ralado e açúcar.', 12.50, 'uploads/products/rosca-doce-coco.jpg', 6, 1),
                                                                                              ('Sonho com Creme', 'Massa macia recheada com creme confeiteiro.', 6.50, 'uploads/products/sonho-creme.jpg', 6, 5),
                                                                                              ('Sonho com Doce de Leite', 'Sonho tradicional com recheio generoso de doce de leite.', 6.50, 'uploads/products/sonho-doce-deleite.jpg', 6, 5),
                                                                                              ('Suco Natural de Laranja', 'Suco fresco, feito com laranjas selecionadas.', 9.50, 'uploads/products/suco-laranja.jpg', 5, 10),
                                                                                              ('Torta de Frango', 'Torta cremosa com recheio temperado de frango.', 9.50, 'uploads/products/torta-frango.jpg', 4, 5),
                                                                                              ('Torta de Palmito', 'Recheio suave de palmito em massa leve.', 9.50, 'Recheio suave de palmito em massa leve.', 4, 5);

