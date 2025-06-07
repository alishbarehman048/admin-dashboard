export default function Settings({ colorTheme, setColorTheme }) {
  const colors = ["slate", "indigo", "emerald", "rose", "violet"];
  const colorClasses = {
    slate: "bg-slate-400",
    indigo: "bg-indigo-400",
    emerald: "bg-emerald-400",
    rose: "bg-rose-400",
    violet: "bg-violet-400",
  };
  const ringClasses = {
    slate: "ring-slate-300",
    indigo: "ring-indigo-300",
    emerald: "ring-emerald-300",
    rose: "ring-rose-300",
    violet: "ring-violet-300",
  };

  return (
    <div className="p-4 text-white">
      <h2 className="text-2xl font-semibold mb-4 text-slate-600">Choose Theme Color</h2>

      <div className="flex space-x-4">
        {colors.map((color) => (
          <button
            key={color}
            onClick={() => setColorTheme(color)}
            className={`w-10 h-10 rounded-full ${colorClasses[color]} hover:ring-4 hover:${ringClasses[color]} focus:outline-none ${
              colorTheme === color ? `ring-4 ring-offset-2 ring-white` : ""
            }`}
            aria-label={`Set theme color to ${color}`}
          />
        ))}
      </div>
    </div>
  );
}
