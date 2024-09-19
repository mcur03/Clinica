CREATE DATABASE clinica;
USE clinica;

DROP TABLE user;

CREATE TABLE user(
	id INT AUTO_INCREMENT PRIMARY KEY,
    gmail VARCHAR(100) NOT NULL,
    documento VARCHAR(11) NOT NULL,
    nombre VARCHAR(25) NOT NULL,
    apellido VARCHAR(25) NOT NULL,
    edad VARCHAR(3) NOT NULL,
    celular VARCHAR(11) NOT NULL,
    fechaNacimiento DATE,
    password VARCHAR(100) NOT NULL,
    rol ENUM('admin','paciente','doctor'),
    verification_code varchar(6),
    is_verified boolean default false
);
select * from user;
SELECT * FROM user WHERE gmail = 'mcur99.03@gmail.com';
SELECT * FROM user WHERE LOWER(gmail) = LOWER('mcur99.03@gmail.com') AND verification_code = '796618';

select now();