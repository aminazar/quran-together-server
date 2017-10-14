create or replace function clear_commitments(enddate varchar(10)) returns void as $$
declare
  dead_khatm_count int;
  dead_khatm record;
  temp_enddate date;
begin
    temp_enddate = to_timestamp(enddate, 'YYYY-MM-DD');
    select count(*) into dead_khatm_count from khatms where end_date <= temp_enddate;

    if (dead_khatm_count > 0) then
    else
        return;
    end if;

    for dead_khatm in select * from khatms where end_date <= temp_enddate loop
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
    where end_date <= temp_enddate);

    return;
end;
$$ LANGUAGE plpgsql;

create or replace function init_commitments(repeats integer, khid integer) returns void as $$
declare
  repeat_counter smallint;
  page_counter smallint;
begin
    repeat_counter = 0;
    loop
        repeat_counter = repeat_counter + 1;
        exit when repeat_counter > $1;
        page_counter = 0;
        loop
            page_counter = page_counter + 1;
            exit when page_counter > 604;
            insert into commitments(uid, khid, page_number, repeat_number, isread) values(null, $2, page_counter, repeat_counter, false);
        end loop;
    end loop;
    return;
end;
$$ LANGUAGE plpgsql;