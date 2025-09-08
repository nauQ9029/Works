import React from "react";

export default function BookList({ books, onEdit, onDelete, onToggleStatus }) {
  return (
    <div className="mt-4">
      <h4>Books List</h4>
      <table className="table table-bordered table-hover">
        <thead className="table-dark">
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Action</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {books.length > 0 ? (
            books.map((book) => (
              <tr key={book.id}>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>
                  <button
                    className="btn btn-sm btn-primary me-2"
                    onClick={() => onToggleStatus(book)}
                  >
                    {book.status === "Read" ? "Mark As Unread" : "Mark As Read"}
                  </button>
                  <button
                    className="btn btn-sm btn-warning me-2"
                    onClick={() => onEdit(book)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => onDelete(book.id)}
                  >
                    Delete
                  </button>
                </td>
                <td>{book.status}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center">
                No book found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
