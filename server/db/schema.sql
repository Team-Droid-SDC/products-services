-- ---
-- Globals
-- ---

-- SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
-- SET FOREIGN_KEY_CHECKS=0;

-- ---
-- Table 'styles'
--
-- ---

DROP TABLE IF EXISTS styles CASCADE;
DROP TABLE IF EXISTS products CASCADE;
DROP TABLE IF EXISTS photos CASCADE;
DROP TABLE IF EXISTS skus CASCADE;
DROP TABLE IF EXISTS related CASCADE;
DROP TABLE IF EXISTS features CASCADE;

CREATE TABLE styles (
  id SERIAL,
  productId INTEGER NULL DEFAULT NULL,
  name VARCHAR(30) NOT NULL,
  sale_price DECIMAL NULL DEFAULT NULL,
  original_price DECIMAL NOT NULL,
  default_style BOOLEAN NOT NULL,
  PRIMARY KEY (id)
);

-- ---
-- Table 'products'
--
-- ---



CREATE TABLE products (
  id SERIAL,
  name VARCHAR(30) NOT NULL,
  slogan VARCHAR(300) NULL DEFAULT NULL,
  description VARCHAR(500) NOT NULL,
  category VARCHAR(20) NOT NULL,
  default_price DECIMAL NOT NULL,
  PRIMARY KEY (id)
);

-- ---
-- Table 'photos'
--
-- ---



CREATE TABLE photos (
  id SERIAL,
  styleId INTEGER NOT NULL,
  url VARCHAR NOT NULL,
  thumbnail_url VARCHAR NOT NULL,
  PRIMARY KEY (id)
);

-- ---
-- Table 'skus'
--
-- ---


CREATE TABLE skus (
  id SERIAL,
  styleId INTEGER NOT NULL,
  size VARCHAR(10) NOT NULL,
  quantity INTEGER NOT NULL,
  PRIMARY KEY (id)
);

-- ---
-- Table 'features'
--
-- ---


CREATE TABLE features (
  id SERIAL,
  product_id INTEGER NOT NULL,
  feature VARCHAR(30) NOT NULL,
  value VARCHAR(30) NOT NULL,
  PRIMARY KEY (id)
);

-- ---
-- Table 'related'
--
-- ---


CREATE TABLE related (
  id SERIAL,
  current_product_id INTEGER NOT NULL,
  related_product_id INTEGER NOT NULL,
  PRIMARY KEY (id)
);

-- ---
-- Foreign Keys
-- ---

ALTER TABLE styles ADD FOREIGN KEY (productId) REFERENCES products (id);
ALTER TABLE photos ADD FOREIGN KEY (styleId) REFERENCES styles (id);
ALTER TABLE skus ADD FOREIGN KEY (styleId) REFERENCES styles (id);
ALTER TABLE features ADD FOREIGN KEY (product_id) REFERENCES products (id);
ALTER TABLE related ADD FOREIGN KEY (current_product_id) REFERENCES products (id);
ALTER TABLE related ADD FOREIGN KEY (related_product_id) REFERENCES products (id);

-- ---
-- Table Properties
-- ---

-- ALTER TABLE styles ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE products ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE photos ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE skus ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE features ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE related ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ---
-- Test Data
-- ---

-- INSERT INTO styles (id,productId,name,sale_price,original_price,default_style) VALUES
-- ('','','','','','');
-- INSERT INTO products (id,name,slogan,description,category,default_price) VALUES
-- ('','','','','','');
-- INSERT INTO photos (id,styleId,url,thumbnail_url) VALUES
-- ('','','','');
-- INSERT INTO skus (id,styleId,size,quantity) VALUES
-- ('','','','');
-- INSERT INTO features (id,product_id,feature,value) VALUES
-- ('','','','');
-- INSERT INTO related (id,current_product_id,related_product_id) VALUES
-- ('','','');

COPY products FROM '/Users/junsupark/repos/products-services/product.csv' CSV header;
COPY features FROM '/Users/junsupark/repos/products-services/features.csv' CSV header;
COPY related FROM '/Users/junsupark/repos/products-services/related.csv' CSV header WHERE related_product_id != 0;
COPY styles FROM '/Users/junsupark/repos/products-services/styles.csv' CSV header NULL 'null';
COPY skus FROM '/Users/junsupark/repos/products-services/skus.csv' CSV header;
COPY photos FROM '/Users/junsupark/repos/products-services/photos.csv' CSV header;