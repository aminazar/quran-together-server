select x.*, y.*
from
(select t1.khid as khatm_id, *
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
  khatms.is_everyday,
  khatms.page_per_day,
  users.name as owner_name,
  users.email as owner_email,
  khatms.share_link,
  count(case when commitments.uid is not null then 1 end)  as commitment_pages,
  count(case when (commitments.uid is not null and commitments.isread = true) then 1 end) as read_pages,
  count(distinct commitments.uid) as participatings
from commitments
join khatms on commitments.khid = khatms.khid
join users on users.uid = khatms.creator_id
where khatms.share_link = ${share_link}
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
group by khatms.khid) as t2 on t2.k = t1.khid) as x
left outer join
(select
    everyday_khatm_join.khid as join_khid
from everyday_khatm_join
join users on everyday_khatm_join.uid = users.uid
where lower(users.email) = lower(${email})) as y on x.khatm_id = y.join_khid