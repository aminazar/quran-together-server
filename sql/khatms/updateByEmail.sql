update khatms
set name = ${name},
    description = ${description},
    creator_shown = ${creator_shown},
    start_date = ${start_date},
    end_date = ${end_date},
    timezone = ${timezone},
    specific_sura = ${specific_sura},
    repeats = ${repeats}
where creator_id in (select users.uid from users where lower(users.email) = lower(${email}))