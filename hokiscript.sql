use hokihokibento;

-- GET
select * from users;
select * from product;
select * from cart;
select * from product where harga = 35000; -- * = all id, nama, harga
select * from product order by id desc limit 2; 
-- where (nama_column) (=,>,<,>=,<=) (value)
-- logic (AND(&&), OR(||), NOT(!==)) 
select * from cart;
select * from transaction order by tanggalTransaksi asc;
-- req.params.(orderBy) => asc || desc
select id, tanggalTransaksi, totalBayaran from transaction;
select * from transactionitem;  

select * from product;
select min(harga) from product;
select max(harga) from product;
-- maximum || minimum value pada satu kolom

select count(id) from product;
select avg(harga) from product;
select sum(harga) from product;

-- POST
insert into product (nama, harga) values ('Paket Hemat C', 30000);
insert into product values(10, 'Paket Hemat A', 20000);
-- insert into (nama_tabel) (nama_column, ... , ...) values (value_per_column, ... , ...)
-- insert into (nama_tabel) values (nama_column);

-- PATCH / PUT
update product set harga = 40000, nama = 'Paket Hemat Z' where id = 12;
-- update (nama_tabel) set (nama_column) = (value_baru), ... , ... where (kondisi)

-- DELETE
delete from product where id = 12;
-- delete from (nama_tabel) where (kondisi)

-----------------------------------------------------------------------------------------------

select id, namaPembeli from transaction where totalBayaran > 200000 and namaPembeli = 'Lian'; -- semua hrs true
select id, namaPembeli from transaction where totalBayaran < 200000; -- slh satu hrs true
select * from transaction where not totalHarga = 100000 order by totalBayaran asc; -- not equal to / asc(ascending), desc (descending)
select * from transactionitem limit 5; -- batas 5 data yg di return
select * from transactionitem limit 3 offset 0; -- paging/pagination

select min(totalHarga) from transaction;
select max(totalHarga) from transaction;

select * from product;
insert into product (nama, harga) values ('Paket Hemat C', 30000); -- masukkan data baru
update product set harga = 40000 where id = 13; -- update data
delete from product where id = 13; -- delete data

------------------------------------------------------------------------------------------------

select * from product;
select * from transaction;
select * from transactionitem;

-- Primary key and foreign key
-- Join table

select t.id from transaction t;

select * from transactionitem t join product p on p.id = t.productId;
select * from transactionitem ti join transaction t on t.id = ti.transactionItem;
select ti.productId, ti.harga, t.namaPembeli from transactionItem ti join transaction t on t.id = ti.transactionItem;

select t.namaPembeli, t.tanggalTransaksi, ti.productId, ti.harga 
from transactionitem ti 
join transaction t 
on t.id = ti.transactionId;

select t.namaPembeli, t.tanggalTransaksi, ti.productId, ti.harga 
from transactionitem ti 
join transaction t 
on t.id = ti.transactionId 
join product p 
on p.id = ti.productId;

select * from transaction t join transactionitem ti on t.id = ti.transactionId;

select p.nama, sum(ti.qty) as totalSold from transactionitem ti join product p on p.id = ti.productId group by p.nama order by totalSold;

select * from transaction order by namaPembeli;
select  namaPembeli, sum(totalBayaran) as totalSpent
from transaction
where namaPembeli = 'Richard'; -- setiap pembeli udh spend berapa duit

----------------------------------------------------------------------------------------------------

select * from transactionitem;
select p.nama, ti.harga, ti.qty from transactionitem ti join product p on p.id = ti.productId;

select p.nama, sum(ti.harga*ti.qty) as totalRevenue
from transactionitem ti
join product p on p.id = ti.productId
group by nama
order by totalRevenue desc;

select p.nama, sum(ti.qty) as totalSold
from transactionitem ti
join product p on p.id = ti.productId
group by nama
order by totalSold desc;

select * from transactionitem;
select * from product;
-- subquery
-- in / not in
select * from product where id in (select productId from transactionitem);
select * from product where id not in (select productId from transactionitem);
select * from transaction where totalBayaran > (select avg(totalBayaran) from transaction);

-----------------------------------------------------------------------------------------------------

-- View utk data read-only / data tdk bakal berubah lagi eg. monthly report
-- create view => bikin view
-- drop view => delete view
create view totalSold as select p.nama, sum(ti.qty) as totalSold
from transactionitem ti
join product p on p.id = ti.productId
group by nama
order by totalSold desc;
select * from totalSold; -- VIEW DATA

create view report_22_23_Maret as select sum(totalBayaran) as totalRevenue, sum(ti.qty) as totalSold
from transaction t join transactionitem ti on t.id = ti.transactionId 
where tanggalTransaksi between '2019-03-22' and '2019-03-24';
select * from report_22_23_Maret; -- VIEW DATA

select * from transaction;
select * from transactionitem;

-- Join Primary Key & Foreign Key => menggabungkan beda tabel
select * from transaction t 
join transactionitem ti on ti.transactionId = t.id 
join product p on p.id = ti.productId
order by p.id;

-- Group By => gabungkan data value yang sama
select p.nama, sum(ti.qty) as totalSold from transaction t 
join transactionitem ti on ti.transactionId = t.id 
join product p on p.id = ti.productId
group by p.nama
order by totalSold desc;

-- Subquery => untuk komparasi antar tabel
-- Views => simpen data untuk yang tdk berubah" lagi

-- USER/ACCOUNT CHECK
select * from mysql.user;
alter user 'Aldrich'@'localhost' identified with mysql_native_password by 'neil1804';

-- INCLUDES
select * from product where nama like '%Bento%'; -- search huruf/kata ditengah
select * from product where nama like 'p%'; -- search huruf/kata depan
select * from product where nama like '%a'; -- search huruf/kata belakang

-- Database design
-- Table Relations || Relasi
-- Foreign Key => Primary Key dari satu tabel yang berada di tabel yang berbeda
-- transactionitem bawa 2 foreign key (productId, transactionId)
-- + products => Paket Bento A, paket Bento cache index

-- View
-- Simpen data apa aja, biasanya
-- Report yang mau ditarik itu apa aja (sales, stock/inventory)

-- Contoh" Relasi
-- One to One => contoh : 1 username hny pny 1 password, vice versa aka hanya 1 pasang data
-- One to Many => Many : yang simpen foreign key, satu row transaction dipunyai banyak transactionitem
-- Many to Many => 1 user bisa pesan byk product dan 1 product bisa dipesan oleh banyak user

select * from transaction t join users u on t.userId = u.Id;

select t.id, t.tanggalTransaksi, t.totalHarga, t.totalBayaran, u.username 
from transaction t 
join users u on t.userId = u.Id;

select c.id, u.username, p.nama, p.harga, c.qty, c.qty * p.harga as price
from cart c 
join product p on p.id = c.productId
join users u on u.id = c.userId;

select * from cart;