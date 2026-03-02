import "./AdminDashboard.scss";
import {
  UserOutlined,
  ShoppingCartOutlined,
  BankOutlined,
  GiftOutlined
} from "@ant-design/icons";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

import { Column } from "@ant-design/charts";
import { useEffect, useState } from "react";
import { dashboard } from "../../../services/Admin/AdminDashboard";
import { toastError } from "../../../utils/AlertFromSweetalert2";

function AdminDashboard() {

  const [data, setData] = useState([]);
  const columnConfig = {
    data,
    xField: "month",
    yField: "value",
    height: 300,
    color: "#a70000",
    columnStyle: {
      radius: [8, 8, 0, 0],
    },
    label: {
      position: "top",
    },
  };

  const [evenue, setEvenue] = useState([]);
  const [totalsOrder, setTotalsOrder] = useState([])
  const [totalVouchers, setTotalVouchers] = useState([])
  const [totalUsers, setTotalUsers] = useState([])
  useEffect(() => {
    const fetchApi = async () => {
        const res = await dashboard();
        if(res.ok){
            setEvenue(res.result.totalEvenue)
            setTotalsOrder(res.result.totalsOrder)
            setTotalUsers(res.result.totalUsers)
            setTotalVouchers(res.result.totalVouchers)
            setData(res.result.data)
        } else {
            toastError(res.result.message)
        }
    }
    fetchApi();
  }, [])

console.log(data)
  return (
    <div className="dashboard">
      <div className="dashboard__stats">
        <div className="card">
          <div className="card__top">
            <UserOutlined />
            <p>+12%</p>
          </div>
          <div className="card__bot">
            <p>Tổng người dùng</p>
            <p>{totalUsers}</p>
          </div>
        </div>

        <div className="card">
          <div className="card__top">
            <ShoppingCartOutlined />
            <p>+12%</p>
          </div>
          <div className="card__bot">
            <p>Tổng đơn hàng</p>
            <p>{totalsOrder}</p>
          </div>
        </div>

        <div className="card">
          <div className="card__top">
            <BankOutlined />
            <p>+12%</p>
          </div>
          <div className="card__bot">
            <p>Doanh thu</p>
            <p>{evenue.toLocaleString("vi-VN")}đ</p>
          </div>
        </div>

        <div className="card">
          <div className="card__top">
            <GiftOutlined />
          </div>
          <div className="card__bot">
            <p>Mã giảm giá</p>
            <p>{totalVouchers}</p>
          </div>
        </div>
      </div>

      <div className="dashboard__charts">

        {/* Line chart lớn */}
        <div className="card chart-large">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#a70000"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Column chart nhỏ */}
        <div className="card chart-small">
          <Column {...columnConfig} />
        </div>

        <div>Sơ đồ theo</div>

      </div>

      <div className="dashboard__table">
        <div className="card">Recent Orders</div>
      </div>

    </div>
  );
}

export default AdminDashboard;