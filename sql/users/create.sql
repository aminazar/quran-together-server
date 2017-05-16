CREATE TABLE users(
    uid serial not null primary key,
    email varchar(40) not null unique,
    name varchar(40),
    token varchar(65) unique
)