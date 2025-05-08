import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  AlarmClock,
  Brain,
  Leaf,
  LucideIcon,
  Target,
  Wind,
} from "lucide-react";

const AVAILABLE_ICONS = [
  { name: "leaf", label: "Feuille" },
  { name: "brain", label: "Esprit" },
  { name: "target", label: "Cible" },
  { name: "alarm", label: "Alarme" },
  { name: "weather-windy", label: "Vent" },
];

const ICONS: Record<string, LucideIcon> = {
  leaf: Leaf,
  brain: Brain,
  target: Target,
  alarm: AlarmClock,
  "weather-windy": Wind,
};

type IconPickerProps = {
  value: string;
  onChange: (iconName: string) => void;
};

export default function IconPicker({ value, onChange }: IconPickerProps) {
  return (
    <div className="grid grid-cols-3 gap-2">
      {AVAILABLE_ICONS.map(({ name }) => {
        const Icon = ICONS[name] || Leaf;
        return (
          <Button
            key={name}
            variant={value === name ? "default" : "outline"}
            className={cn(
              "flex flex-col items-center p-2",
              value === name && "border-2 border-green-600"
            )}
            onClick={() => onChange(name)}
          >
            <Icon className="w-5 h-5 mb-1" />
            <span className="text-xs">{name}</span>
          </Button>
        );
      })}
    </div>
  );
}
