import { useContext, useState } from "react";
import axios from "axios";
import BookList from "./BookList";
import BookForm from "./BookForm";
import { BookContext } from "../context/BookContext";

export default function BookPage() {
  const { books, dispatch } = useContext(BookContext);
  const [editingBook, setEditingBook] = useState(null);

  const addBook = (book) => {
    book.status = "Unread";
    axios
      .post("http://localhost:3001/books", book)
      .then((res) => dispatch({ type: "ADD", payload: res.data }));
  };

  const updateBook = (book) => {
    axios
      .put(`http://localhost:3001/books/${book.id}`, book)
      .then((res) => dispatch({ type: "UPDATE", payload: res.data }));
  };

  const deleteBook = (id) => {
    if (window.confirm("Are you sure?")) {
      axios
        .delete(`http://localhost:3001/books/${id}`)
        .then(() => dispatch({ type: "DELETE", payload: id }));
    }
  };

  const toggleStatus = (book) => {
    const updated = {
      ...book,
      status: book.status === "Read" ? "Unread" : "Read",
    };
    axios
      .put(`http://localhost:3001/books/${book.id}`, updated)
      .then((res) => dispatch({ type: "UPDATE", payload: res.data }));
  };

  return (
    <div className="container">
      <h2>Book List</h2>
      <BookForm
        onSave={editingBook ? updateBook : addBook}
        book={editingBook}
      />
      <BookList
        books={books}
        onEdit={setEditingBook}
        onDelete={deleteBook}
        onToggleStatus={toggleStatus}
      />
    </div>
  );
}
