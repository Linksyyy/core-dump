const examples = [
  { title: "blah blah", desc: "tal e tal e tal e tal e tal" },
  { title: "blah blah", desc: "tal e tal e tal e tal e tal" },
  { title: "blah blah", desc: "tal e tal e tal e tal e tal" },
  { title: "blah blah", desc: "tal e tal e tal e tal e tal" },
  { title: "blah blah", desc: "tal e tal e tal e tal e tal" },
  { title: "blah blah", desc: "tal e tal e tal e tal e tal" },
  { title: "blah blah", desc: "tal e tal e tal e tal e tal" },
  { title: "blah blah", desc: "tal e tal e tal e tal e tal" },
  { title: "blah blah", desc: "tal e tal e tal e tal e tal" },
  { title: "blah blah", desc: "tal e tal e tal e tal e tal" },
  { title: "blah blah", desc: "tal e tal e tal e tal e tal" },
  { title: "blah blah", desc: "tal e tal e tal e tal e tal" },
  { title: "blah blah", desc: "tal e tal e tal e tal e tal" },
  { title: "blah blah", desc: "tal e tal e tal e tal e tal" },
  { title: "blah blah", desc: "tal e tal e tal e tal e tal" },
  { title: "blah blah", desc: "tal e tal e tal e tal e tal" },
  { title: "blah blah", desc: "tal e tal e tal e tal e tal" },
  { title: "blah blah", desc: "tal e tal e tal e tal e tal" },
  { title: "blah blah", desc: "tal e tal e tal e tal e tal" },
  { title: "blah blah", desc: "tal e tal e tal e tal e tal" },
  { title: "blah blah", desc: "tal e tal e tal e tal e tal" },
  { title: "blah blah", desc: "tal e tal e tal e tal e tal" },
  { title: "blah blah", desc: "tal e tal e tal e tal e tal" },
];
export default function Sidebar() {
  return (
    <div className="flex flex-col w-1/5 h-full overflow-y-auto">
      {examples.map((example, index) => (
        <div key={index} className="border-y">
          <h3>{example.title}</h3>
          <p>{example.desc}</p>
        </div>
      ))}
    </div>
  );
}
