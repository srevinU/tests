CREATE DATABASE db_sand_box;

USE db_sand_box;

CREATE TABLE persons (
    PersonID int,
    LastName varchar(255),
    FirstName varchar(255),
    Address varchar(255),
    City varchar(255)
);

CREATE TABLE persons_referential (
    PersonID int,
    LastName varchar(255),
    FirstName varchar(255),
    Address varchar(255),
    City varchar(255)
);

CREATE VIEW vw_person AS
   SELECT * FROM persons
   UNION ALL
   SELECT * FROM persons_referential