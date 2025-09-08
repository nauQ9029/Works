// Function parameters - Tham số hàm

/* I/ Parameter:
    - Define: là một giá trị có thể truyền vào khi gọi đến 1 function
    - Không giới hạn kiểu dữ liệu (num, String, array, etc).
    - Private: chỉ sử dụng được biên trong một function.
   II/ Truyền tham số
    - 1 tham số
    - Nhiều tham số
   III/ Arguments - Đối số
    - Arguments  object
    - For - of
*/
function writeLog(msg1, msg2) {
    console.log(msg1)
    if (msg2) {
        console.log(msg2)            // Chỉ sử dụng được console.log trong writeLog(msg)
    }
}
writeLog('GoodBye, World!');    // OUTPUT: 'Goodbye, World!', undefined -> do chỉ có 1 tham số
writeLog('nauQ', 'M');          // OUTPUT: 'nauQ', 'M'

function writeLog2() {
    console.log(arguments)
}
writeLog2('Log 1', 'Log 2', 'Log 3');
/* OUTPUT:
Arguments(3) ['Log 1', 'Log 2', 'Log 3', callee: ƒ, Symbol(Symbol.iterator): ƒ]
0: "Log 1"
1: "Log 2"
2: "Log 3"
*/

function writeLog3() {
    var myString =  '';
    for (var param of  arguments) {
        myString += `${param} - `
    }
    console.log(myString)
}
writeLog3('Log 1', 'Log 2', 'Log 3', 'Log 4', 'Log 5', 'Log 6');