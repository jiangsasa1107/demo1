create database mymovie;

use mymovie;

create table movies
(
	id int auto_increment primary key,
    name varchar(100) not null,
    year int not null
);

insert into movies (name, year) values ('Movie1', 2001);
select * from movies;