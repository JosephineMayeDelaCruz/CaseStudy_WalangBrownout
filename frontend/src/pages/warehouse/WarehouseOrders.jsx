import React, { useEffect, useState } from "react";
import PageHeader from "../../components/layout/PageHeader.jsx";
import Table from "../../components/common/Table.jsx";
import StatusBadge from "../../components/common/StatusBadge.jsx";
import Loading from "../../components/common/Loading.jsx";
import ApiError from "../../components/common/ApiError.jsx";
import { api } from "../../services/api.js";
import { useToast } from "../../context/ToastContext.jsx";

export default function WarehouseOrders() {
  const notify = useToast();
  const [orders, setOrders] = useState(null);
  const [error, setError] = useState(null);

  const load = () => {
    setError(null);
    api.getPurchaseOrders().then(setOrders).catch((err) => setError(err.message));
  };

  useEffect(load, []);

  const handleReceive = async (code) => {
    try {
      await api.receivePurchaseOrder(code);
      notify(`Order ${code} marked as received.`, "success");
      load();
    } catch (err) {
      notify(err.message, "danger");
    }
  };

  if (error) return <ApiError message={error} onRetry={load} />;
  if (!orders) return <Loading />;

  const columns = [
    { key: "id",       label: "PO #",     className: "fw-semibold py-3" },
    { key: "supplier", label: "Supplier" },
    { key: "total",    label: "Total" },
    {
      key: "status",
      label: "Status",
      render: (row) => <StatusBadge status={row.status} />,
    },
    {
      key: "action",
      label: "",
      render: (row) =>
        row.status === "Approved" ? (
          <button
            className="btn-outline-tan px-3 py-1"
            style={{ fontSize: ".78rem" }}
            onClick={() => handleReceive(row.id)}
          >
            Mark received
          </button>
        ) : (
          <span className="text-muted" style={{ fontSize: ".8rem" }}>
            {row.status}
          </span>
        ),
    },
  ];

  return (
    <div className="content-area">
      <PageHeader title="Incoming orders" icon="bi-truck" />
      <Table columns={columns} rows={orders} emptyMessage="No purchase orders found." />
    </div>
  );
}
