select *
from user_confirmation
join users on users.uid = user_confirmation.uid
where phrase = ${phrase};