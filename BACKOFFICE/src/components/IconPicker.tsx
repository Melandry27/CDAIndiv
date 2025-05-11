import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  AlarmClock,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  Brain,
  Cloud,
  Compass,
  Droplet,
  Leaf,
  LucideIcon,
  Moon,
  Rainbow,
  Star,
  Sun,
  Target,
  Thermometer,
  Umbrella,
  Wind,
} from "lucide-react";

const AVAILABLE_ICONS = [
  { name: "leaf", label: "Feuille" },
  { name: "brain", label: "Esprit" },
  { name: "target", label: "Cible" },
  { name: "alarm", label: "Alarme" },
  { name: "weather-windy", label: "Vent" },
  { name: "sun", label: "Soleil" },
  { name: "moon", label: "Lune" },
  { name: "star", label: "Étoile" },
  { name: "cloud", label: "Nuage" },
  { name: "rainbow", label: "Arc-en-ciel" },
  { name: "umbrella", label: "Parapluie" },
  { name: "thermometer", label: "Thermomètre" },
  { name: "droplet", label: "Goutte" },
  { name: "compass", label: "Boussole" },
  { name: "arrow-right", label: "Flèche Droite" },
  { name: "arrow-left", label: "Flèche Gauche" },
  { name: "arrow-up", label: "Flèche Haut" },
  { name: "arrow-down", label: "Flèche Bas" },
];

const ICONS: Record<string, LucideIcon> = {
  leaf: Leaf,
  brain: Brain,
  target: Target,
  alarm: AlarmClock,
  "weather-windy": Wind,
  sun: Sun,
  moon: Moon,
  star: Star,
  cloud: Cloud,
  rainbow: Rainbow,
  umbrella: Umbrella,
  thermometer: Thermometer,
  droplet: Droplet,
  compass: Compass,
  "arrow-right": ArrowRight,
  "arrow-left": ArrowLeft,
  "arrow-up": ArrowUp,
  "arrow-down": ArrowDown,
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
          </Button>
        );
      })}
    </div>
  );
}
