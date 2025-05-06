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
import HistoryForm from "@/pages/Histories/HistoryForm";
import {
  createHistory,
  deleteHistory,
  getAllHistories,
  updateHistory,
} from "@/services/histories";
import { getAllUsers } from "@/services/users";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";

export default function HistoriesPage() {
  const queryClient = useQueryClient();

  const { data: histories, isLoading } = useQuery({
    queryKey: ["histories"],
    queryFn: getAllHistories,
  });

  const { data: users = [] } = useQuery({
    queryKey: ["users"],
    queryFn: getAllUsers,
  });

  const [createOpen, setCreateOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [editHistory, setEditHistory] = useState<any>(null);

  const createMutation = useMutation({
    mutationFn: createHistory,
    onSuccess: () => {
      queryClient.invalidateQueries(["histories"]);
      toast.success("History created");
      setCreateOpen(false);
    },
    onError: () => toast.error("Creation failed"),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) =>
      updateHistory(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries(["histories"]);
      toast.success("History updated");
      setEditOpen(false);
    },
    onError: () => toast.error("Update failed"),
  });

  const deleteMutation = useMutation({
    mutationFn: deleteHistory,
    onSuccess: () => {
      queryClient.invalidateQueries(["histories"]);
      toast.success("History deleted");
    },
    onError: () => toast.error("Delete failed"),
  });

  return (
    <div className="flex flex-col items-center justify-start min-h-screen px-4 py-8 bg-gray-50">
      <div className="w-full max-w-6xl space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Histories</h1>
          <Dialog open={createOpen} onOpenChange={setCreateOpen}>
            <DialogTrigger asChild>
              <Button>Add History</Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Add History</DialogTitle>
              </DialogHeader>
              <HistoryForm
                users={users}
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
                    <TableHead>Date</TableHead>
                    <TableHead>Comment</TableHead>
                    <TableHead className="text-center">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {histories?.map((h) => (
                    <TableRow key={h.id}>
                      <TableCell>{h.user?.name || h.userId}</TableCell>
                      <TableCell>
                        {new Date(h.registrationDate).toLocaleString()}
                      </TableCell>
                      <TableCell>{h.comment}</TableCell>
                      <TableCell className="flex gap-2 justify-center">
                        <Dialog
                          open={editOpen && editHistory?.id === h.id}
                          onOpenChange={(open) => {
                            setEditOpen(open);
                            if (open) setEditHistory(h);
                            else setEditHistory(null);
                          }}
                        >
                          <DialogTrigger asChild>
                            <Button size="sm" variant="secondary">
                              Edit
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-md">
                            <DialogHeader>
                              <DialogTitle>Edit History</DialogTitle>
                            </DialogHeader>
                            <HistoryForm
                              initialData={h}
                              users={users}
                              loading={updateMutation.isPending}
                              onSubmit={(data) =>
                                updateMutation.mutate({ id: h.id, data })
                              }
                            />
                          </DialogContent>
                        </Dialog>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => deleteMutation.mutate(h.id)}
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
