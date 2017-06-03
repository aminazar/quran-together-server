select khatms.*
from khatms
join users on khatms.creator_id = users.uid
where lower(users.email) = lower(${email})