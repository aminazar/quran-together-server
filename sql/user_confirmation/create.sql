CREATE TABLE user_confirmation(
    uid serial not null references users(uid) on delete cascade on update cascade,
    phrase varchar(10) not null unique
)