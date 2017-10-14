create table everyday_khatm_join(
    khid integer not null references khatms(khid),
    uid integer not null references users(uid),
    primary key (khid, uid)
);