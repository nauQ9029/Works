const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

let items = [
  {
    id: 1,
    name: "Item 1",
    description: "Description of Item 1",
    price: 30,
    quantity: 10,
  },
  {
    id: 2,
    name: "Item 2",
    description: "Description of Item 2",
    price: 40,
    quantity: 15,
  },
  {
    id: 3,
    name: "Item 3",
    description: "Description of Item 3",
    price: 50,
    quantity: 20,
  },
  {
    id: 4,
    name: "Item 4",
    description: "Description of Item 4",
    price: 60,
    quantity: 25,
  },
];

// Lấy danh sách items (GET)
app.get("/api/items", (req, res) => {
  res.json(items);
});

// Lấy chi tiết một item (GET)
app.get("/api/items/:id", (req, res) => {
  const item = items.find((i) => i.id === parseInt(req.params.id));
  if (item) {
    res.json(item);
  } else {
    res.status(404).json({ message: "Item not found" });
  }
});

// Tạo mới item (POST)
app.post("/api/items", (req, res) => {
  const newItem = { id: items.length + 1, ...req.body };
  items.push(newItem);
  res.status(201).json(newItem);
});

// Tính tổng giá trị của tất cả items (POST)
app.post("/api/items/total", (req, res) => {
  const itemsWithTotal = items.map((item) => {
    const total = item.price * item.quantity;
    return { ...item, total };
  });
  res.json(itemsWithTotal);
});

// Tính tổng giá trị của một item (GET)
app.get("/api/items/:id/total", (req, res) => {
  const id = parseInt(req.params.id);
  const item = items.find((i) => i.id === id);

  if (item) {
    const total = item.price * item.quantity;
    res.json({ ...item, total });
  } else {
    res.status(404).json({ message: "Item not found" });
  }
});

// Cập nhật item (PUT)
app.put("/api/items/:id", (req, res) => {
  const itemIndex = items.findIndex((i) => i.id === parseInt(req.params.id));
  if (itemIndex !== -1) {
    items[itemIndex] = { id: parseInt(req.params.id), ...req.body };
    res.json(items[itemIndex]);
  } else {
    res.status(404).json({ message: "Item not found" });
  }
});

// Xóa item (DELETE)
app.delete("/api/items/:id", (req, res) => {
  const itemIndex = items.findIndex((i) => i.id === parseInt(req.params.id));
  if (itemIndex !== -1) {
    items.splice(itemIndex, 1);
    res.status(204).send();
  } else {
    res.status(404).json({ message: "Item not found" });
  }
});

const port = 3000;
app.listen(port, () => {
  console.log(`API server is running at http://localhost:${port}`);
});
