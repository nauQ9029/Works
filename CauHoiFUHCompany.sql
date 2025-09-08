
--1.Cho biết ai đang quản lý phòng ban có tên: Phòng Nghiên cứu và phát triển.
--Thông tin yêu cầu: mã số,họ tên nhân viên, mã số phòng ban, tên phòng ban

select empSSN empName, d.depNum, depName
from tblEmployee e, tblDepartment d
where e.depNum = d.depNum and
depName =  N'Phòng Nghiên cứu và phát triển'	

select empSSN empName, d.depNum, depName
from tblEmployee e, tblDepartment d
where d.mgrSSN = e.empSSN and
depName = N'Phòng Nghiên cứu và phát triển'	

--Cách 2
select empSSN empName, d.depNum, depName
from tblEmployee e inner join tblDepartment d on e.empSSN = d.mgrSSN
where depName = N'Phòng Nghiên cứu và phát triển'

select *from tblDepartment
select *from tblEmployee

 --2.Cho phòng ban có tên: Phòng Nghiên cứu và phát triển hiện đang quản lý dự án nào. 
 --Thông tin yêu cầu: mã số dụ án, tên dự án, tên phòng ban quản lý
 select proNum, proName, depName
 from tblProject p, tblDepartment d
 where depName = N'Phòng Nghiên cứu và phát triển'

 --3.Cho biết dự án có tên ProjectB hiện đang được quản lý bởi phòng ban nào. 
--Thông tin yêu cầu: mã số dụ án, tên dự án, tên phòng ban quản lý
 select proNum, proName, depName
 from tblProject p, tblDepartment d
 where proName = N'ProjectB'

 --4.Cho biết những nhân viên nào đang bị giám sát bởi nhân viên có tên Mai Duy An.
 --Thông tin yêu cầu: mã số nhân viên, họ tên nhân viên
select e1.empSSN, e1.empName
from tblEmployee e1 inner join tblEmployee e2 on e2.empSSN = e1.supervisorSSN 
where e2.empName = N'Mai Duy An'

--5.Cho biết ai hiện đang giám sát những nhân viên có tên Mai Duy An. 
--Thông tin yêu cầu: mã số nhân viên, họ tên nhân viên giám sát.
select e2.empSSN, e2.empName
from tblEmployee e1 inner join tblEmployee e2 on e2.empSSN = e1.supervisorSSN 
where e1.empName = N'Mai Duy An'

--6.Cho biết dự án có tên ProjectA hiện đang làm việc ở đâu. 
--Thông tin yêu cầu: mã số, tên vị trí làm việc.
select p.proNum, l.locName
from tblProject p inner join tblLocation l on p.locNum = l.locNum
where p.proName = N'ProjectA'


--7.Cho biết vị trí làm việc có tên Tp. HCM hiện đang là chỗ làm việc của những dự án nào. 
--Thông tin yêu cầu: mã số, tên dự án
select proNum,proName
from tblProject p inner join tblLocation l on p.locNum = l.locNum
where locName = N'TP Hồ Chí Minh'

--8.Cho biết những người phụ thuộc trên 18 tuổi .
--Thông tin yêu cầu: tên, ngày tháng năm sinh của người phụ thuộc, tên nhân viên phụ thuộc vào.
select depName, depBirthdate, empName
from tblDependent d inner join tblEmployee e on d.empSSN = e.empSSN
WHERE DATEDIFF(YEAR, depBirthdate, GETDATE()) > 18

--9.Cho biết những người phụ thuộc  là nam giới. 
--Thông tin yêu cầu: tên, ngày tháng năm sinh của người phụ thuộc, tên nhân viên phụ thuộc vào 
select depName, depBirthdate, empName
from tblDependent d inner join tblEmployee e on d.empSSN = e.empSSN
where depSex = N'M'

--10.	Cho biết những nơi làm việc của phòng ban có tên 
--: Phòng Nghiên cứu và phát triển. Thông tin yêu cầu: mã phòng ban, tên phòng ban, tên nơi làm việc.
select d.depNum, depName, locName
from (tblDepartment d inner join tblDepLocation l on d.depNum = l.depNum)
inner join tblLocation c on c.locNum = l.locNum
where depName = N'Phòng Nghiên cứu và phát triển'

--Cách 2

select d.depNum, depName, locName
from tblDepartment d, tblDepLocation i, tblLocation c
where d.depNum = i.depNum and i.locNum=c.locNum
and depName = N'Phòng nghiên cứu và phát triển'

--11.Cho biết các dự án làm việc tại Tp. HCM.
--Thông tin yêu cầu: mã dự án, tên dự án, tên phòng ban chịu trách nhiệm dự án.
select p.proNum, p.proName, d.depName, l.locName
from tblProject p, tblDepartment d, tblLocation l
where p.depNum = d.depNum and p.locNum = l.locNum 
and l.locName = N'TP Hồ Chí Minh'

--12.Cho biết những người phụ thuộc là nữ giới, của nhân viên thuộc phòng ban có tên: Phòng Nghiên cứu và phát triển . 
--Thông tin yêu cầu: tên nhân viên, tên người phụ thuộc, mối liên hệ giữa người phụ thuộc với nhân viên
select e.empName, d.depName, d.depRelationship
from tblEmployee e, tblDependent d, tblDepartment de
where e.empSSN = d.empSSN and e.depNum = de.depNum
and d.depSex = N'F' and de.depName = N'Phòng Nghiên cứu và phát triển'

--13.Cho biết những người phụ thuộc trên 18 tuổi, của nhân viên thuộc phòng ban có tên: Phòng Nghiên cứu và phát triển. 
--Thông tin yêu cầu: tên nhân viên, tên người phụ thuộc, mối liên hệ giữa người phụ thuộc với nhân viên
select e.empName, d.depName, d.depRelationship
from tblEmployee e, tblDependent d, tblDepartment de
where e.empSSN = d.empSSN and e.depNum = de.depNum
and de.depName = N'Phòng Nghiên cứu và phát triển' and DATEDIFF(YEAR, d.depBirthdate, GETDATE()) > 18

--14.Cho biết số lượng người phụ thuộc theo giới tính. 
--Thông tin yêu cầu: giới tính, số lượng người phụ thuộc
select depSex, count(depName) as totalDep
from tblDependent
group by depSex

--Cách 2
select 
case
when depSex ='F' then N'Nữ'
else 'Nam'
end 'Giới tính',
count(depName) as'Số lượng người phụ thuộc'
from tblDependent 
group by depSex

--15.Cho biết số lượng người phụ thuộc theo mối liên hệ với nhân viên. 
--Thông tin yêu cầu: mối liên hệ, số lượng người phụ thuộc
select  d.depRelationship, COUNT(d.depName) as totalDepRela
from tblEmployee e , tblDependent d
where e.empSSN = d.empSSN
GROUP BY d.depRelationship

--16.Cho biết số lượng người phụ thuộc theo mỗi phòng ban. 
--Thông tin yêu cầu: mã phòng ban, tên phòng ban, số lượng người phụ thuộc
 select d.depNum, d.depName, count(de.depName) as SLNPT
 from tblDepartment d inner join tblEmployee e on d.depNum=e.depNum
 inner join tblDependent de on de.empSSN = e.empSSN
 group by d.depNum, d.depName

--17.Cho biết phòng ban nào có số lượng người phụ thuộc là ít nhất. 
--Thông tin yêu cầu: mã phòng ban, tên phòng ban, số lượng người phụ thuộc
select TOP 1 WITH TIES d.depNum, d.depName, count(de.depName) as SLNPT
 from tblDepartment d inner join tblEmployee e on d.depNum=e.depNum
 inner join tblDependent de on de.empSSN = e.empSSN
 group by d.depNum, d.depName
 order by SLNPT asc

--18.Cho biết phòng ban nào có số lượng người phụ thuộc là nhiều nhất. 
--Thông tin yêu cầu: mã phòng ban, tên phòng ban, số lượng người phụ thuộc
select TOP 1 WITH TIES d.depNum, d.depName, count(de.depName) as SLNPT
 from tblDepartment d inner join tblEmployee e on d.depNum=e.depNum
 inner join tblDependent de on de.empSSN = e.empSSN
 group by d.depNum, d.depName
 order by SLNPT desc

--19.Cho biết tổng số giờ tham gia dự án của mỗi nhân viên. 
--Thông tin yêu cầu: mã nhân viên, tên nhân viên, tên phòng ban của nhân viên
select e.empSSN, e.empName, d.depName, SUM(w.workHours) AS totalWorkHours
from tblEmployee e, tblDepartment d, tblWorksOn w
where e.depNum = d.depNum and e.empSSN = w.empSSN
GROUP BY e.empSSN, e.empName, d.depName

--20.Cho biết tổng số giờ làm dự án của mỗi phòng ban. 
--Thông tin yêu cầu: mã phòng ban,  tên phòng ban, tổng số giờ
select d.depNum, d.depName, SUM(w.workHours) AS totalWorkHours
from tblDepartment d, tblWorksOn w, tblEmployee e
where e.depNum = d.depNum and e.empSSN = w.empSSN
GROUP BY d.depNum, d.depName

--21.Cho biết nhân viên nào có số giờ tham gia dự án là ít nhất. 
--Thông tin yêu cầu: mã nhân viên, tên nhân viên, tổng số giờ tham gia dự án
select TOP 1 WITH TIES e.empSSN, e.empName, SUM(w.workHours) AS totalWorkHours
from tblEmployee e, tblDepartment d, tblWorksOn w
where e.depNum = d.depNum and e.empSSN = w.empSSN
GROUP BY e.empSSN, e.empName
ORDER BY totalWorkHours ASC

--22.Cho biết nhân viên nào có số giờ tham gia dự án là nhiều nhất. 
--Thông tin yêu cầu: mã nhân viên, tên nhân viên, tổng số giờ tham gia dự án
select TOP 1 WITH TIES e.empSSN, e.empName, SUM(w.workHours) AS totalWorkHours
from tblEmployee e, tblDepartment d, tblWorksOn w
where e.depNum = d.depNum and e.empSSN = w.empSSN
GROUP BY e.empSSN, e.empName
ORDER BY totalWorkHours DESC

--23.Cho biết những nhân viên nào lần đầu tiên tham gia dụ án. 
--Thông tin yêu cầu: mã nhân viên, tên nhân viên, tên phòng ban của nhân viên
WITH RankedWorks AS (
  SELECT
    e.empSSN,
    e.empName,
    d.depName,
    ROW_NUMBER() OVER (PARTITION BY w.proNum ORDER BY e.empStartdate ASC) AS RowNum
  FROM tblEmployee e
  JOIN tblDepartment d ON e.depNum = d.depNum
  JOIN tblWorksOn w ON e.empSSN = w.empSSN
)
SELECT empSSN, empName, depName
FROM RankedWorks
WHERE RowNum = 1;

--24.Cho biết những nhân viên nào lần thứ hai tham gia dụ án. 
--Thông tin yêu cầu: mã nhân viên, tên nhân viên, tên phòng ban của nhân viên
WITH RankedWorks AS (
  SELECT
    e.empSSN,
    e.empName,
    d.depName,
    ROW_NUMBER() OVER (PARTITION BY w.proNum ORDER BY e.empStartdate ASC) AS RowNum
  FROM tblEmployee e
  JOIN tblDepartment d ON e.depNum = d.depNum
  JOIN tblWorksOn w ON e.empSSN = w.empSSN
)
SELECT empSSN, empName, depName
FROM RankedWorks
WHERE RowNum = 2;

--25.Cho biết những nhân viên nào tham gia tối thiểu hai dụ án. 
--Thông tin yêu cầu: mã nhân viên, tên nhân viên, tên phòng ban của nhân viên
SELECT e.empSSN, e.empName, d.depName
FROM tblEmployee e, tblDepartment d, tblWorksOn w
where e.depNum = d.depNum and e.empSSN = w.empSSN
GROUP BY e.empSSN, e.empName, d.depName
HAVING COUNT(DISTINCT w.proNum) >= 2

--26.Cho biết số lượng thành viên của mỗi dự án. 
--Thông tin yêu cầu: mã dự án, tên dự án, số lượng thành viên
SELECT p.proNum, p.proName, COUNT(e.empSSN) AS numMembers
FROM tblProject p, tblEmployee e
where p.depNum = e.depNum
GROUP BY p.proNum, p.proName

--27.Cho biết tổng số giờ làm của mỗi dự án. 
--Thông tin yêu cầu: mã dự án, tên dự án, tổng số giờ làm
SELECT p.proNum, p.proName, SUM(w.workHours) AS totalWorkHours
FROM tblProject p, tblWorksOn w
where p.proNum = w.proNum
GROUP BY p.proNum, p.proName

--28.Cho biết dự án nào có số lượng thành viên là ít nhất. 
--Thông tin yêu cầu: mã dự án, tên dự án, số lượng thành viên
SELECT TOP 1 WITH TIES p.proNum, p.proName, COUNT(w.empSSN) AS Totalemp
FROM tblProject p, tblWorksOn w
where p.proNum = w.proNum
GROUP BY p.proNum, p.proName
ORDER BY Totalemp ASC

--29.Cho biết dự án nào có số lượng thành viên là nhiều nhất. 
--Thông tin yêu cầu: mã dự án, tên dự án, số lượng thành viên
SELECT TOP 1 WITH TIES p.proNum, p.proName, COUNT(w.empSSN) AS Totalemp
FROM tblProject p, tblWorksOn w
where p.proNum = w.proNum
GROUP BY p.proNum, p.proName
ORDER BY Totalemp DESC

--30.Cho biết dự án nào có tổng số giờ làm là ít nhất. 
--Thông tin yêu cầu: mã dự án, tên dự án, tổng số giờ làm
SELECT TOP 1 WITH TIES p.proNum, p.proName, SUM(w.workHours) AS totalWorkHours
FROM tblProject p, tblWorksOn w
where p.proNum = w.proNum
GROUP BY p.proNum, p.proName
ORDER BY totalWorkHours ASC

--31.Cho biết dự án nào có tổng số giờ làm là nhiều nhất. 
--Thông tin yêu cầu: mã dự án, tên dự án, tổng số giờ làm
SELECT TOP 1 WITH TIES p.proNum, p.proName, SUM(w.workHours) AS totalWorkHours
FROM tblProject p, tblWorksOn w
where p.proNum = w.proNum
GROUP BY p.proNum, p.proName
ORDER BY totalWorkHours DESC

--32.Cho biết số lượng phòng ban làm việc theo mỗi nơi làm việc. 
--Thông tin yêu cầu: tên nơi làm việc, số lượng phòng ban
select l.locName, COUNT(d.depName) as totalDepNum
from tblLocation l, tblDepLocation de, tblDepartment d
where l.locNum = de.locNum and de.depNum = d.depNum
GROUP BY l.locName

--33.Cho biết số lượng chỗ làm việc theo mỗi phòng ban. 
--Thông tin yêu cầu: mã phòng ban, tên phòng ban, số lượng chỗ làm việc
select d.depNum, d.depName, COUNT(l.locName) as totalLocNum
from tblLocation l, tblDepLocation de, tblDepartment d
where l.locNum = de.locNum and de.depNum = d.depNum
GROUP BY d.depNum, d.depName

--34.Cho biết phòng ban nào có nhiều chỗ làm việc nhất. 
--Thông tin yêu cầu: mã phòng ban, tên phòng ban, số lượng chỗ làm việc
select TOP 1 WITH TIES d.depNum, d.depName, COUNT(l.locName) as totalLocNum
from tblLocation l, tblDepLocation de, tblDepartment d
where l.locNum = de.locNum and de.depNum = d.depNum
GROUP BY d.depNum, d.depName
ORDER BY totalLocNum DESC

--35.Cho biết phòng ban nào có it chỗ làm việc nhất. 
--Thông tin yêu cầu: mã phòng ban, tên phòng ban, số lượng chỗ làm việc
select TOP 1 WITH TIES d.depNum, d.depName, COUNT(l.locName) as totalLocNum
from tblLocation l, tblDepLocation de, tblDepartment d
where l.locNum = de.locNum and de.depNum = d.depNum
GROUP BY d.depNum, d.depName
ORDER BY totalLocNum ASC

--36.Cho biết địa điểm nào có nhiều phòng ban làm việc nhất. 
--Thông tin yêu cầu: tên nơi làm việc, số lượng phòng ban
select TOP 1 WITH TIES l.locName, COUNT(d.depName) as totalDepNum
from tblLocation l, tblDepLocation de, tblDepartment d
where l.locNum = de.locNum and de.depNum = d.depNum
GROUP BY l.locName
ORDER BY totalDepNum DESC

--37.Cho biết địa điểm nào có ít phòng ban làm việc nhất. 
--Thông tin yêu cầu: tên nơi làm việc, số lượng phòng ban
select TOP 1 WITH TIES l.locName, COUNT(d.depName) as totalDepNum
from tblLocation l, tblDepLocation de, tblDepartment d
where l.locNum = de.locNum and de.depNum = d.depNum
GROUP BY l.locName
ORDER BY totalDepNum ASC

--38.Cho biết nhân viên nào có nhiều người phụ thuộc nhất. 
--Thông tin yêu cầu: mã số, họ tên nhân viên, số lượng người phụ thuộc
select TOP 1 WITH TIES e.empSSN, e.empName, COUNT(d.depName) as totalDepNum
from tblEmployee e, tblDependent d
where e.empSSN = d.empSSN
GROUP BY e.empSSN, e.empName
ORDER BY totalDepNum DESC

--39.Cho biết nhân viên nào có ít người phụ thuộc nhất. 
--Thông tin yêu cầu: mã số, họ tên nhân viên, số lượng người phụ thuộc
select TOP 1 WITH TIES e.empSSN, e.empName, COUNT(d.depName) as totalDepNum
from tblEmployee e, tblDependent d
where e.empSSN = d.empSSN
GROUP BY e.empSSN, e.empName
ORDER BY totalDepNum ASC

--40.Cho biết nhân viên nào không có người phụ thuộc. 
--Thông tin yêu cầu: mã số nhân viên, họ tên nhân viên, tên phòng ban của nhân viên
SELECT e.empSSN, e.empName, d.depName
FROM tblEmployee e
inner JOIN tblDepartment d ON e.depNum = d.depNum
LEFT JOIN tblDependent de ON e.empSSN = de.empSSN
GROUP BY e.empSSN, e.empName, d.depName
HAVING COUNT(de.depName) = 0

--41.Cho biết phòng ban nào không có người phụ thuộc. 
--Thông tin yêu cầu: mã số phòng ban, tên phòng ban
SELECT d.depNum, d.depName
FROM tblEmployee e
inner JOIN tblDepartment d ON e.depNum = d.depNum
LEFT JOIN tblDependent de ON e.empSSN = de.empSSN
GROUP BY d.depNum, d.depName
HAVING COUNT(de.depName) = 0

--42.Cho biết những nhân viên nào chưa hề tham gia vào bất kỳ dự án nào. 
--Thông tin yêu cầu: mã số, tên nhân viên, tên phòng ban của nhân viên
SELECT e.empSSN, e.empName, d.depName
FROM tblEmployee e
JOIN tblDepartment d ON e.depNum = d.depNum
LEFT JOIN tblWorksOn w ON e.empSSN = w.empSSN
WHERE w.proNum IS NULL
GROUP BY e.empSSN, e.empName, d.depName

--43.Cho biết phòng ban không có nhân viên nào tham gia (bất kỳ) dự án. 
--Thông tin yêu cầu: mã số phòng ban, tên phòng ban
SELECT d.depNum, d.depName
FROM tblDepartment d
LEFT JOIN tblEmployee e ON d.depNum = e.depNum
LEFT JOIN tblWorksOn w ON e.empSSN = w.empSSN
WHERE w.proNum IS NULL
GROUP BY d.depNum, d.depName

--44.Cho biết phòng ban không có nhân viên nào tham gia vào dự án có tên là ProjectA. 
--Thông tin yêu cầu: mã số phòng ban, tên phòng ban
SELECT d.depNum, d.depName
FROM tblDepartment d
LEFT JOIN tblEmployee e ON d.depNum = e.depNum
LEFT JOIN tblWorksOn w ON e.empSSN = w.empSSN
LEFT JOIN tblProject p ON w.proNum = p.proNum
WHERE p.proName = N'ProjectA'AND w.proNum IS NULL
GROUP BY d.depNum, d.depName

--45.Cho biết số lượng dự án được quản lý theo mỗi phòng ban. 
--Thông tin yêu cầu: mã phòng ban, tên phòng ban, số lượng dự án
SELECT d.depNum, d.depName, COUNT(DISTINCT w.proNum) AS totalProjects
FROM tblDepartment d
LEFT JOIN tblEmployee e ON d.depNum = e.depNum
LEFT JOIN tblWorksOn w ON e.empSSN = w.empSSN
GROUP BY d.depNum, d.depName

--46.Cho biết phòng ban nào quản lý it dự án nhất. 
--Thông tin yêu cầu: mã phòng ban, tên phòng ban, số lượng dự án
SELECT TOP 1 WITH TIES d.depNum, d.depName, COUNT(DISTINCT w.proNum) AS totalProjects
FROM tblDepartment d
LEFT JOIN tblEmployee e ON d.depNum = e.depNum
LEFT JOIN tblWorksOn w ON e.empSSN = w.empSSN
GROUP BY d.depNum, d.depName
ORDER BY totalProjects asc

--47.Cho biết phòng ban nào quản lý nhiều dự án nhất. 
--Thông tin yêu cầu: mã phòng ban, tên phòng ban, số lượng dự án
SELECT TOP 1 WITH TIES d.depNum, d.depName, COUNT(DISTINCT w.proNum) AS totalProjects
FROM tblDepartment d
LEFT JOIN tblEmployee e ON d.depNum = e.depNum
LEFT JOIN tblWorksOn w ON e.empSSN = w.empSSN
GROUP BY d.depNum, d.depName
ORDER BY totalProjects desc

--48.Cho biết những phòng ban nào có nhiểu hơn 5 nhân viên đang quản lý dự án gì. 
--Thông tin yêu cầu: mã phòng ban, tên phòng ban, số lượng nhân viên của phòng ban, tên dự án quản lý
SELECT d.depNum, d.depName, COUNT(DISTINCT e.empSSN) AS totalEmployees, p.proName AS projectName
FROM tblDepartment d
LEFT JOIN tblEmployee e ON d.depNum = e.depNum
LEFT JOIN tblWorksOn w ON e.empSSN = w.empSSN
LEFT JOIN tblProject p ON p.proNum = w.proNum
GROUP BY d.depNum, d.depName, p.proName
HAVING COUNT(DISTINCT e.empSSN) > 5

--49.Cho biết những nhân viên thuộc phòng có tên là Phòng nghiên cứu, và không có người phụ thuộc. 
--Thông tin yêu cầu: mã nhân viên,họ tên nhân viên
SELECT e.empSSN, e.empName
FROM tblEmployee e
JOIN tblDepartment d ON e.depNum = d.depNum
LEFT JOIN tblDependent de ON e.empSSN = de.empSSN
WHERE d.depName = N'Phòng Nghiên cứu và phát triển' AND de.empSSN IS NULL

--50.Cho biết tổng số giờ làm của các nhân viên, mà các nhân viên này không có người phụ thuộc. 
--Thông tin yêu cầu: mã nhân viên,họ tên nhân viên, tổng số giờ làm
SELECT e.empSSN, e.empName,  SUM(w.workHours) AS totalHoursWorked
FROM tblEmployee e
LEFT JOIN tblWorksOn w ON e.empSSN = w.empSSN
LEFT JOIN tblDependent de ON e.empSSN = de.empSSN
WHERE de.empSSN IS NULL
GROUP BY e.empSSN, e.empName

--51.Cho biết tổng số giờ làm của các nhân viên, mà các nhân viên này có nhiều hơn 3 người phụ thuộc. 
--Thông tin yêu cầu: mã nhân viên,họ tên nhân viên, số lượng người phụ thuộc, tổng số giờ làm
SELECT e.empSSN, e.empName, COUNT(de.depName) AS totalDependents, SUM(w.workHours) AS totalHoursWorked
FROM tblEmployee e
LEFT JOIN tblWorksOn w ON e.empSSN = w.empSSN
LEFT JOIN tblDependent de ON e.empSSN = de.empSSN
GROUP BY e.empSSN, e.empName
HAVING COUNT(de.depName) > 3

--52.Cho biết tổng số giờ làm việc của các nhân viên hiện đang dưới quyền giám sát (bị quản lý bởi) của nhân viên Mai Duy An. 
--Thông tin yêu cầu: mã nhân viên, họ tên nhân viên, tổng số giờ làm
SELECT e1.empSSN, e1.empName, SUM(w.workHours) AS totalHoursWorked
FROM tblEmployee e1, tblWorksOn w, tblEmployee e2
where e1.empSSN = w.empSSN and e1.supervisorSSN = e2.empSSN 
and e2.empName = 'Mai Duy An'
GROUP BY e1.empSSN, e1.empName

