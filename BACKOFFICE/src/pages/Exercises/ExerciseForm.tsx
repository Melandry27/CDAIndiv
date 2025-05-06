import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

type ExerciseFormProps = {
  initialData?: {
    name: string;
    description: string;
    duration: number;
    level: string;
  };
  onSubmit: (data: {
    name: string;
    description: string;
    duration: number;
    level: string;
  }) => void;
  loading: boolean;
};

export default function ExerciseForm({
  initialData,
  onSubmit,
  loading,
}: ExerciseFormProps) {
  const [form, setForm] = useState({
    name: initialData?.name || "",
    description: initialData?.description || "",
    duration: initialData?.duration || 0,
    level: initialData?.level || "",
  });

  return (
    <div className="space-y-4">
      <Input
        placeholder="Name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />
      <Input
        placeholder="Description"
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
      />
      <Input
        type="number"
        placeholder="Duration (in minutes)"
        value={form.duration}
        onChange={(e) => setForm({ ...form, duration: Number(e.target.value) })}
      />
      <Input
        placeholder="Level (Beginner, Intermediate, etc.)"
        value={form.level}
        onChange={(e) => setForm({ ...form, level: e.target.value })}
      />

      <Button
        onClick={() => onSubmit(form)}
        disabled={loading}
        className="w-full"
      >
        {loading ? "Saving..." : "Submit"}
      </Button>
    </div>
  );
}
