select
    khatms.name as khatm_name,
    khatms.share_link as share_link,
    khatm_stat.read_pages as read_pages,
    khatm_stat.all_pages as all_pages,
    khatm_stat.participants_number as participants_number
from khatm_stat
join khatms on khatm_stat.khid = khatms.khid
join users on khatms.creator_id = users.uid
where lower(users.email) = lower(${email})
order by khatms.end_date desc