import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

type AdminFormProps = {
  initialData?: {
    name: string;
    email: string;
    password?: string;
  };
  onSubmit: (data: { name: string; email: string; password: string }) => void;
  loading: boolean;
};

export default function AdminForm({
  initialData,
  onSubmit,
  loading,
}: AdminFormProps) {
  const [form, setForm] = useState({
    name: initialData?.name || "",
    email: initialData?.email || "",
    password: "",
  });

  return (
    <div className="space-y-4">
      <Input
        placeholder="Name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />
      <Input
        placeholder="Email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />
      <Input
        placeholder="Password"
        type="password"
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
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
