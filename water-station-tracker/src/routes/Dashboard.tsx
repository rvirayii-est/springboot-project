import Card from "../components/Card";
import { useStationStore } from "../store/stations";
import { format } from "date-fns";

export default function Dashboard() {
  const { stations, orders, deliveries } = useStationStore();

  const totalCapacity = stations.reduce((a, s) => a + s.capacityLiters, 0);
  const currentLevel = stations.reduce((a, s) => a + s.currentLevelLiters, 0);
  const utilization = Math.round((currentLevel / totalCapacity) * 100);

  const pendingOrders = orders.filter(o => o.status !== "delivered" && o.status !== "cancelled").length;
  //const upcomingDeliveries = deliveries.filter(d => d.status === "scheduled").length;

  return (
    <div className="grid grid-3">
      <Card title="Total Capacity">{totalCapacity.toLocaleString()} L</Card>
      <Card title="Current Level">{currentLevel.toLocaleString()} L <span className="badge">{utilization}% full</span></Card>
      <Card title="Open Orders">{pendingOrders}</Card>

      <div style={{ gridColumn: "1 / -1" }}>
        <Card title="Upcoming Deliveries">
          <div className="row" style={{ gap: 24, flexWrap: "wrap" }}>
            {deliveries.map(d => (
              <div key={d.id} className="panel" style={{ padding: 12, minWidth: 260 }}>
                <div style={{ fontWeight: 600 }}>{d.id}</div>
                <div className="badge" style={{ margin: "6px 0" }}>{d.status}</div>
                <div>Station: {stations.find(s => s.id === d.stationId)?.name}</div>
                <div>When: {format(new Date(d.scheduledAt), "PPpp")}</div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
