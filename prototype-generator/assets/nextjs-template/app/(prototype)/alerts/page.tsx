import { AlertList } from "@/components/prototype/alert-list";

export default function AlertsPrototypePage() {
  return (
    <main className="mx-auto min-h-screen w-full max-w-7xl p-6">
      <header className="mb-4 rounded-xl border bg-white p-4 shadow-sm">
        <h1 className="text-xl font-semibold">告警列表原型（WB-MON-1.1）</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          覆盖筛选、列表、批量确认、删除限制与二次确认弹窗。
        </p>
      </header>
      <AlertList />
    </main>
  );
}
