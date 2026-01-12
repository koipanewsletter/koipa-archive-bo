import MDEditor from "@uiw/react-md-editor";

export default function MarkdownEditor({ value, onChange }) {
  return <MDEditor value={value} onChange={onChange} />;
}
