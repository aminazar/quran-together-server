CREATE TABLE khatms(
    khid serial not null primary key,
    creator_id integer references users(uid),
    name varchar(255) not null,
    description text,
    creator_shown boolean not null,
    start_date date default CURRENT_DATE,
    end_date date,
    timezone varchar(10) not null,
    specific_sura smallint,
    repeats smallint default 1
)