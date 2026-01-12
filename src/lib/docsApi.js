import { supabase } from "../supabaseClient";
import { buildTocFromMarkdown } from "../utils/toc";

export async function saveDoc({ id, title, slug, summary, content, status }) {
  const toc = buildTocFromMarkdown(content);

  const payload = {
    title,
    slug,
    summary,
    content,
    toc,
    status,
    published_at: status === "published" ? new Date().toISOString() : null,
  };

  if (id) {
    const { error } = await supabase.from("docs").update(payload).eq("id", id);
    if (error) throw error;
    return { id };
  } else {
    const { data, error } = await supabase
      .from("docs")
      .insert(payload)
      .select("id")
      .single();
    if (error) throw error;
    return data;
  }
}
