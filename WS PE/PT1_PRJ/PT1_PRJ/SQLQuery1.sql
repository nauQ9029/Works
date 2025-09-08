create database PRJ301_YourID
use PRJ301_YourID

create table DE180596 (
	postID nvarchar(4) primary key,
	title nvarchar(70),
	category nvarchar(40)
)

insert into DE180596 (postID, title, category)
values(N'C001', N'Breaking News: Market Hits All-Time High', N'Kinh tế')
insert into DE180596 (postID, title, category)
values(N'C002', N'Tech Giants Announce New Partnership', N'Công nghệ')

select * from DE180596