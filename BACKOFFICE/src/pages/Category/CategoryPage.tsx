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
import {
	createCategory,
	deleteCategory,
	getAllCategories,
	updateCategory,
} from "@/services/categories";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
	AlarmClock,
	Brain,
	Leaf,
	LucideIcon,
	Target,
	Wind,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import CategoryForm from "./CategoryForm";

const ICONS: Record<string, LucideIcon> = {
	leaf: Leaf,
	target: Target,
	alarm: AlarmClock,
	brain: Brain,
	"weather-windy": Wind,
};

export default function CategoriesPage() {
	const queryClient = useQueryClient();
	const { data: categories, isLoading } = useQuery({
		queryKey: ["categories"],
		queryFn: getAllCategories,
	});

	const [createOpen, setCreateOpen] = useState(false);
	const [editOpen, setEditOpen] = useState(false);
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const [editCategory, setEditCategory] = useState<any>(null);

	const createMutation = useMutation({
		mutationFn: createCategory,
		onSuccess: () => {
			queryClient.invalidateQueries(["categories"]);
			toast.success("Category created");
			setCreateOpen(false);
		},
		onError: () => toast.error("Creation failed"),
	});

	const updateMutation = useMutation({
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		mutationFn: ({ id, data }: { id: string; data: any }) =>
			updateCategory(id, data),
		onSuccess: () => {
			queryClient.invalidateQueries(["categories"]);
			toast.success("Category updated");
			setEditOpen(false);
		},
		onError: () => toast.error("Update failed"),
	});

	const deleteMutation = useMutation({
		mutationFn: deleteCategory,
		onSuccess: () => {
			queryClient.invalidateQueries(["categories"]);
			toast.success("Category deleted");
		},
		onError: () => toast.error("Delete failed"),
	});

	return (
		<div className="flex flex-col items-center justify-start min-h-screen px-4 py-8 bg-gray-50">
			<div className="w-full max-w-4xl space-y-6">
				<div className="flex justify-between items-center">
					<h1 className="text-3xl font-bold">Categories</h1>
					<Dialog open={createOpen} onOpenChange={setCreateOpen}>
						<DialogTrigger asChild>
							<Button>Add Category</Button>
						</DialogTrigger>
						<DialogContent className="max-w-md">
							<DialogHeader>
								<DialogTitle>Add Category</DialogTitle>
							</DialogHeader>
							<CategoryForm
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
										<TableHead>Icon</TableHead>
										<TableHead>Name</TableHead>
										<TableHead className="text-center">Actions</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									{categories?.map((category) => {
										const Icon = ICONS[category.icon] || Leaf;
										return (
											<TableRow key={category.id}>
												<TableCell>
													<Icon className="w-5 h-5" />
												</TableCell>
												<TableCell>{category.name}</TableCell>
												<TableCell className="flex gap-2 justify-center">
													<Dialog
														open={editOpen && editCategory?.id === category.id}
														onOpenChange={(open) => {
															setEditOpen(open);
															if (open) setEditCategory(category);
															else setEditCategory(null);
														}}>
														<DialogTrigger asChild>
															<Button size="sm" variant="secondary">
																Edit
															</Button>
														</DialogTrigger>
														<DialogContent className="max-w-md">
															<DialogHeader>
																<DialogTitle>Edit Category</DialogTitle>
															</DialogHeader>
															<CategoryForm
																initialData={category}
																loading={updateMutation.isPending}
																onSubmit={(data) =>
																	updateMutation.mutate({
																		id: category.id,
																		data,
																	})
																}
															/>
														</DialogContent>
													</Dialog>
													<Button
														size="sm"
														variant="destructive"
														onClick={() => deleteMutation.mutate(category.id)}>
														Delete
													</Button>
												</TableCell>
											</TableRow>
										);
									})}
								</TableBody>
							</Table>
						)}
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
