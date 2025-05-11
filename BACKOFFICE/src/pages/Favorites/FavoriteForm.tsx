import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectItem } from "@/components/ui/select";
import { useEffect, useState } from "react";

type FavoriteFormProps = {
  initialData?: {
    userId: string;
    exerciseId: string;
  };
  users: { id: string; name: string }[];
  exercises: { id: string; name: string }[];
  onSubmit: (data: { userId: string; exerciseId: string }) => void;
  loading: boolean;
};

export default function FavoriteForm({
  initialData,
  users,
  exercises,
  onSubmit,
  loading,
}: FavoriteFormProps) {
  const [form, setForm] = useState({
    userId: initialData?.userId || "",
    exerciseId: initialData?.exerciseId || "",
  });

  useEffect(() => {
    if (!form.userId && users.length > 0) {
      setForm((f) => ({ ...f, userId: users[0].id }));
    }
    if (!form.exerciseId && exercises.length > 0) {
      setForm((f) => ({ ...f, exerciseId: exercises[0].id }));
    }
  }, [users, exercises]);

  return (
    <div className="space-y-4">
      <div>
        <Label>Utilisateur</Label>
        <Select
          value={form.userId}
          onValueChange={(val) => setForm({ ...form, userId: val })}
        >
          {users.map((user) => (
            <SelectItem key={user.id} value={user.id}>
              {user.name}
            </SelectItem>
          ))}
        </Select>
      </div>

      <div>
        <Label>Exercice</Label>
        <Select
          value={form.exerciseId}
          onValueChange={(val) => setForm({ ...form, exerciseId: val })}
        >
          {exercises.map((ex) => (
            <SelectItem key={ex.id} value={ex.id}>
              {ex.name}
            </SelectItem>
          ))}
        </Select>
      </div>

      <Button
        onClick={() => onSubmit(form)}
        disabled={loading}
        className="w-full"
      >
        {loading ? "Enregistrement..." : "Valider"}
      </Button>
    </div>
  );
}
