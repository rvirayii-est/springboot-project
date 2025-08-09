import { useParams, Link } from "react-router-dom";
import { useStationStore } from "../store/stations";
import Card from "../components/Card";
import { Table } from "../components/Table";
import { format } from "date-fns";

export default function StationDetail() {
  const { id } = useParams<{ id: string }>();
  const store = useStationStore();
  const station = id ? store.stationById(id) : undefined;

  if (!station) {
    return <div className="panel" style={{ padding: 16 }}>Station not found. <Link to="/stations">Back</Link></div>;
    }
  const orders = store.ordersByStation(station.id);
  const deliveries = store.deliveriesByStation(station.id);
  const inventory = store.inventoryByStation(station.id);

  const pct = Math.round((station.currentLevelLiters / station.capacityLiters) * 100);

  return (
    <div className="grid" style={{ gap: 16 }}>
      <Card title={station.name} right={<span className="badge">{station.status}</span>}>
        <div className="row" style={{ gap: 24, flexWrap: "wrap" }}>
          <div>Code: <b>{station.code}</b></div>
          <div>Location: <b>{station.location}</b></div>
          <div>Capacity: <b>{station.capacityLiters.toLocaleString()} L</b></div>
          <div>Current: <b>{station.currentLevelLiters.toLocaleString()} L</b> <span className="badge">{pct}%</span></div>
          <div>Daily Production: <b>{station.dailyProductionLiters.toLocaleString()} L</b></div>
          <div>Last QC: <b>{format(new Date(station.lastQualityCheck), "PPpp")}</b></div>
        </div>
      </Card>

      <Card title="Orders">
        <Table
          rows={orders}
          rowKey={o => o.id}
          columns={[
            { key: "id", header: "Order ID" },
            { key: "date", header: "Date", render: o => format(new Date(o.date), "PPpp") },
            { key: "itemsLiters", header: "Liters", render: o => o.itemsLiters.toLocaleString() },
            { key: "status", header: "Status", render: o => <span className="badge">{o.status}</span> },
          ]}
        />
      </Card>

      <Card title="Deliveries">
        <Table
          rows={deliveries}
          rowKey={d => d.id}
          columns={[
            { key: "id", header: "Delivery ID" },
            { key: "scheduledAt", header: "Scheduled", render: d => format(new Date(d.scheduledAt), "PPpp") },
            { key: "status", header: "Status", render: d => <span className="badge">{d.status}</span> },
          ]}
        />
      </Card>

      <Card title="Inventory">
        <Table
          rows={inventory}
          rowKey={i => i.id}
          columns={[
            { key: "name", header: "Item" },
            { key: "qty", header: "Qty" },
            { key: "unit", header: "Unit" },
            { key: "minQty", header: "Reorder @", render: i => (
              <span className="badge" style={{ background: i.qty <= i.minQty ? "#5a1321" : "#1d2a52" }}>
                {i.minQty}
              </span>
            ) },
          ]}
        />
      </Card>
    </div>
  );
}