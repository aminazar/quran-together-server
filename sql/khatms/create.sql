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
    repeats smallint default 1,
    share_link varchar(255) unique,
    is_everyday boolean default false not null,
    page_per_day smallint default 3 not null

);

create function clear_commitments(enddate date) returns void as $$
declare
  dead_khatm_count int;
  dead_khatm record;
begin
    select count(*) into dead_khatm_count from khatms where end_date < enddate;

    if (dead_khatm_count > 0) then
    else
        return;
    end if;

    for dead_khatm in select * from khatms where end_date < enddate loop
        insert into khatm_stat(khid, read_pages, all_pages, participants_number)
            select khid, count(case when isread = true then 1 end) as read_pages, count(*) as all_pages, count(distinct uid) as participants_number
            from commitments
            where khid = dead_khatm.khid
            group by khid;

        insert into khatm_user_stat(khid, uid, read_pages, unread_pages)
            select khid, uid, count(case when isread = true then 1 end) as read_pages, count(case when isread = false then 1 end) as unread_pages
            from commitments
            where khid = dead_khatm.khid and uid is not null
            group by khid, uid;

    end loop;

    delete from commitments
    where khid in
    (select khid
    from khatms
    where end_date < enddate);

    return;
end;
$$ LANGUAGE plpgsql;