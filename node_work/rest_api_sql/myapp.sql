create database myapp;

use myapp;

create table users
(
	id int auto_increment primary key,
    name varchar(100) not null
);

insert into users (name) values ('Harry Potty');
select * from users;