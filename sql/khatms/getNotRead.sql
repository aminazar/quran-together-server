select
    khatms.name as khatm_name,
    khatms.end_date,
    khatms.share_link,
    users.uid as uid,
    users.email as user_email,
    users.name as user_name,
    count(case when commitments.isread = false then 1 end) as remaining_pages,
    count(case when commitments.isread = true then 1 end) as read_pages
from khatms
join commitments on khatms.khid = commitments.khid
join users on commitments.uid = users.uid
where commitments.uid is not null and lower(khatms.timezone) = lower(${timezone})
group by khatms.khid, users.uid, commitments.uid