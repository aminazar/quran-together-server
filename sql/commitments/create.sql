--CREATE TYPE commitState AS ENUM('notFinish', 'done');
--
----CONSTRAINTS
--CREATE FUNCTION null_checker(cdata jsonb, start_page smallint, end_page smallint) RETURNS boolean as $$
--begin
--    if $1 is null then
--        if $2 is null or $3 is null then
--            return false;
--        else
--            return true;
--        end if;
--    end if;
--
--    if $2 is null or $3 is null then
--        if $1 is null then
--            return false;
--        else
--            return true;
--        end if;
--    end if;
--end;
--$$ language plpgsql;

CREATE TABLE commitments(
    cid serial not null primary key,
    uid integer references users(uid),
    khid integer not null references khatms(khid),
    page_number smallint not null,
    repeat_number smallint not null,
    isRead boolean not null default false
);

--ALTER TABLE commitments ADD CONSTRAINT rangeChecker CHECK (null_checker(cdata, start_page, end_page));


create function init_commitments(repeats integer, khid integer) returns void as $$
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