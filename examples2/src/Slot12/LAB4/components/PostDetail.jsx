import { useParams } from "react-router-dom";
import { Card, Typography } from "antd";

const { Title, Paragraph } = Typography;

export default function PostDetail({ user }) {
  const { postId } = useParams();
  const post = user.posts.find((p) => p.id === postId);

  if (!post) return <Paragraph>Post not found.</Paragraph>;

  return (
    <Card title={<Title level={4}>{post.title}</Title>}>
      <Paragraph>{post.content}</Paragraph>
    </Card>
  );
}
