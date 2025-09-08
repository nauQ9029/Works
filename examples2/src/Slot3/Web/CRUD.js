let fruits = ["Apple", "Banana", "Mango"];

// Add Orange to the end of the array (create - push)
fruits.push("Orange");
console.log("Add Orange to end:", fruits.toString());

// Add Pineapple to the beginning of the array (create - unshift)
fruits.unshift("Pineapple");
console.log("Add Pineapple to end:", fruits.toString());

// Insert Strawberry at index #2, 0 -> no delete is occurs (create - splice)
fruits.splice(2,  0, "Strawberry");
console.log("Inserts Strawberry at position 2", fruits.toString());

// Read
console.log("First item:", fruits[0]);
console.log("Last item:", fruits[fruits.length - 1]);

for (let i = 0; i < fruits.length; i++) {
    console.log(`Index ${i}: ${fruits[i]}`);
}

// Convert Mango to Peach (Update)
const mangoIndex = fruits.indexOf("Mango");
if (mangoIndex !== -1) {
    fruits[mangoIndex] = "Peach";
}
console.log("Convert Mango to Peach:", fruits.toString());

// Remove 1 item at index #1 (delete - splice)
fruits.splice(1, 1); // 1 -> update data at index #1, 1 -> delete 1
console.log("Removes 1 item at index 1:", fruits.toString());

// Remove Apple (delete - filter)
fruits = fruits.filter(fruit => fruit !== "Apple");
console.log("Remove Apple:", fruits.toString());
