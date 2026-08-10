import { ImageIcon } from "lucide-react";

export default function ImagePlaceholder({
  label,
  className = "",
  aspect = "aspect-4/3",
}: {
  label: string;
  className?: string;
  aspect?: string;
}) {
  return (
    <div
      className={`${aspect} w-full border border-dashed border-zinc-300 bg-zinc-50 flex flex-col items-center justify-center gap-2 text-center px-6 ${className}`}
    >
      <ImageIcon className="h-6 w-6 text-zinc-400" strokeWidth={1.5} />
      <span className="text-xs font-mono text-zinc-400 max-w-xs">{label}</span>
    </div>
  );
}
