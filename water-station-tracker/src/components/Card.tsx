import type { ReactNode } from "react";

export default function Card({ title, right, children }: { title: string; right?: ReactNode; children?: ReactNode }) {
  return (
    <div className="panel" style={{ padding: 16 }}>
      <div className="row" style={{ justifyContent: "space-between", marginBottom: 8 }}>
        <div style={{ fontWeight: 700 }}>{title}</div>
        {right}
      </div>
      <div>{children}</div>
    </div>
  );
}
