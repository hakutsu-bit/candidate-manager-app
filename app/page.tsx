import Link from "next/link";
import { supabase } from "@/app/lib/supabase";
import type { Candidate } from "@/app/types/candidate";

type Yomi = "A" | "B" | "C";

const yomiBadge: Record<Yomi, string> = {
  A: "bg-red-100 text-red-700",
  B: "bg-yellow-100 text-yellow-700",
  C: "bg-gray-100 text-gray-600",
};

const statusBadge: Record<string, string> = {
  新規登録: "bg-blue-50 text-blue-600",
  初回面談済: "bg-indigo-50 text-indigo-600",
  求人紹介中: "bg-purple-50 text-purple-600",
  企業面接中: "bg-orange-50 text-orange-600",
  内定: "bg-green-100 text-green-700",
  入社決定: "bg-green-200 text-green-800",
  "辞退・離脱": "bg-red-50 text-red-500",
  保留: "bg-gray-100 text-gray-500",
};

export default async function Home() {
  const { data, error } = await supabase
    .from("candidates")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-red-500 text-sm">
          データの取得に失敗しました：{error.message}
        </p>
      </div>
    );
  }

  const candidates = (data ?? []) as Candidate[];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ヘッダー */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <h1 className="text-xl font-bold text-gray-800">求職者管理アプリ</h1>
      </header>

      <main className="p-6">
        {/* タイトルと新規登録ボタン */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-semibold text-gray-700">求職者一覧</h2>
            <p className="text-sm text-gray-400 mt-0.5">{candidates.length} 件</p>
          </div>
          <Link
            href="/candidates/new"
            className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
          >
            ＋ 新規登録
          </Link>
        </div>

        {/* データがない場合 */}
        {candidates.length === 0 ? (
          <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
            <p className="text-gray-400 text-sm">まだ求職者が登録されていません。</p>
            <Link
              href="/candidates/new"
              className="inline-block mt-4 text-blue-600 text-sm hover:underline"
            >
              ＋ 最初の求職者を登録する
            </Link>
          </div>
        ) : (
          /* テーブル */
          <div className="bg-white rounded-xl border border-gray-200 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50 text-gray-500 text-xs uppercase tracking-wide">
                  <th className="px-4 py-3 text-left font-medium">氏名</th>
                  <th className="px-4 py-3 text-left font-medium">ヨミ</th>
                  <th className="px-4 py-3 text-left font-medium">流入経路</th>
                  <th className="px-4 py-3 text-left font-medium">担当者</th>
                  <th className="px-4 py-3 text-left font-medium">決定月</th>
                  <th className="px-4 py-3 text-left font-medium">ステータス</th>
                  <th className="px-4 py-3 text-left font-medium">初回面談日</th>
                  <th className="px-4 py-3 text-left font-medium">ET日</th>
                  <th className="px-4 py-3 text-left font-medium">面談設定日</th>
                  <th className="px-4 py-3 text-left font-medium">メモ</th>
                </tr>
              </thead>
              <tbody>
                {candidates.map((c, i) => (
                  <tr
                    key={c.id}
                    className={`border-b border-gray-50 hover:bg-blue-50 transition-colors ${
                      i === candidates.length - 1 ? "border-b-0" : ""
                    }`}
                  >
                    <td className="px-4 py-3 font-medium text-gray-800 whitespace-nowrap">
                      {c.name}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-block px-2 py-0.5 rounded-full text-xs font-bold ${yomiBadge[c.yomi]}`}
                      >
                        {c.yomi}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-600 whitespace-nowrap">
                      {c.source ?? "—"}
                    </td>
                    <td className="px-4 py-3 text-gray-600 whitespace-nowrap">
                      {c.agent_name}
                    </td>
                    <td className="px-4 py-3 text-gray-600 whitespace-nowrap">
                      {c.expected_month ?? "—"}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${
                          statusBadge[c.status] ?? "bg-gray-100 text-gray-500"
                        }`}
                      >
                        {c.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-500 whitespace-nowrap">
                      {c.first_interview_date ?? "—"}
                    </td>
                    <td className="px-4 py-3 text-gray-500 whitespace-nowrap">
                      {c.et_date ?? "—"}
                    </td>
                    <td className="px-4 py-3 text-gray-500 whitespace-nowrap">
                      {c.interview_scheduled_date ?? "—"}
                    </td>
                    <td
                      className="px-4 py-3 text-gray-500 max-w-48 truncate"
                      title={c.memo ?? ""}
                    >
                      {c.memo ?? "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}
