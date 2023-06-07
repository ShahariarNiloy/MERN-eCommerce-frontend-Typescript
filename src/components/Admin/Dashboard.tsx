import { Typography } from "@material-ui/core";
import React, { useEffect } from "react";
import { Doughnut, Line } from "react-chartjs-2";
import { Link } from "react-router-dom";
import { getAllOrders } from "../../redux/actions/orderActions";
import { getAdminProduct } from "../../redux/actions/productActions";
import { getAllUsers } from "../../redux/actions/userActions";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { RootState } from "../../redux/store";
import { OrderTypes } from "../../redux/types/orderTypes";
import { ProductTypes } from "../../redux/types/productTypes";
import { UserType } from "../../redux/types/userTypes";
import MetaData from "../Layout/MetaData";
import Sidebar from "./Sidebar";
import "./dashboard.css";

const Dashboard: React.FC = () => {
  const dispatch = useAppDispatch();

  const { products }: { products: ProductTypes[] } = useAppSelector(
    (state: RootState) => state.products
  );

  const { orders }: { orders: OrderTypes[] } = useAppSelector(
    (state: RootState) => state.allOrders
  );

  const { users }: { users: UserType[] } = useAppSelector(
    (state: RootState) => state.allUsers
  );

  let outOfStock = 0;

  products &&
    products?.forEach((item) => {
      if (item.stock === 0) {
        outOfStock += 1;
      }
    });

  useEffect(() => {
    dispatch(getAdminProduct());
  }, []);

  let totalAmount = 0;
  orders &&
    orders.forEach((item) => {
      totalAmount += item.totalPrice;
    });

  const lineState = {
    labels: ["Initial Amount", "Amount Earned"],
    datasets: [
      {
        label: "TOTAL AMOUNT",
        backgroundColor: ["tomato"],
        hoverBackgroundColor: ["rgb(197, 72, 49)"],
        data: [0, totalAmount],
      },
    ],
  };

  const doughnutState = {
    labels: ["Out of Stock", "InStock"],
    datasets: [
      {
        backgroundColor: ["#00A6B4", "#6800B4"],
        hoverBackgroundColor: ["#4B5000", "#35014F"],
        data: [outOfStock, products.length - outOfStock],
      },
    ],
  };

  return (
    <div className="dashboard">
      <MetaData title="Dashboard - Admin Panel" />
      <Sidebar />

      <div className="dashboardContainer">
        <Typography component="h1">Dashboard</Typography>

        <div className="dashboardSummary">
          <div>
            <p>
              Total Amount <br /> ₹{totalAmount}
            </p>
          </div>
          <div className="dashboardSummaryBox2">
            <Link to="/admin/products">
              <p>Product</p>
              <p>{products && products.length}</p>
            </Link>
            <Link to="/admin/orders">
              <p>Orders</p>
              <p>{orders && orders.length}</p>
            </Link>
            <Link to="/admin/users">
              <p>Users</p>
              <p>{users && users.length}</p>
            </Link>
          </div>
        </div>

        <div className="lineChart">
          <Line data={lineState} />
        </div>

        <div className="doughnutChart">
          <Doughnut data={doughnutState} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
