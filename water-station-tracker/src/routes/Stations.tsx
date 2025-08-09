import { Link } from "react-router-dom";
import { Table } from "../components/Table";
import { useStationStore } from "../store/stations";

export default function Stations() {
  const { stations, ordersByStation } = useStationStore();
  return (
    <div className="grid" style={{ gap: 16 }}>
      <Table
        rows={stations}
        rowKey={(s) => s.id}
        columns={[
          { key: "name", header: "Station", render: (s) => <Link to={`/stations/${s.id}`}>{s.name}</Link> },
          { key: "code", header: "Code" },
          { key: "location", header: "Location" },
          { key: "status", header: "Status", render: (s) => <span className="badge">{s.status}</span> },
          { key: "capacityLiters", header: "Capacity (L)", render: (s) => s.capacityLiters.toLocaleString() },
          { key: "currentLevelLiters", header: "Current (L)", render: (s) => s.currentLevelLiters.toLocaleString() },
          { key: "dailyProductionLiters", header: "Daily Prod (L)" },
          { key: "orders", header: "Open Orders", render: (s) => ordersByStation(s.id).filter(o => o.status !== "delivered" && o.status !== "cancelled").length },
        ]}
      />
    </div>
  );
}
