// _______________ 9. Logical & if _______________
/*
    0
    ''
    null
    undefined
    NaN
    false
    - Trong toán tử &&, nếu giá trị THUỘC 1 trong 6 các kiểu giá trị falsy, thì sẽ lấy thẳng giá trị
    falsy gán vào biến, mà không màng đến các giá trị sau.
*/
var result1 = 'A' && 'B' && null && 'C';
if (result1) {
    console.log('Output cho toan tu logical va if: DUNG');
} else {
    console.log('SAI'); // -> SAI, null
}

/*  - Trong toán tử ||, nếu giá trị KHÔNG THUỘC 1 trong 6 các kiểu giá trị falsy, thì sẽ lấy thẳng
    giá trị Truthy gán vào biến.
*/
var result2 = 0 || '' || null || 'A' || NaN;
if (result2) {
    console.log('Output cho toan tu logical va if: DUNG'); // -> DUNG, A
} else {
    console.log('SAI');
}