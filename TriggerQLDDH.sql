use QLDDH
-- Viết trigger tự động cập nhật số lượng còn trong kho khi có khách đặt hàng

create trigger trg_Ins_chitietDH on CHITIETDATHANG
after insert
as
begin
	if (exists (select i.mahh from HANGHOA h inner join inserted i on h.MAHH = i.MAHH
	where sldat > slcon or slcon = 0))
		begin
			raiserror(N'Số lượng không đảm bảo để thực hiện giao dịch', 10, 1);
			rollback transaction
		end
		
	update HANGHOA
	set SLCON = SLCON - (select SLDAT from inserted i inner join HANGHOA h on i.MAHH = h.MAHH)
	from HANGHOA inner join inserted on HANGHOA.MAHH = inserted.MAHH
end

select * from HANGHOA
select * from CHITIETDATHANG

insert into CHITIETDATHANG
values('DH03', 'LN', 2)

-- Viết trigger tự động cập nahạt SL còn khi có kahsch hàng hủy đơn hàng (xóa trong bảng CHITIETDATHANG)
create trigger trg_Ins_huyDH on CHITIETDONHANG
after insert
as
begin
	
end