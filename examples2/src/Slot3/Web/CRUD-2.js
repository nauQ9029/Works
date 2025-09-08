let fruits = [
  { id: 1, name: "Apple", color: "Red" },
  { id: 2, name: "Banana", color: "Yellow" },
  { id: 3, name: "Mango", color: "Orange" },
];

// Add Orange to the end of the array (create - push)
const newFruit = { id: 4, name: "Kiwi", color: "Green" };
fruits.push(newFruit);
// console.log("After create", newFruit, ":", fruits);
console.log(`After create {id: ${newFruit.id}, name: ${newFruit.name}, color: ${newFruit.color}}:`, fruits);

// Read all fruits
console.log("Read all fruits:");
fruits.map((fruit) => {
  console.log(`Name: ${fruit.name}, Color: ${fruit.color}`);
});
fruits.forEach(fruit => console.log(fruit));

// Update item's color with id = 2
let fruitToUpdate = 2;
fruits = fruits.map((fruit) => {
  if (fruit.id === fruitToUpdate) {
    return { ...fruit, color: "Greenish Yellow" };
  }
  return fruit;
});
console.log(`Update color of the fruit with id = ${fruitToUpdate}:`, fruits);

// Remove item with id = 1
let fruitToRemove = 1;
fruits = fruits.filter(fruit => fruit.id !== fruitToRemove);
console.log("Remove the fruit with id = 1:", fruits);

// Search fruit named Mango
const searchName = "Mango";
const searchResult = fruits.find(fruit => fruit.name === searchName);
if (searchResult) {
  console.log(`Found fruit named ${searchName}:`, searchResult);
}