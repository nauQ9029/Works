import { useEffect, useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line,
} from "recharts";

export default function VendorDashboard() {
  const [stats, setStats] = useState({
    totalRevenue: 0,
    totalOrders: 0,
    totalUsers: 0,
    chartData: [],
    orderData: [],
    growthRate: 0,
  });

  useEffect(() => {
    const fakeData = {
      totalRevenue: 95200000,
      totalOrders: 430,
      totalUsers: 120,
      growthRate: 12.5,
      chartData: [
        { month: "Jan", revenue: 8000000 },
        { month: "Feb", revenue: 10500000 },
        { month: "Mar", revenue: 13000000 },
        { month: "Apr", revenue: 9000000 },
        { month: "May", revenue: 11500000 },
        { month: "Jun", revenue: 11000000 },
        { month: "Jul", revenue: 12200000 },
      ],
      orderData: [
        { month: "Jan", orders: 40 },
        { month: "Feb", orders: 60 },
        { month: "Mar", orders: 70 },
        { month: "Apr", orders: 55 },
        { month: "May", orders: 65 },
        { month: "Jun", orders: 68 },
        { month: "Jul", orders: 72 },
      ],
    };

    setTimeout(() => {
      setStats(fakeData);
    }, 500);
  }, []);

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">📊 Vendor Dashboard</h2>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="icon">💰</div>
          <div className="label">Tổng doanh thu</div>
          <div className="value">{stats.totalRevenue.toLocaleString()} VND</div>
        </div>

        <div className="stat-card">
          <div className="icon">🧾</div>
          <div className="label">Tổng đơn hàng</div>
          <div className="value">{stats.totalOrders}</div>
        </div>

        <div className="stat-card">
          <div className="icon">👤</div>
          <div className="label">Người dùng</div>
          <div className="value">{stats.totalUsers}</div>
        </div>

        <div className="stat-card">
          <div className="icon">📈</div>
          <div className="label">Tăng trưởng</div>
          <div className="value">{stats.growthRate}%</div>
        </div>
      </div>

      <div className="charts-container">
        <div className="chart-card">
          <p className="chart-title">💵 Doanh thu theo tháng</p>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={stats.chartData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="revenue" fill="#rgb(244, 63, 94)" radius={[5, 5, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card">
          <p className="chart-title">📦 Đơn hàng theo tháng</p>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={stats.orderData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="orders" stroke="#198754" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
