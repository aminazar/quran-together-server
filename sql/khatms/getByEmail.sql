select khatms.*
from khatms
where khatms.creator_id in (select users.uid from users where lower(users.email) = lower(${email}))
union
select khatms.*
from khatms
join commitments on khatms.khid = commitments.khid
where commitments.uid in (select users.uid from users where lower(users.email) = lower(${email}))