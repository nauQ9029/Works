// _______________ 7. Các kiểu dữ liệu trong JS _______________
/*
I/ Dữ liệu nguyên thủy - Primitive data
    - number
    - String
    - Boolean
    - Undefined
    - null
    - Symbol
II/ Dữ liệu phức tạp - Complex data
    - function
    - object
*/

// number
var f = 20;
// String
var abc = 'Quan \'Pham';
console.log('String type: ', abc);
// Boolean

// Undefined
var agee;
console.log('Undefined type: ', agee);

// Null
var isNull = null;
console.log('Null type: ', isNull);

// Symbol
var id = Symbol('id'); // unique
var id2 = Symbol('id'); //unique

console.log('Output Symbol id == id2: ', id == id2); // -> false, vi mac du co cung data, nhung id va id2 khac nhau (unique)

// Function
// Function tu dinh nghia
var myFunction = function () {
    console.log('Goodbye World!');
}
// Function duoc xay dung san (alert, console, confirm, etc)

// Objec types:
var myObject = {
    name: 'Quan Le',
    age: '20',
    height: '180',
    myFunction: function () {

    }
};
console.log('Output cho kieu Object: ', myObject);

var myArray = [
    'C++',
    'Java',
    'CSS',
    'JS'
];
console.log('Output cho kieu Array: ', myArray);

// Cach kiem tra kieu du lieu
console.log('Output cho kieu du lieu Array: ', typeof myArray) // -> object
console.log('Output cho kieu du lieu undefined: ', typeof agee) // -> undefined
console.log('Output cho kieu du lieu null: ', typeof isNull)   // -> object/undefined (SPECIAL)