select
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
  count(case when commitments.uid is not null then 1 end)  as commitment_pages,
  count(case when (commitments.uid is not null and commitments.isread = true) then 1 end) as read_pages,
  count(distinct commitments.uid) as participatings
from commitments
join khatms on commitments.khid = khatms.khid
join users on users.uid = khatms.creator_id
where khatms.share_link = ${share_link}
group by khatms.khid, users.email, users.name