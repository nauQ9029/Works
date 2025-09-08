/*
// 1. Arrow function with multiple parameters
let greet = (name, timeOfDay) => {
  console.log(`Good ${timeOfDay}, ${name}!`);
};
greet('nauQ','evening')
greet('M','morning')

// 2. Arrow function with a single parameter
let square = num => {
  return num * num;
}
console.log(square(9));
console.log(square(11));

// 3. Arrow function without any parameters
let sayHello = () => {
  console.log("Goodbye World!");
};

sayHello();

// 4. Arrow functions within object literals
let person = {
  name: "nauQ",
  age: 20,
  greet: function() {
    console.log(`Hello, my name is ${this.name} and I am ${this.age} years old.`);
  }
};

person.greet();
*/

// let company = {
//   name: "Company One", 
//   category: "Finance", 
//   start: 1981, 
//   end: 2004,
//   display: function() {
//     console.log(`Name: ${this.name}, Category: ${this.category}, Start: ${this.start}, End: ${this.end}`);
//   } 
// };

// company.display();

// // 5. Callbacks - Single thread
// /* Wants the JavaScript functions are executed in the sequence they are called wait for the result of the 
//   previous function call before the next statement is executed
// -> use callback
// */
// function greet(name, myFunction) {
//   console.log('Goodbye, World!');

//   // callback function
//   // executed only after the greet() is executed
//   myFunction(name);
// }

// // callback function
// function sayName(name) {
//   console.log('Hello ' + name);
// }

// // calling the function after 2sec
// setTimeout(greet, 2000, 'nauQ', sayName);
// // -> First execute greet(): "Goodbye, World!", then sayName(): "Hello nauQ"

// // let square = (x, callback) => {
// //   if (x <= 0) {
// //     setTimeout(() =>
// //       callback(new Error("Square dimension cannot be smaller or equal than 0! \n S = " + x), null), 2000);
// //   } else {
// //     setTimeout(() =>
// //       callback(null, {
// //         perimeter: () => (4 * (x)),
// //         area: () => (x * x)
// //       }), 2000);
// //   }
// // }

// // // call callback

// // square(9, (error, solution) => {
// //   if (error) {
// //     console.log("Error: ", error);
// //   } else {
// //     console.log(solution.perimeter());
// //   }
// // });

// 7. Promise
// Creating a promise:
const myPromise = new Promise((resolve, reject) => {
  // Asynchronous operation
  // Resolve the promise when the operationis succesful
  // Reject the promise if there is an error
  setTimeout(() => {
    const randomNum = Math.random();
    if (randomNum < 0.5) {
      resolve(randomNum);
    } else {
      reject('Error: Random number is greater than 0.5');
    }
  }, 2000);
});

// Chaining promises
const anotherPromise = new Promise((resolve, reject) => {
  resolve('Another promise');
});

anotherPromise
  .then(result => {
    console.log(result);
    return 'Chained promised';
  })
  .then(result => {
    console.log(result);
  });

// Handling promises
myPromise
  .then(result => {
    console.log('Success: ', result);
  })
  .catch(error => {
    console.log('Error: ', error);
  });