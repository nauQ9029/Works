import { useContext } from "react";
import { Link } from "react-router-dom";
import { List, Card, Typography } from "antd";
import { UserContext } from "../../../App";

const { Title } = Typography;

export default function UserList() {
  const users = useContext(UserContext);

  return (
    <div style={{ padding: "2rem" }}>
      <Title level={2}>User List</Title>
      <List
        grid={{ gutter: 16, column: 2 }}
        dataSource={users}
        renderItem={(user) => (
          <List.Item>
            <Card title={user.name}>
              <p>Email: {user.email}</p>
              <Link to={`/users/${user.id}`}>View Profile</Link>
            </Card>
          </List.Item>
        )}
      />
    </div>
  );
}
