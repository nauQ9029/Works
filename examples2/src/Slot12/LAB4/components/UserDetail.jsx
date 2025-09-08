import React from "react";
import { useParams, Link, Routes, Route, useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { UserContext } from "../../../App";
import { Card, Typography, Button } from "antd";

const { Title, Paragraph } = Typography;

const UserPosts = React.lazy(() => import("./UserPosts"));
const PostDetail = React.lazy(() => import("./PostDetail"));

export default function UserDetail() {
  const { id } = useParams();
  const users = useContext(UserContext);
  const navigate = useNavigate();

  const user = users.find((u) => u.id === id);

  useEffect(() => {
    if (!user) {
      setTimeout(() => navigate("/404"), 2000);
    }
  }, [user, navigate]);

  if (!user) return <Paragraph>Loading user... Redirecting...</Paragraph>;

  return (
    <div style={{ padding: "2rem" }}>
      <Card>
        <Title level={3}>{user.name}</Title>
        <Paragraph>Email: {user.email}</Paragraph>
        <Link to={`/users/${user.id}/posts`}>
          <Button type="primary">View Posts</Button>
        </Link>
      </Card>

      <div style={{ marginTop: "2rem" }}>
        <Routes>
          <Route path="posts" element={<UserPosts user={user} />} />
          <Route path="posts/:postId" element={<PostDetail user={user} />} />
        </Routes>
      </div>
    </div>
  );
}
