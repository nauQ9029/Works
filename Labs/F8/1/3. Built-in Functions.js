// _______________ 3 - Built-in function _______________
/*
    1/ alert
    2/ console
    3/ confirm
    4/ prompt
    5/ setTimeout
    6/ setInterval
*/
// ----- 1/ alert - Hiển thị ra ô thông báo notification -----
// alert('Bruh');

// ----- 2/ console - In ra thông tin -----
console.log(fullName);
console.error(age);
console.warn('Lỗi!');

// ----- 3/ confirm - Hiện bảng thông báo bao gồm lựa chọn Y - N -----
confirm('Xác nhận bạn đủ tuổi!');

// ----- 4/ prompt - Hiện bảng thông báo yêu cầu user input data -----
prompt('Xác nhận bạn đủ tuổi!');

// ----- 5/ setTimeout - Hàm truyền tham số vào và thực thi DUY NHẤT 1 MỘT LẦN sau x thời gian -----
setTimeout(function () {
    console.log('bruh')
}, 60000)

// ----- 6/ setInterval - Tương tự với setTimeout, tuy nhiên sẽ thực thi LIÊN TỤC sau x thời gian -----
setInterval(function () {
    console.log('nein')
}, 1200000)