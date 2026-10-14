import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PageHeader from "../../components/layout/PageHeader.jsx";
import StatCard from "../../components/dashboard/StatCard.jsx";
import Loading from "../../components/common/Loading.jsx";
import ApiError from "../../components/common/ApiError.jsx";
import { api } from "../../services/api.js";

export default function WarehouseDashboard() {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const load = () => {
    setError(null);
    api
      .getWarehouseDashboard()
      .then(setData)
      .catch((err) => setError(err.message));
  };

  useEffect(load, []);

  if (error) return <ApiError message={error} onRetry={load} />;
  if (!data) return <Loading />;

  return (
    <div className="content-area">
      <PageHeader title="Dashboard" icon="bi-grid" />

      <div className="row g-3 mb-4">
        <div className="col-4">
          <StatCard label="Low stock" value={data.lowStock ?? 0} />
        </div>
        <div className="col-4">
          <StatCard label="Expiring (30d)" value={data.expiring30 ?? 0} />
        </div>
        <div className="col-4">
          <StatCard label="Flagged (7d)" value={data.flagged ?? 0} />
        </div>
      </div>

      <div className="row g-3">
        <div className="col-6">
          <button
            className="btn-tan w-100 py-3 fw-bold"
            style={{ fontSize: "1.05rem" }}
            onClick={() => navigate("/warehouse/receiving")}
          >
            <i className="bi bi-box-arrow-in-down me-2" aria-hidden="true" />
            Receiving
          </button>
        </div>
        <div className="col-6">
          <button
            className="btn-outline-tan w-100 py-3 fw-bold"
            style={{ fontSize: "1.05rem" }}
            onClick={() => navigate("/warehouse/movements")}
          >
            <i className="bi bi-arrow-left-right me-2" aria-hidden="true" />
            Movement Log
          </button>
        </div>
        <div className="col-6">
          <button
            className="btn-outline-tan w-100 py-3 fw-bold"
            style={{ fontSize: "1.05rem" }}
            onClick={() => navigate("/warehouse/orders")}
          >
            <i className="bi bi-truck me-2" aria-hidden="true" />
            Incoming Orders
          </button>
        </div>
        <div className="col-6">
          <button
            className="btn-outline-tan w-100 py-3 fw-bold"
            style={{ fontSize: "1.05rem" }}
            onClick={() => navigate("/picking")}
          >
            <i className="bi bi-clipboard-check me-2" aria-hidden="true" />
            Picking
          </button>
        </div>
      </div>
    </div>
  );
}
