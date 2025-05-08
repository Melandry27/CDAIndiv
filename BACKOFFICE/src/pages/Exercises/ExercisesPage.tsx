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
import ExerciseForm from "@/pages/Exercises/ExerciseForm";
import {
  createBreathingExercise,
  deleteBreathingExercise,
  getAllBreathingExercises,
  updateBreathingExercise,
} from "@/services/breathingExercises";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";
import { useAuth } from "../../context/AuthContext";

export default function ExercisesPage() {
  const queryClient = useQueryClient();
  const { data: exercises, isLoading } = useQuery({
    queryKey: ["exercises"],
    queryFn: getAllBreathingExercises,
  });

  const [createOpen, setCreateOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [editExercise, setEditExercise] = useState<any>(null);

  const { user } = useAuth();

  const createMutation = useMutation({
    mutationFn: (data: FormData) => createBreathingExercise(data),
    onSuccess: () => {
      queryClient.invalidateQueries(["exercises"]);
      toast.success("Exercise created");
      setCreateOpen(false);
    },
    onError: () => toast.error("Creation failed"),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: FormData }) =>
      updateBreathingExercise(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries(["exercises"]);
      toast.success("Exercise updated");
      setEditOpen(false);
    },
    onError: () => toast.error("Update failed"),
  });

  const deleteMutation = useMutation({
    mutationFn: deleteBreathingExercise,
    onSuccess: () => {
      queryClient.invalidateQueries(["exercises"]);
      toast.success("Exercise deleted");
    },
    onError: () => toast.error("Delete failed"),
  });

  return (
    <div className="flex flex-col items-center justify-start min-h-screen px-4 py-8 bg-gray-50">
      <div className="w-full max-w-6xl space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Breathing Exercises</h1>
          <Dialog open={createOpen} onOpenChange={setCreateOpen}>
            <DialogTrigger asChild>
              <Button>Add Exercise</Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Add Breathing Exercise</DialogTitle>
              </DialogHeader>
              <ExerciseForm
                initialData={{ adminId: user?.adminId }}
                loading={createMutation.isPending}
                onSubmit={(formData) => createMutation.mutate(formData)}
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
                    <TableHead>Name</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead>Level</TableHead>
                    <TableHead className="text-center">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {exercises?.map((exercise) => (
                    <TableRow key={exercise.id}>
                      <TableCell>{exercise.name}</TableCell>
                      <TableCell>{exercise.duration} min</TableCell>
                      <TableCell>{exercise.level}</TableCell>
                      <TableCell className="flex gap-2 justify-center">
                        <Dialog
                          open={editOpen && editExercise?.id === exercise.id}
                          onOpenChange={(open) => {
                            setEditOpen(open);
                            if (open) setEditExercise(exercise);
                            else setEditExercise(null);
                          }}
                        >
                          <DialogTrigger asChild>
                            <Button size="sm" variant="secondary">
                              Edit
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-md">
                            <DialogHeader>
                              <DialogTitle>Edit Breathing Exercise</DialogTitle>
                            </DialogHeader>
                            <ExerciseForm
                              initialData={{
                                ...exercise,
                                adminId: user?.adminId,
                                categories:
                                  exercise.categories?.map((cat) => cat.id) ||
                                  [],
                              }}
                              loading={updateMutation.isPending}
                              onSubmit={(formData) =>
                                updateMutation.mutate({
                                  id: exercise.id,
                                  data: formData,
                                })
                              }
                            />
                          </DialogContent>
                        </Dialog>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => deleteMutation.mutate(exercise.id)}
                        >
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
