import Typography from "@material-ui/core/Typography";
import { DataGrid, GridColDef } from "@material-ui/data-grid";
import LaunchIcon from "@material-ui/icons/Launch";
import React, { Fragment, useEffect } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./MyOrders.css";
import { RootState } from "../../redux/store";
import { clearErrors, myOrders } from "../../redux/actions/orderActions";
import MetaData from "../Layout/MetaData";
import Loader from "../Layout/Loader/Loader";

const MyOrders: React.FC = () => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { loading, error, orders }: any = useSelector(
    (state: RootState) => state.myOrders
  );
  const { user }: any = useSelector((state: RootState) => state.user);

  const columns: GridColDef[] = [
    { field: "id", headerName: "Order ID", minWidth: 300, flex: 1 },
    {
      field: "status",
      headerName: "Status",
      minWidth: 150,
      flex: 0.5,
      cellClassName: (params) => {
        return params.getValue(params.id, "status") === "Delivered"
          ? "greenColor"
          : "redColor";
      },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 150,
      flex: 0.3,
    },
    {
      field: "amount",
      headerName: "Amount",
      type: "number",
      minWidth: 270,
      flex: 0.5,
    },
    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Link to={`/order/${params.getValue(params.id, "id")}`}>
            <LaunchIcon />
          </Link>
        );
      },
    },
  ];

  const rows = orders?.map((item: any) => ({
    itemsQty: item.orderItems.length,
    id: item._id,
    status: item.orderStatus,
    amount: item.totalPrice,
  }));

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    dispatch(myOrders());
  }, [dispatch, alert, error]);

  return (
    <Fragment>
      <MetaData title={`${user?.name} - Orders`} />

      {loading ? (
        <Loader />
      ) : (
        <div className="myOrdersPage">
          <DataGrid
            rows={rows || []}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            className="myOrdersTable"
            autoHeight
          />

          <Typography id="myOrdersHeading">{user.name}'s Orders</Typography>
        </div>
      )}
    </Fragment>
  );
};

export default MyOrders;
