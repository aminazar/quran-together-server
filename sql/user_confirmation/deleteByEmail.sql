delete from user_confirmation
  where uid in (select uid from users where email = ${email})