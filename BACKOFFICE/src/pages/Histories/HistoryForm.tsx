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

type HistoryFormProps = {
	initialData?: {
		registrationDate: string;
		comment: string;
		userId: string;
	};
	users: { id: string; name: string }[];
	onSubmit: (data: {
		registrationDate: string;
		comment: string;
		userId: string;
	}) => void;
	loading: boolean;
};

export default function HistoryForm({
	initialData,
	users,
	onSubmit,
	loading,
}: HistoryFormProps) {
	const [form, setForm] = useState({
		registrationDate: initialData?.registrationDate || "",
		comment: initialData?.comment || "",
		userId: initialData?.userId || "",
	});

	useEffect(() => {
		if (!form.userId && users.length > 0) {
			setForm((f) => ({ ...f, userId: users[0].id }));
		}
	}, [users, form.userId]);

	return (
		<div className="space-y-4">
			<Popover>
				<PopoverTrigger asChild>
					<Button variant="outline" className="w-full">
						{form.registrationDate
							? format(new Date(form.registrationDate), "PPPpp")
							: "Select Date"}
					</Button>
				</PopoverTrigger>
				<PopoverContent align="start">
					<Calendar
						mode="single"
						selected={
							form.registrationDate
								? new Date(form.registrationDate)
								: undefined
						}
						onSelect={(date) => {
							if (date) {
								setForm({ ...form, registrationDate: date.toISOString() });
							}
						}}
					/>
				</PopoverContent>
			</Popover>

			<Input
				placeholder="Comment"
				value={form.comment}
				onChange={(e) => setForm({ ...form, comment: e.target.value })}
			/>

			<select
				className="w-full border rounded-md p-2"
				value={form.userId}
				onChange={(e) => setForm({ ...form, userId: e.target.value })}>
				{users.map((u) => (
					<option key={u.id} value={u.id}>
						{u.name}
					</option>
				))}
			</select>

			<Button
				onClick={() => onSubmit(form)}
				disabled={loading}
				className="w-full">
				{loading ? "Saving..." : "Submit"}
			</Button>
		</div>
	);
}
