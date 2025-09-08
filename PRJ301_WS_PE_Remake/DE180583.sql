use PRJ301_DE180583;

create table posts (
	PostId NVARCHAR(10) NOT NULL PRIMARY KEY,
    Title NVARCHAR(255) NOT NULL,
    Category NVARCHAR(50) NOT NULL
)

insert into posts (PostId, Title, Category)
values 
    ('C001', N'Breaking News: Market Hits All-Time High', N'Kinh tế'),
    ('C002', N'Tech Giants Announce New Partnership', N'Công nghệ');

SELECT * FROM Posts;