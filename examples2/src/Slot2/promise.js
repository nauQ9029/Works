// Promise
const myPromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    const randomNum = Math.random();
    if (randomNum < 0.5) {
      resolve(randomNum);
    } else {
      reject("Promise: Error! The number is greater than 0.5");
    }
  }, 2000);
});
// -> The 2s waiting time is occured no matter the promise is resolved or rejected

myPromise
  .then((result) => {
    console.log("Success! The number is: " + result);
  })
  .catch((error) => {
    console.error(error);
  });

// Chaining Promises
const anotherPromise = new Promise((resolve, reject) => {
  resolve("Chaining promise: Another promise resolved!");
});

anotherPromise
  .then((result) => {
    console.log(result);
    return "Chaining promises!";
  })
  .then((result) => {
    console.log(result);
  });

const isEven = (num) => {
  if (num % 2 == 0) {
    console.log("Even");
  } else {
    console.log("Odd");
  }
};

isEven(7);

