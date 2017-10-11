create table khatm_stat(
    khid integer references khatms(khid) primary key,
    read_pages integer not null default 0,
    all_pages integer not null default 0,
    participants_number integer not null default 1
);