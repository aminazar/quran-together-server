select t1.khid, *
from
(select
  khatms.khid as khid,
  khatms.name as khatm_name,
  khatms.description,
  khatms.creator_shown,
  khatms.start_date,
  khatms.end_date,
  khatms.timezone,
  khatms.specific_sura,
  khatms.repeats,
  users.name as owner_name,
  users.email as owner_nmail,
  khatms.share_link,
  khatms.end_date - khatms.start_date as rest_days,
  count(case when commitments.uid is not null then 1 end)  as commitment_pages,
  count(case when (commitments.uid is not null and commitments.isread = true) then 1 end) as read_pages,
  count(distinct commitments.uid) as participatings
from commitments
join khatms on commitments.khid = khatms.khid
join users on users.uid = khatms.creator_id
where khatms.khid in (select kht_c.khid
                      from khatms as kht_c
                      join users as us_c on kht_c.creator_id = us_c.uid
                      where lower(us_c.email) = lower(${email})
                      union
                      select kht_u.khid
                      from khatms as kht_u
                      join commitments as com on kht_u.khid = com.khid
                      join users as us_u on com.uid = us_u.uid
                      where lower(us_u.email) = lower(${email}))
group by khatms.khid, users.email, users.name) as t1
left outer join
(select
    khatms.khid as k,
    count(case when commitments.isread = true then 1 end) as you_read,
    count(case when commitments.isread = false then 1 end) as you_unread
from users
join commitments on users.uid = commitments.uid
join khatms on khatms.khid = commitments.khid
where lower(users.email) = lower(${email})
group by khatms.khid) as t2 on t2.k = t1.khid