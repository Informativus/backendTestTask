CREATE TABLE users (
    id serial PRIMARY KEY,
    first_name VARCHAR(64) NOT NULL,
    last_name VARCHAR(64) NOT NULL,
    middle_name VARCHAR(64),
    email VARCHAR(128) UNIQUE NOT NULL,
    hash VARCHAR(128) NOT NULL,
    salt VARCHAR(64) NOT NULL
);

CREATE TABLE columns (
    id serial PRIMARY KEY,
    user_id INT NOT NULL,
    name VARCHAR(64),
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE cards (
    id serial PRIMARY KEY,
    column_id INT NOT NULL,
    name VARCHAR(128),
    FOREIGN KEY (column_id) REFERENCES columns(id)
);

CREATE TABLE comments (
    id serial PRIMARY KEY,
    card_id INT NOT NULL,
    name TEXT,
    FOREIGN KEY (card_id) REFERENCES cards(id)
);
