import React, { useState } from "react";
import {
  Form,
  Input,
  InputNumber,
  DatePicker,
  Select,
  Button,
  Card,
} from "antd";
import { useDispatch } from "react-redux";
import { addExpense } from "../features/expenses/expenseSlice";
import dayjs from "dayjs";

const { Option } = Select;

const AddExpenseForm = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const onFinish = (values) => {
    const payload = {
      ...values,
      date: values.date.format("YYYY-MM-DD"),
    };
    dispatch(addExpense(payload));
    form.resetFields();
  };

  return (
    <Card title="Add Expense" className="expense-card">
      <Form
        form={form}
        layout="inline"
        onFinish={onFinish}
        initialValues={{ date: dayjs() }}
      >
        <Form.Item
          name="name"
          rules={[{ required: true, message: "Name is required" }]}
        >
          <Input placeholder="Expense Name" />
        </Form.Item>

        <Form.Item name="amount" rules={[{ required: true }]}>
          <InputNumber placeholder="Amount" min={0} />
        </Form.Item>

        <Form.Item name="category">
          <Select placeholder="Category" style={{ width: 120 }}>
            <Option value="Food">Food</Option>
            <Option value="Entertainment">Entertainment</Option>
            <Option value="Shopping">Shopping</Option>
            <Option value="Bills">Bills</Option>
            <Option value="Others">Others</Option>
          </Select>
        </Form.Item>

        <Form.Item name="date">
          <DatePicker />
        </Form.Item>

        <Form.Item>
          <Button className="custom-green-btn" htmlType="submit">
            Add
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default AddExpenseForm;
