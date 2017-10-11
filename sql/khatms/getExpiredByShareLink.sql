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
  users.email as owner_email,
  khatms.share_link,
  khatms.is_everyday,
  khatms.page_per_day,
  khatm_stat.read_pages,
  khatm_stat.participants_number as participatings,
  khatm_user_stat.read_pages as you_read,
  khatm_user_stat.unread_pages as you_unread
from khatm_stat
join khatms on khatm_stat.khid = khatms.khid
join users on users.uid = khatms.creator_id
join khatm_user_stat on khatms.khid = khatm_user_stat.khid
join users as us on khatm_user_stat.uid = us.uid
where khatms.share_link = ${share_link} and lower(us.email) = lower(${email})
group by khatms.khid, users.email, users.name, khatm_stat.read_pages, khatm_stat.participants_number, khatm_user_stat.read_pages, khatm_user_stat.unread_pages
