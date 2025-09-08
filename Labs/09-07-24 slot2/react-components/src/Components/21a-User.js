import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { useParams } from "react-router-dom";

// Adding an `id` field to each user in the array
const users = [
    { id: 1, firstName: "John", lastName: "Done", age: 25 },
    { id: 2, firstName: "Mary", lastName: "Thompson", age: 35 },
    { id: 3, firstName: "John", lastName: "Smith", age: 30 },
    { id: 4, firstName: "Emily", lastName: "Johnson", age: 25 },
    { id: 5, firstName: "William", lastName: "Davis", age: 34 }
];

// Component to display the user list with clickable links
function UserList() {
    return (
        <div>
            <h1>User List</h1>
            <ul>
                {users.map((user) => (
                    <li key={user.id}>
                        <Link to={`/user/${user.id}`}>
                            {user.firstName} {user.lastName}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

// Component to display user details based on the ID from the URL
function UserDetails() {
    const { id } = useParams(); // Getting the 'id' parameter from the route
    const user = users.find((user) => user.id === parseInt(id)); // Finding the user by id

    if (!user) {
        return <h2>User not found</h2>; // Handling case where user is not found
    }

    return (
        <div>
            <h1>User Details</h1>
            <p>
                <strong>Name:</strong> {user.firstName} {user.lastName}
            </p>
            <p>
                <strong>Age:</strong> {user.age}
            </p>
        </div>
    );
}

// Main component to handle routing
function User() {
    return (
        <Router>
            <div>
                <Routes>
                    <Route path="/" element={<UserList />} />
                    <Route path="/user/:id" element={<UserDetails />} /> {/* Use id instead of firstName */}
                </Routes>
            </div>
        </Router>
    );
}

export default User;
