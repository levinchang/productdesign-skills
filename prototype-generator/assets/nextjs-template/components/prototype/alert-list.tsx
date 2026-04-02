"use client";

import { useMemo, useState } from "react";
import { AlertTriangle, CheckCircle2, Loader2, Search, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { type AlertRow, mockAlerts } from "@/lib/mock/alerts";

type ViewState = "default" | "loading" | "empty" | "error";

export function AlertList() {
  const [viewState, setViewState] = useState<ViewState>("default");
  const [keyword, setKeyword] = useState("");
  const [selected, setSelected] = useState<string[]>([]);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  const rows = useMemo(() => {
    if (viewState !== "default") {
      return [];
    }
    return mockAlerts.filter((r) => {
      if (!keyword.trim()) {
        return true;
      }
      return r.id.toLowerCase().includes(keyword.toLowerCase()) || r.device.toLowerCase().includes(keyword.toLowerCase());
    });
  }, [keyword, viewState]);

  const allSelected = rows.length > 0 && rows.every((r) => selected.includes(r.id));

  const toggleAll = () => {
    if (allSelected) {
      setSelected([]);
      return;
    }
    setSelected(rows.map((r) => r.id));
  };

  const toggleOne = (id: string) => {
    setSelected((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]));
  };

  const rowById = (id: string) => mockAlerts.find((r) => r.id === id);

  const deleteBlocked = confirmDeleteId ? rowById(confirmDeleteId)?.linkedTicket : false;

  return (
    <div className="space-y-4">
      <section className="rounded-xl border bg-white p-4 shadow-sm">
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative min-w-64 flex-1">
            <Search className="pointer-events-none absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <input
              className="h-9 w-full rounded-md border border-input bg-white pl-9 pr-3 text-sm"
              placeholder="按告警编号或设备名筛选"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
          </div>
          <Button variant="secondary" onClick={() => setKeyword("")}>重置</Button>
          <Button disabled={selected.length === 0}>批量确认</Button>
          <div className="ml-auto flex items-center gap-2 text-xs text-muted-foreground">
            <span>视图状态:</span>
            <Button size="sm" variant="ghost" onClick={() => setViewState("default")}>默认</Button>
            <Button size="sm" variant="ghost" onClick={() => setViewState("loading")}>加载中</Button>
            <Button size="sm" variant="ghost" onClick={() => setViewState("empty")}>空态</Button>
            <Button size="sm" variant="ghost" onClick={() => setViewState("error")}>失败态</Button>
          </div>
        </div>
      </section>

      <section className="rounded-xl border bg-white shadow-sm">
        {viewState === "loading" && (
          <div className="flex h-56 items-center justify-center text-sm text-muted-foreground">
            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> 正在加载告警列表...
          </div>
        )}

        {viewState === "empty" && (
          <div className="flex h-56 flex-col items-center justify-center text-sm text-muted-foreground">
            <AlertTriangle className="mb-2 h-5 w-5" /> 暂无符合条件的告警
          </div>
        )}

        {viewState === "error" && (
          <div className="flex h-56 flex-col items-center justify-center gap-2 text-sm text-destructive">
            <span>加载失败，请重试</span>
            <Button size="sm" onClick={() => setViewState("default")}>重试</Button>
          </div>
        )}

        {viewState === "default" && (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px] text-sm">
              <thead className="bg-muted/50 text-left text-muted-foreground">
                <tr>
                  <th className="sticky left-0 z-10 bg-muted/50 px-4 py-3">
                    <input type="checkbox" checked={allSelected} onChange={toggleAll} />
                  </th>
                  <th className="sticky left-10 z-10 bg-muted/50 px-4 py-3">告警编号</th>
                  <th className="sticky left-[180px] z-10 bg-muted/50 px-4 py-3">等级</th>
                  <th className="px-4 py-3">状态</th>
                  <th className="px-4 py-3">设备</th>
                  <th className="px-4 py-3">处理人</th>
                  <th className="px-4 py-3">发生时间（默认降序）</th>
                  <th className="px-4 py-3">操作</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row.id} className="border-t">
                    <td className="sticky left-0 z-10 bg-white px-4 py-3">
                      <input
                        type="checkbox"
                        checked={selected.includes(row.id)}
                        onChange={() => toggleOne(row.id)}
                      />
                    </td>
                    <td className="sticky left-10 z-10 bg-white px-4 py-3 font-medium">{row.id}</td>
                    <td className="sticky left-[180px] z-10 bg-white px-4 py-3">{row.level}</td>
                    <td className="px-4 py-3">{row.status}</td>
                    <td className="px-4 py-3">{row.device}</td>
                    <td className="px-4 py-3">{row.assignee}</td>
                    <td className="px-4 py-3">{row.createdAt}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <Button size="sm" variant="secondary">查看</Button>
                        <Button size="sm" variant="destructive" onClick={() => setConfirmDeleteId(row.id)}>
                          <Trash2 className="mr-1 h-3.5 w-3.5" /> 删除
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {confirmDeleteId && (
        <div className="fixed inset-0 z-30 flex items-center justify-center bg-black/35 p-4">
          <div className="w-full max-w-md rounded-xl border bg-white p-5 shadow-lg">
            <h3 className="text-base font-semibold">确认删除告警</h3>
            {deleteBlocked ? (
              <p className="mt-2 text-sm text-destructive">该告警已关联工单，无法删除。</p>
            ) : (
              <p className="mt-2 text-sm text-muted-foreground">确认删除后不可恢复，请谨慎操作。</p>
            )}
            <div className="mt-5 flex justify-end gap-2">
              <Button variant="secondary" onClick={() => setConfirmDeleteId(null)}>取消</Button>
              <Button
                variant={deleteBlocked ? "secondary" : "destructive"}
                disabled={Boolean(deleteBlocked)}
                onClick={() => {
                  setConfirmDeleteId(null);
                  if (!deleteBlocked) {
                    setSelected([]);
                  }
                }}
              >
                {deleteBlocked ? (
                  <>
                    <CheckCircle2 className="mr-1 h-4 w-4" /> 已阻断
                  </>
                ) : (
                  "确认删除"
                )}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
