let examples: { title: string; desc: string }[] = [];
for (let i = 1; i <= 100; i++) {
  examples.push({
    title: "blah blah " + i,
    desc: "tal e tal e tal e tal e tal",
  });
}

export default function Sidebar() {
  return (
    <div className="flex flex-col w-1/5 h-full overflow-y-auto border-l border-neutral-300 p-5">
      {examples.map((example, index) => (
        <button
          key={index}
          className="border-y border-neutral-300 flex flex-col items-start"
        >
          <h3 className="font-bold text-lg">{example.title}</h3>
          <p className="text-neutral-600 text-xs">{example.desc}</p>
        </button>
      ))}
    </div>
  );
}
