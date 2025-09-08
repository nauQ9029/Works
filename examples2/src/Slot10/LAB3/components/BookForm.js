import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

export default function BookForm({ onSave, book }) {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
  });

  useEffect(() => {
    if (book) {
      setFormData(book);
    } else {
      setFormData({
        title: "",
        author: "",
      });
    }
  }, [book]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const bookData = {
      ...formData,
      id: book ? formData.id : uuidv4(), // a random unique id generator fucntion (version 4 Universally Unique Identifier)
    };
    onSave(bookData);
    setFormData({
      title: "",
      author: "",
    });
  };

  return (
    <div className="mt-4">
      <h4>{book ? "Edit Book" : "Add A New Book"}</h4>
      <form onSubmit={handleSubmit}>
        <div className="mb-2">
          <input
            className="form-control"
            type="text"
            placeholder="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-2">
          <input
            className="form-control"
            type="text"
            placeholder="author"
            name="author"
            value={formData.author}
            onChange={handleChange}
            required
          />
        </div>
        <button className="btn btn-success" type="submit">
          {book ? "Save Changes" : "Add A Book"}
        </button>
      </form>
    </div>
  );
}
