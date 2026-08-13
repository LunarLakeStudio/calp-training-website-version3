import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function FilterSelect({
  label,
  placeholder,
  value,
  onChange,
  options,
}: {
  label: string;
  placeholder: string;
  value: string | null;
  onChange: (v: string | null) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <span className="text-xs font-bold text-calp-blue">{label}</span>
      <Select
        value={value ?? "all"}
        onValueChange={(v) => onChange(v === "all" ? null : v)}
      >
        <SelectTrigger className="h-10 w-full border-calp-blue/15 bg-white text-xs font-medium text-calp-ink focus:ring-calp-blue">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent className="max-h-72">
          <SelectItem value="all" className="text-xs">
            {placeholder}
          </SelectItem>
          {options.map((o) => (
            <SelectItem key={o.value} value={o.value} className="text-xs">
              {o.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
