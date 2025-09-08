import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Card, List, Typography, Button } from "antd";
import { deleteExpense } from "./expenseSlice";

const { Text } = Typography;

const ExpenseList = () => {
  const expenses = useSelector((state) => state.expenses);
  const dispatch = useDispatch();

  const grouped = expenses.reduce((acc, exp) => {
    const date = exp.date;
    if (!acc[date]) acc[date] = [];
    acc[date].push(exp);
    return acc;
  }, {});

  return (
    <>
      {Object.entries(grouped).map(([date, items]) => (
        <Card key={date} title={`Expenses on ${date}`} className="expense-card">
          <List
            itemLayout="horizontal"
            dataSource={items}
            renderItem={(item) => (
              <List.Item
                actions={[
                  <Button
                    size="small"
                    danger
                    onClick={() => dispatch(deleteExpense(item.id))}
                  >
                    Delete
                  </Button>,
                ]}
              >
                <List.Item.Meta
                  title={
                    <Text>
                      {item.name}{" "}
                      <Text type="secondary">({item.category})</Text>
                    </Text>
                  }
                  description={`Amount: $${item.amount}`}
                />
              </List.Item>
            )}
          />
        </Card>
      ))}
    </>
  );
};

export default ExpenseList;
