import React, { useContext } from "react";
import UserContext from "../contexts/UserContext";
import { Card } from "react-bootstrap";

const Profile = () => {
  const { user } = useContext(UserContext);

  if (!user) return null;

  return (
    <Card className="p-3">
      <h4>User Profile</h4>
      <p>
        <strong>Name:</strong> {user.name}
      </p>
      <p>
        <strong>Email:</strong> {user.email}
      </p>
    </Card>
  );
};

export default Profile;
