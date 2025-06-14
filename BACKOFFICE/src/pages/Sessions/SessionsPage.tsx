import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import SessionForm from "@/pages/Sessions/SessionForm";
import { getAllBreathingExercises } from "@/services/breathingExercises";
import {
	createSession,
	deleteSession,
	getAllSessions,
	updateSession,
} from "@/services/sessions";
import { getAllUsers } from "@/services/users";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";

export default function SessionsPage() {
	const queryClient = useQueryClient();

	const { data: sessions, isLoading } = useQuery({
		queryKey: ["sessions"],
		queryFn: getAllSessions,
	});

	const { data: users = [] } = useQuery({
		queryKey: ["users"],
		queryFn: getAllUsers,
	});

	const { data: exercises = [] } = useQuery({
		queryKey: ["exercises"],
		queryFn: getAllBreathingExercises,
	});

	const [createOpen, setCreateOpen] = useState(false);
	const [editOpen, setEditOpen] = useState(false);
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const [editSession, setEditSession] = useState<any>(null);

	const createMutation = useMutation({
		mutationFn: createSession,
		onSuccess: () => {
			queryClient.invalidateQueries(["sessions"]);
			toast.success("Session created");
			setCreateOpen(false);
		},
		onError: () => toast.error("Creation failed"),
	});

	const updateMutation = useMutation({
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		mutationFn: ({ id, data }: { id: string; data: any }) =>
			updateSession(id, data),
		onSuccess: () => {
			queryClient.invalidateQueries(["sessions"]);
			toast.success("Session updated");
			setEditOpen(false);
		},
		onError: () => toast.error("Update failed"),
	});

	const deleteMutation = useMutation({
		mutationFn: deleteSession,
		onSuccess: () => {
			queryClient.invalidateQueries(["sessions"]);
			toast.success("Session deleted");
		},
		onError: () => toast.error("Delete failed"),
	});

	return (
		<div className="flex flex-col items-center justify-start min-h-screen px-4 py-8 bg-gray-50">
			<div className="w-full max-w-6xl space-y-6">
				<div className="flex justify-between items-center">
					<h1 className="text-3xl font-bold">Exercise Sessions</h1>
					<Dialog open={createOpen} onOpenChange={setCreateOpen}>
						<DialogTrigger asChild>
							<Button>Add Session</Button>
						</DialogTrigger>
						<DialogContent className="max-w-md">
							<DialogHeader>
								<DialogTitle>Add Session</DialogTitle>
							</DialogHeader>
							<SessionForm
								users={users}
								exercises={exercises}
								loading={createMutation.isPending}
								onSubmit={(data) => createMutation.mutate(data)}
							/>
						</DialogContent>
					</Dialog>
				</div>

				<Card>
					<CardContent className="p-6">
						{isLoading ? (
							<p>Loading...</p>
						) : (
							<Table>
								<TableHeader>
									<TableRow>
										<TableHead>User</TableHead>
										<TableHead>Exercise</TableHead>
										<TableHead>Date</TableHead>
										<TableHead>Duration</TableHead>
										<TableHead className="text-center">Actions</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									{sessions?.map((s) => (
										<TableRow key={s.id}>
											<TableCell>{s.user?.name || s.userId}</TableCell>
											<TableCell>{s.exercise?.name || s.exerciseId}</TableCell>
											<TableCell>
												{new Date(s.sessionDateTime).toLocaleString()}
											</TableCell>
											<TableCell>{s.performedDuration} min</TableCell>
											<TableCell className="flex gap-2 justify-center">
												<Dialog
													open={editOpen && editSession?.id === s.id}
													onOpenChange={(open) => {
														setEditOpen(open);
														if (open) setEditSession(s);
														else setEditSession(null);
													}}>
													<DialogTrigger asChild>
														<Button size="sm" variant="secondary">
															Edit
														</Button>
													</DialogTrigger>
													<DialogContent className="max-w-md">
														<DialogHeader>
															<DialogTitle>Edit Session</DialogTitle>
														</DialogHeader>
														<SessionForm
															initialData={s}
															users={users}
															exercises={exercises}
															loading={updateMutation.isPending}
															onSubmit={(data) =>
																updateMutation.mutate({ id: s.id, data })
															}
														/>
													</DialogContent>
												</Dialog>
												<Button
													size="sm"
													variant="destructive"
													onClick={() => deleteMutation.mutate(s.id)}>
													Delete
												</Button>
											</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						)}
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
