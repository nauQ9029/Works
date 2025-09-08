import TodoList from "./TodoList.js";
import TodoItem from "./TodoItem.js";
import readline from "readline";

// This module provides an interface for reading data from a readable stream
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Create a new TodoList instance
const todoList = new TodoList();

// Function to ask a question and return the answer as a promise
const askQuestion = (query) =>
  new Promise((resolve) => rl.question(query, resolve));

// Function to add a new item to the todo list
async function addNewItem() {
  // Prompts the user for a title and adds a new TodoItem to the list
  const title = await askQuestion("Enter the title of the new todo item: ");
  const item = new TodoItem(title); // Create a new TodoItem instance
  todoList.addItem(item); // Add the item to the todo list
  console.log("Added new item successfully.\n");
}

// Function to mark an item as completed
async function markItemCompleted() {
  // Prompts the user for an index and marks the corresponding item as completed
  const index = await askQuestion(
    "Enter the index of the item you wish to mark as completed: "
  );
  const indexInt = parseInt(index, 10) - 1; // Adjust index because user input starts from 1
  // Check if index is valid
  if (indexInt >= 0 && indexInt < todoList.items.length) {
    todoList.completeItem(indexInt); // Mark the item as completed
    console.log("Item marked as completed successfully.\n");
  } else {
    console.log("Invalid item index.\n");
  }
}

// Main function to run the todo list application
async function main() {
  let running = true; // Flag to control the main loop
  while (running) {
    console.log("1. Add a new todo item");
    console.log("2. Display all todo items with their status");
    console.log("3. Mark an item as completed");
    console.log("4. Exit");
    const choice = await askQuestion("Choose an action: ");

    switch (choice) {
      case "1":
        await addNewItem();
        break;
      case "2":
        todoList.displayItemsWithStatus();
        break;
      case "3":
        await markItemCompleted();
        break;
      case "4":
        running = false;
        console.log("Exiting...");
        break;
      default:
        console.log("Invalid choice, please try again.\n");
    }
  }
  rl.close(); // Close the readline interface
}

main().catch((err) => console.error(err)); // Handle any errors that occur during the execution of the main function
