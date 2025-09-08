import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function UserDetail() {
  const { id } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3001/users/${id}`)
      .then((res) => res.json())
      .then((data) => setUser(data));
  }, [id]);

  if (!user)
    return (
      <div className="container">
        <p>Loading user details...</p>
      </div>
    );

  return (
    <div className="container">
      <h2 className="mb-3">🔎 User Details</h2>
      <div className="card p-3">
        <h4>{user.name}</h4>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
      </div>
    </div>
  );
}
