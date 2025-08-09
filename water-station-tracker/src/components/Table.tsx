/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ReactNode } from "react";

export function Table<T>({ columns, rows, rowKey }: {
  columns: { key: keyof T | string; header: ReactNode; render?: (row: T) => ReactNode }[];
  rows: T[];
  rowKey: (row: T) => string;
}) {
  return (
    <div className="panel" style={{ overflow: "hidden" }}>
      <table>
        <thead>
          <tr>
            {columns.map((c, i) => <th key={i}>{c.header}</th>)}
          </tr>
        </thead>
        <tbody>
          {rows.map(r => (
            <tr key={rowKey(r)}>
              {columns.map((c, i) => (
                <td key={i}>{c.render ? c.render(r) : (r as any)[c.key]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
