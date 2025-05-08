import IconPicker from "@/components/IconPicker";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export type CategoryFormProps = {
  initialData?: {
    name: string;
    icon: string;
  };
  onSubmit: (data: { name: string; icon: string }) => void;
  loading: boolean;
};

export default function CategoryForm({
  initialData,
  onSubmit,
  loading,
}: CategoryFormProps) {
  const [form, setForm] = useState({
    name: initialData?.name || "",
    icon: initialData?.icon || "leaf",
  });

  return (
    <div className="space-y-4">
      <Input
        placeholder="Category name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />

      <IconPicker
        value={form.icon}
        onChange={(icon) => setForm({ ...form, icon })}
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
