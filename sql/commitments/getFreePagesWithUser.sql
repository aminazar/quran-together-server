select *
from commitments
where uid is null and khid = ${khid}
union
select *
from commitments
where uid = ${uid} and khid = ${khid} and isread = false