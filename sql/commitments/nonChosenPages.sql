select *
from commitments
where khid = ${khid} and uid is null
order by repeat_number, page_number