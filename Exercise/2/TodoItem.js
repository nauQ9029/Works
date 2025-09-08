class TodoItem {
  constructor(title) {
    this.title = title;     // Title of the todo item
    this.completed = false; // Default to false
  }

  complete() {
    this.completed = true;  // Mark the item as completed
  }
}

export default TodoItem;
