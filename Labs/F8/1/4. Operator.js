// _______________ 4. Toán tử _______________
/* Các loại toán tử:
    1/ Số học - Arithmetic
    2/ Gán - Assignment
    3/ So sánh - Comparison
    4/ Logic - Logical
    5/ ++ & --
    6/ Prefix & Postfix
    7/ Chuỗi - String operator
*/
// ----- 1/ -----
var a = 1 + 2;
console.log('Output toan tu so hoc:', a);

// ----- 2/ -----
var firstName = "Minh Quan";

// ----- 3/ 4/ -----
// Loại toán tử so sánh này chỉ so sánh VALUE của data
var b = 1;
if (b > a && a > 0 && b > 0) {
    console.log('Output toan tu so sanh & logic: Chuan')
} else {
    console.log('Output toan tu so sanh & logic: Incorrect')
}


// ----- 5/ & 6/ -----
/*
Toán tử ++/--: 
- Khi dùng là hậu tố (prefix) sẽ tăng/giảm giá trị của biến lên 1 và trả về giá trị TRƯỚC KHI tăng/giảm.
TH1: Prefix (tính trước trả sau)
*/
var c = 3;
var output1 = ++c;
console.log('c:', c);
console.log('Output toan tu prefix voi output1 = ++c; (c = 3): ', output1);
/*
    Step 1: cộng 1 cho c (3 + 1 = 4)
    Step 2: gán c cho output1 = 4
    Step 3: return output1 = 4
*/
/*
- Khi dùng là tiền tố (postfix) sẽ tăng/giảm giá trị của biến lên 1 và trả về giá trị SAU KHI tăng/giảm.
TH2: Postfix (tính sau trả trước)
*/
var d = 5
var output2 = d++;
console.log('d:', d);
console.log('Output toan tu postfix voi output2 = d++; (d = 5): ', output2);
/*
    Step 1: gán d cho output2 = 5
    Step 2: cộng 1 cho d (5 + 1 = 6)
    Step 3: return output2 = 5
*/
// TH3:
var e = 2
var output3 = e++ + --e;
console.log('Output voi e = 2 cho e++ + --e = ', output3);

/*
    output3 trả về 2 (e++ = 2 + 1 = 3)
    output3 trả về 2 (--e = 3 - 1 = 2)
    -> output3 = 4
*/

// ----- Chuỗi -----
var firstName = 'Quan';
firstName += ' Pham';
console.log('Output toan tu chuoi: ', firstName);