export default function LiveUpdate() {
  return (
    <div className="relative flex items-center gap-x-2">
      <span className="relative flex justify-center items-center h-1.5 w-1.5">
        <span
          aria-live="polite"
          className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"
        />
        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500" />
      </span>

      <h3 className="text-xs font-black uppercase text-muted-foreground">REAL-TIME</h3>
    </div>
  );
}
