"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { supabase } from "@/app/lib/supabase";

export default function NewCandidatePage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [yomi, setYomi] = useState("");
  const [source, setSource] = useState("");
  const [agentName, setAgentName] = useState("");
  const [expectedMonth, setExpectedMonth] = useState("");
  const [status, setStatus] = useState("");
  const [firstInterviewDate, setFirstInterviewDate] = useState("");
  const [etDate, setEtDate] = useState("");
  const [interviewScheduledDate, setInterviewScheduledDate] = useState("");
  const [memo, setMemo] = useState("");

  const [saving, setSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrorMsg("");

    // 必須チェック
    if (!name || !yomi || !agentName || !status) {
      setErrorMsg("「名前」「ヨミ」「担当者名」「ステータス」は必須です。");
      return;
    }

    setSaving(true);

    const { error } = await supabase.from("candidates").insert({
      name,
      yomi,
      source: source || null,
      agent_name: agentName,
      expected_month: expectedMonth || null,
      status,
      first_interview_date: firstInterviewDate || null,
      et_date: etDate || null,
      interview_scheduled_date: interviewScheduledDate || null,
      memo: memo || null,
    });

    setSaving(false);

    if (error) {
      setErrorMsg("保存に失敗しました：" + error.message);
      return;
    }

    // 保存成功 → 一覧に戻る
    router.push("/");
    router.refresh();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ヘッダー */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <h1 className="text-xl font-bold text-gray-800">求職者管理アプリ</h1>
      </header>

      <main className="p-6 max-w-2xl mx-auto">
        {/* タイトルと戻るリンク */}
        <div className="mb-6">
          <Link href="/" className="text-sm text-blue-600 hover:underline">
            ← 一覧に戻る
          </Link>
          <h2 className="text-lg font-semibold text-gray-700 mt-2">
            求職者 新規登録
          </h2>
        </div>

        {/* フォーム */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <form className="space-y-5" onSubmit={handleSubmit}>

            {/* エラーメッセージ */}
            {errorMsg && (
              <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-lg">
                {errorMsg}
              </div>
            )}

            {/* 求職者の名前 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                求職者の名前 <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="例：山田 太郎"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* ヨミ */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                ヨミ <span className="text-red-500">*</span>
              </label>
              <select
                value={yomi}
                onChange={(e) => setYomi(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">選択してください</option>
                <option value="A">A（高）</option>
                <option value="B">B（中）</option>
                <option value="C">C（低）</option>
              </select>
            </div>

            {/* 流入経路 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                流入経路
              </label>
              <select
                value={source}
                onChange={(e) => setSource(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">選択してください</option>
                <option value="Indeed">Indeed</option>
                <option value="紹介">紹介</option>
                <option value="HP">HP</option>
                <option value="電話">電話</option>
                <option value="その他">その他</option>
              </select>
            </div>

            {/* 担当者名 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                担当者名 <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={agentName}
                onChange={(e) => setAgentName(e.target.value)}
                placeholder="例：鈴木 花子"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* 決定月 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                決定月
              </label>
              <input
                type="month"
                value={expectedMonth}
                onChange={(e) => setExpectedMonth(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* ステータス */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                ステータス <span className="text-red-500">*</span>
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">選択してください</option>
                <option value="新規登録">新規登録</option>
                <option value="初回面談済">初回面談済</option>
                <option value="求人紹介中">求人紹介中</option>
                <option value="企業面接中">企業面接中</option>
                <option value="内定">内定</option>
                <option value="入社決定">入社決定</option>
                <option value="辞退・離脱">辞退・離脱</option>
                <option value="保留">保留</option>
              </select>
            </div>

            {/* 日付項目：3カラム */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  初回面談日
                </label>
                <input
                  type="date"
                  value={firstInterviewDate}
                  onChange={(e) => setFirstInterviewDate(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  ET日
                </label>
                <input
                  type="date"
                  value={etDate}
                  onChange={(e) => setEtDate(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  面談設定日
                </label>
                <input
                  type="date"
                  value={interviewScheduledDate}
                  onChange={(e) => setInterviewScheduledDate(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* メモ欄 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                メモ欄
              </label>
              <textarea
                rows={4}
                value={memo}
                onChange={(e) => setMemo(e.target.value)}
                placeholder="業界志望・条件・注意事項などを自由に入力"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              />
            </div>

            {/* ボタン */}
            <div className="flex items-center gap-3 pt-2">
              <button
                type="submit"
                disabled={saving}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white text-sm font-medium px-6 py-2 rounded-lg transition-colors"
              >
                {saving ? "保存中..." : "登録する"}
              </button>
              <Link href="/" className="text-sm text-gray-500 hover:text-gray-700">
                キャンセル
              </Link>
            </div>

          </form>
        </div>
      </main>
    </div>
  );
}
