CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(64) NOT NULL,
    last_name VARCHAR(64) NOT NULL,
    middle_name VARCHAR(64),
    email VARCHAR(128),
    hash VARCHAR(128) NOT NULL,
    salt VARCHAR(64) NOT NULL
);

CREATE TABLE columns (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    name VARCHAR(64),
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE cards (
    id INT PRIMARY KEY AUTO_INCREMENT,
    column_id INT,
    name VARCHAR(128),
    FOREIGN KEY (column_id) REFERENCES columns(id)
);

CREATE TABLE comments (
    id INT PRIMARY KEY AUTO_INCREMENT,
    card_id INT,
    name TEXT,
    FOREIGN KEY (card_id) REFERENCES cards(id)
);
