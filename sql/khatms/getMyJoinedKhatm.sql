select
    khatms.name as khatm_name,
    khatms.share_link as share_link,
    khatm_user_stat.read_pages as read_pages,
    khatm_user_stat.unread_pages as unread_pages
from khatm_user_stat
join khatms on khatms.khid = khatm_user_stat.khid
join users on users.uid = khatm_user_stat.uid
where lower(users.email) = lower(${email})
order by khatms.end_date desc