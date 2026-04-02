export type AlertRow = {
  id: string;
  level: "P1" | "P2" | "P3";
  status: "Open" | "Processing" | "Closed";
  device: string;
  assignee: string;
  createdAt: string;
  linkedTicket: boolean;
};

export const mockAlerts: AlertRow[] = [
  {
    id: "ALM-1001",
    level: "P1",
    status: "Open",
    device: "Compressor-A01",
    assignee: "Zhang San",
    createdAt: "2026-04-02 09:14",
    linkedTicket: true
  },
  {
    id: "ALM-1002",
    level: "P2",
    status: "Processing",
    device: "Conveyor-B11",
    assignee: "Li Si",
    createdAt: "2026-04-02 10:02",
    linkedTicket: false
  },
  {
    id: "ALM-1003",
    level: "P3",
    status: "Closed",
    device: "Sensor-C03",
    assignee: "Wang Wu",
    createdAt: "2026-04-01 17:26",
    linkedTicket: false
  }
];
