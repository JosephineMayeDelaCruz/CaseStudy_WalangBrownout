import React, { useEffect, useState } from "react";
import PageHeader from "../../components/layout/PageHeader.jsx";
import Table from "../../components/common/Table.jsx";
import StatusBadge from "../../components/common/StatusBadge.jsx";
import Loading from "../../components/common/Loading.jsx";
import ApiError from "../../components/common/ApiError.jsx";
import { api } from "../../services/api.js";
import { useToast } from "../../context/ToastContext.jsx";

export default function Receiving() {
  const notify = useToast();
  const [batches, setBatches] = useState(null);
  const [error, setError] = useState(null);

  const load = () => {
    setError(null);
    api.getBatches().then(setBatches).catch((err) => setError(err.message));
  };

  useEffect(load, []);

  const handleReceive = async (batch) => {
    try {
      await api.addStockMovement({
        batch_id: batch.id,
        product_label: batch.product,
        type: "receive",
        qty: batch.qty,
        status: "completed",
        reference: batch.code,
      });
      notify(`Received batch ${batch.code}.`, "success");
      load();
    } catch (err) {
      notify(err.message, "danger");
    }
  };

  if (error) return <ApiError message={error} onRetry={load} />;
  if (!batches) return <Loading />;

  const columns = [
    { key: "code",        label: "Batch",    className: "fw-semibold py-3" },
    { key: "product",     label: "Product" },
    { key: "qty",         label: "Qty" },
    { key: "expiry_date", label: "Expiry" },
    {
      key: "status",
      label: "Status",
      render: (row) => <StatusBadge status={row.status ?? "active"} />,
    },
    {
      key: "action",
      label: "",
      render: (row) => (
        <button
          className="btn-outline-tan px-3 py-1"
          style={{ fontSize: ".78rem" }}
          onClick={() => handleReceive(row)}
        >
          Receive
        </button>
      ),
    },
  ];

  return (
    <div className="content-area">
      <PageHeader title="Receiving" icon="bi-box-arrow-in-down" />
      <Table columns={columns} rows={batches} emptyMessage="No batches found." />
    </div>
  );
}
