select
    everyday_khatm_join.uid,
    khatms.khid,
    khatms.page_per_day
from everyday_khatm_join
join khatms on everyday_khatm_join.khid = khatms.khid
where khatms.timezone = ${timezone}