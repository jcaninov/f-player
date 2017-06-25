SELECT 
MAX(channel1) as max1, MIN(channel1) as min1, 
MAX(channel2) as max2, MIN(channel2) as min2, 
MAX(channel3) as max3, MIN(channel3) as min3
FROM `log`
#where channel1 > 80 AND channel2>100 AND channel3>100;
;
SELECT channel1, COUNT(channel1) as total
FROM `log`
group by channel1
order by total desc
