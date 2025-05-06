import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { useState } from "react";

type UserFormProps = {
  initialData?: {
    name: string;
    email: string;
    password?: string;
    phoneNumber?: string;
    address?: string;
    dateOfBirth?: string;
  };
  onSubmit: (data: {
    name: string;
    email: string;
    password: string;
    phoneNumber: string;
    address: string;
    dateOfBirth: string;
  }) => void;
  loading: boolean;
};

export default function UserForm({
  initialData,
  onSubmit,
  loading,
}: UserFormProps) {
  const [form, setForm] = useState({
    name: initialData?.name || "",
    email: initialData?.email || "",
    password: "",
    phoneNumber: initialData?.phoneNumber || "",
    address: initialData?.address || "",
    dateOfBirth: initialData?.dateOfBirth || "",
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
      <Input
        placeholder="Phone Number"
        value={form.phoneNumber}
        onChange={(e) => setForm({ ...form, phoneNumber: e.target.value })}
      />
      <Input
        placeholder="Address"
        value={form.address}
        onChange={(e) => setForm({ ...form, address: e.target.value })}
      />

      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-full">
            {form.dateOfBirth
              ? format(new Date(form.dateOfBirth), "PPP")
              : "Select Date of Birth"}
          </Button>
        </PopoverTrigger>
        <PopoverContent align="start">
          <Calendar
            mode="single"
            selected={form.dateOfBirth ? new Date(form.dateOfBirth) : undefined}
            onSelect={(date) => {
              if (date) {
                setForm({ ...form, dateOfBirth: date.toISOString() });
              }
            }}
          />
        </PopoverContent>
      </Popover>

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
