create table khatm_user_stat(
    khid integer references khatms(khid),
    uid integer references users(uid),
    read_pages integer not null default 0,
    unread_pages integer not null default 0,
    primary key(khid, uid)
);