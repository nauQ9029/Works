import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Card, Button, Statistic, Row, Col } from "antd";
import { clearAll } from "../features/expenses/expenseSlice";
import dayjs from "dayjs";
import isoWeek from "dayjs/plugin/isoWeek";

dayjs.extend(isoWeek);

const ExpenseSummary = () => {
  const dispatch = useDispatch();
  const expenses = useSelector((state) => state.expenses || []);

  const today = dayjs().format("YYYY-MM-DD");
  const thisWeek = dayjs().isoWeek();

  const dailyTotal = expenses
    .filter((e) => e.date === today)
    .reduce((sum, e) => sum + e.amount, 0);
  const weeklyTotal = expenses
    .filter((e) => dayjs(e.date).isoWeek() === thisWeek)
    .reduce((sum, e) => sum + e.amount, 0);

  return (
    <Card className="expense-card" title="Summary">
      <Row gutter={24}>
        <Col span={12}>
          <Statistic title="Today" value={dailyTotal} prefix="$" />
        </Col>
        <Col span={12}>
          <Statistic title="This Week" value={weeklyTotal} prefix="$" />
        </Col>
      </Row>
      <Button
        type="default"
        danger
        onClick={() => dispatch(clearAll())}
        style={{ marginTop: 16 }}
      >
        Clear All Expenses
      </Button>
    </Card>
  );
};

export default ExpenseSummary;
