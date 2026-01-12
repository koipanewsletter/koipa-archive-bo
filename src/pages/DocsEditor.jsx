import { useMemo, useState } from "react";
import MarkdownEditor from "../components/MarkdownEditor";
import { saveDoc } from "../lib/docsApi";

export default function DocsEditor() {
  const [id, setId] = useState(null);
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("# 제목\n\n## 섹션\n내용");
  const [msg, setMsg] = useState("");

  const canSave = useMemo(() => title && slug && content, [title, slug, content]);

  async function onSave(status) {
    try {
      setMsg("저장 중...");
      const res = await saveDoc({ id, title, slug, summary, content, status });
      if (!id && res?.id) setId(res.id);
      setMsg(status === "published" ? "발행 완료 ✅" : "저장 완료 ✅");
    } catch (e) {
      setMsg(`에러: ${e.message || e.toString()}`);
    }
  }

  return (
    <div style={{ padding: 24, maxWidth: 1100, margin: "0 auto" }}>
      <h2>문서 편집</h2>

      <div style={{ display: "grid", gap: 10, marginBottom: 12 }}>
        <input placeholder="제목" value={title} onChange={(e) => setTitle(e.target.value)} />
        <input placeholder="slug (예: ip-news-2026-01)" value={slug} onChange={(e) => setSlug(e.target.value)} />
        <input placeholder="요약(선택)" value={summary} onChange={(e) => setSummary(e.target.value)} />
      </div>

      <div data-color-mode="light" style={{ marginBottom: 12 }}>
        <MarkdownEditor value={content} onChange={setContent} />
      </div>

      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
        <button disabled={!canSave} onClick={() => onSave("draft")}>저장(드래프트)</button>
        <button disabled={!canSave} onClick={() => onSave("published")}>발행</button>
        <span style={{ opacity: 0.8 }}>{msg}</span>
      </div>
    </div>
  );
}
