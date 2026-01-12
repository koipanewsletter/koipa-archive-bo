export function slugify(text) {
  return (text || "")
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-가-힣]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export function buildTocFromMarkdown(md) {
  const lines = (md || "").split("\n");
  const toc = [];
  const seen = new Map();

  for (const line of lines) {
    const m = /^(#{1,3})\s+(.+)$/.exec(line.trim());
    if (!m) continue;
    const level = m[1].length;
    const text = m[2].trim();

    let id = slugify(text);
    const count = (seen.get(id) || 0) + 1;
    seen.set(id, count);
    if (count > 1) id = `${id}-${count}`;

    toc.push({ level, text, id });
  }
  return toc;
}
