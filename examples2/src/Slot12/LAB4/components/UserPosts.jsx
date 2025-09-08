import { Link, useParams } from "react-router-dom";
import { List, Typography } from "antd";

const { Title } = Typography;

export default function UserPosts({ user }) {
  const { id } = useParams();

  return (
    <div>
      <Title level={4}>{user.name}'s Posts</Title>
      <List
        bordered
        dataSource={user.posts}
        renderItem={(post) => (
          <List.Item>
            <Link to={`/users/${id}/posts/${post.id}`}>{post.title}</Link>
          </List.Item>
        )}
      />
    </div>
  );
}
