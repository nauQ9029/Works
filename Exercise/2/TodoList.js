class TodoList {
  // Constructor initializes the todo list
  constructor() {
    this.items = [];
  }

  // Method to add a new item to the list
  addItem(item) {
    this.items.push(item);
  }

  // Method to get all item titles
  getItemTitles() {
    return this.items.map((item) => item.title);
  }

  // Method to display all items with their completion status
  displayItemsWithStatus() {
    this.items.forEach((item, index) => {
      // Loop through each item
      // Display the index, completion status, and title
      console.log(
        `${index + 1}. [${item.completed ? "X" : " "}] ${item.title}`
      );
    });
  }

  // Method to mark an item as completed
  completeItem(index) {
    if (index >= 0 && index < this.items.length) {
      // Check if index is valid
      // Takes the index of the item to be marked
      this.items[index].complete();
    }
  }
}

export default TodoList;
