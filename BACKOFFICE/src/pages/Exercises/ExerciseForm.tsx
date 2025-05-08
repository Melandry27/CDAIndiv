import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { getAllCategories } from "@/services/categories";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export default function ExerciseForm({
  initialData,
  onSubmit,
  loading,
}: {
  initialData?: {
    name: string;
    description: string;
    duration: number;
    level: string;
    categories?: string[];
  };
  onSubmit: (data: {
    name: string;
    description: string;
    duration: number;
    level: string;
    categoryIds: string[];
  }) => void;
  loading: boolean;
}) {
  const [form, setForm] = useState({
    name: initialData?.name || "",
    description: initialData?.description || "",
    duration: initialData?.duration || 0,
    level: initialData?.level || "",
    categories: initialData?.categories || [],
  });

  const { data: categories = [] } = useQuery({
    queryKey: ["categories"],
    queryFn: getAllCategories,
  });

  const toggleCategory = (id: string) => {
    setForm((prev) => ({
      ...prev,
      categories: prev.categories.includes(id)
        ? prev.categories.filter((cid) => cid !== id)
        : [...prev.categories, id],
    }));
  };

  const handleSubmit = () => {
    onSubmit({
      name: form.name,
      description: form.description,
      duration: form.duration,
      level: form.level,
      categoryIds: form.categories,
    });
  };

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
        placeholder="Level"
        value={form.level}
        onChange={(e) => setForm({ ...form, level: e.target.value })}
      />

      <div>
        <p className="text-sm font-medium mb-2">Catégories</p>
        <div className="grid grid-cols-2 gap-2">
          {categories?.map((cat) => (
            <label key={cat.id} className="flex items-center gap-2">
              <Checkbox
                checked={form.categories.includes(cat.id)}
                onCheckedChange={() => toggleCategory(cat.id)}
              />
              {cat.name}
            </label>
          ))}
        </div>
      </div>

      <Button onClick={handleSubmit} disabled={loading} className="w-full">
        {loading ? "Saving..." : "Submit"}
      </Button>
    </div>
  );
}
