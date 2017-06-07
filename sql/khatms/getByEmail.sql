select khatms.*, users.name as ownerName
from khatms
join users on users.uid = khatms.creator_id
where  lower(users.email) = lower(${email})
union
select khatms.*, owner.name as ownerName
from khatms
join commitments on khatms.khid = commitments.khid
join users as owner on owner.uid = khatms.creator_id
where commitments.uid in (select users.uid from users where lower(users.email) = lower(${email}))