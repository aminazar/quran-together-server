CREATE TABLE user_confirmation(
    uid serial not null primary key references users(uid) on delete cascade on update cascade,
    phrase varchar(30) not null unique
)