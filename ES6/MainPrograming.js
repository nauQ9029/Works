//defined readline to input and output data
const readline = require("readline");
//C1
//const isPrime = require("./PrimeNumber");
//C2
const NumberFunction = require("./PrimeNumber");

const inputOutputData = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

inputOutputData.question("input number to check",number=>{
    if(NumberFunction.isPrime(number)){
        console.log(number+"is Prime Number");
        
    }else{
        console.log(number+"is not Prime Number");
        
    }
    inputOutputData.close;
})

