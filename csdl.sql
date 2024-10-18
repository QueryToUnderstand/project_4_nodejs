DROP DATABASE IF EXISTS  `demo_k5`;
CREATE DATABASE `demo_k5` DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci;
use demo_k5;

CREATE TABLE IF NOT EXISTS `category` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
 `name` VARCHAR(100) NOT NULL UNIQUE,
  `status` tinyint DEFAULT '1'
) ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `product` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
   `name` VARCHAR(120) NOT NULL,
  `image` VARCHAR(100) NULL,
  `price` float NOT NULL,
  `sale_price` float DEFAULT '0',
  `status` tinyint DEFAULT '1',
  `description` text NOT NULL,
  `created_at` date DEFAULT current_timestamp(),
  `category_id` int NOT NULL,
  FOREIGN KEY (`category_id`) REFERENCES `category` (`id`)
) ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `account` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  `email` VARCHAR(100) NOT NULL UNIQUE,
  `role` VARCHAR(100) DEFAULT 'customer',
  `password` VARCHAR(100) NOT NULL,
  `created_at` date DEFAULT CURRENT_TIMESTAMP(),
    `Last_Login` datetime DEFAULT CURRENT_TIMESTAMP()
) ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `favorite` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `account_id` INT NOT NULL,
  `product_id` INT NOT NULL,
  `created_at` date DEFAULT current_timestamp(),
  FOREIGN KEY (`account_id`) REFERENCES `account` (`id`),
  FOREIGN KEY (`product_id`) REFERENCES `product` (`id`)
) ENGINE = InnoDB;

INSERT INTO category (name, status) VALUES 
('Búa',1),
('Cờ Lê',1),
('Thước',1),
('Tua vít',1),
('Đục',1);

INSERT INTO account (name, email, password, role) VALUES 
('admin','admin@gmail.com','123456','admin'),
('trung','trung@gmail.com','123','customer')