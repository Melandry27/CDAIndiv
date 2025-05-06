import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { useEffect, useState } from "react";

type SessionFormProps = {
  initialData?: {
    sessionDateTime: string;
    performedDuration: number;
    userId: string;
    exerciseId: string;
  };
  onSubmit: (data: {
    sessionDateTime: string;
    performedDuration: number;
    userId: string;
    exerciseId: string;
  }) => void;
  loading: boolean;
  users: { id: string; name: string }[];
  exercises: { id: string; name: string }[];
};

export default function SessionForm({
  initialData,
  onSubmit,
  loading,
  users,
  exercises,
}: SessionFormProps) {
  const [form, setForm] = useState({
    sessionDateTime: initialData?.sessionDateTime || "",
    performedDuration: initialData?.performedDuration || 0,
    userId: initialData?.userId || "",
    exerciseId: initialData?.exerciseId || "",
  });

  useEffect(() => {
    if (users.length > 0 && !form.userId) {
      setForm((f) => ({ ...f, userId: users[0].id }));
    }
    if (exercises.length > 0 && !form.exerciseId) {
      setForm((f) => ({ ...f, exerciseId: exercises[0].id }));
    }
  }, [users, exercises]);

  return (
    <div className="space-y-4">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-full">
            {form.sessionDateTime
              ? format(new Date(form.sessionDateTime), "PPPpp")
              : "Select session date/time"}
          </Button>
        </PopoverTrigger>
        <PopoverContent align="start">
          <Calendar
            mode="single"
            selected={
              form.sessionDateTime ? new Date(form.sessionDateTime) : undefined
            }
            onSelect={(date) => {
              if (date) {
                setForm({ ...form, sessionDateTime: date.toISOString() });
              }
            }}
          />
        </PopoverContent>
      </Popover>

      <Input
        type="number"
        placeholder="Duration (in minutes)"
        value={form.performedDuration}
        onChange={(e) =>
          setForm({ ...form, performedDuration: Number(e.target.value) })
        }
      />

      <select
        className="w-full border rounded-md p-2"
        value={form.userId}
        onChange={(e) => setForm({ ...form, userId: e.target.value })}
      >
        {users.map((u) => (
          <option key={u.id} value={u.id}>
            {u.name}
          </option>
        ))}
      </select>

      <select
        className="w-full border rounded-md p-2"
        value={form.exerciseId}
        onChange={(e) => setForm({ ...form, exerciseId: e.target.value })}
      >
        {exercises.map((ex) => (
          <option key={ex.id} value={ex.id}>
            {ex.name}
          </option>
        ))}
      </select>

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
