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
import AdminForm from "@/pages/Admins/AdminForm";
import {
  createAdmin,
  deleteAdmin,
  getAllAdmins,
  updateAdmin,
} from "@/services/admins";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";

export default function AdminsPage() {
  const queryClient = useQueryClient();
  const { data: admins, isLoading } = useQuery({
    queryKey: ["admins"],
    queryFn: getAllAdmins,
  });

  const [createOpen, setCreateOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [editAdmin, setEditAdmin] = useState<any>(null);

  const createMutation = useMutation({
    mutationFn: createAdmin,
    onSuccess: () => {
      queryClient.invalidateQueries(["admins"]);
      toast.success("Admin created");
      setCreateOpen(false);
    },
    onError: () => toast.error("Creation failed"),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) =>
      updateAdmin(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries(["admins"]);
      toast.success("Admin updated");
      setEditOpen(false);
    },
    onError: () => toast.error("Update failed"),
  });

  const deleteMutation = useMutation({
    mutationFn: deleteAdmin,
    onSuccess: () => {
      queryClient.invalidateQueries(["admins"]);
      toast.success("Admin deleted");
    },
    onError: () => toast.error("Delete failed"),
  });

  return (
    <div className="flex flex-col items-center justify-start min-h-screen px-4 py-8 bg-gray-50">
      <div className="w-full max-w-6xl space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Admins</h1>
          <Dialog open={createOpen} onOpenChange={setCreateOpen}>
            <DialogTrigger asChild>
              <Button>Add Admin</Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Add Admin</DialogTitle>
              </DialogHeader>
              <AdminForm
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
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead className="text-center">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {admins?.map((admin) => (
                    <TableRow key={admin.id}>
                      <TableCell>{admin.name}</TableCell>
                      <TableCell>{admin.email}</TableCell>
                      <TableCell className="flex gap-2 justify-center">
                        <Dialog
                          open={editOpen && editAdmin?.id === admin.id}
                          onOpenChange={(open) => {
                            setEditOpen(open);
                            if (open) setEditAdmin(admin);
                            else setEditAdmin(null);
                          }}
                        >
                          <DialogTrigger asChild>
                            <Button size="sm" variant="secondary">
                              Edit
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-md">
                            <DialogHeader>
                              <DialogTitle>Edit Admin</DialogTitle>
                            </DialogHeader>
                            <AdminForm
                              initialData={admin}
                              loading={updateMutation.isPending}
                              onSubmit={(data) =>
                                updateMutation.mutate({ id: admin.id, data })
                              }
                            />
                          </DialogContent>
                        </Dialog>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => deleteMutation.mutate(admin.id)}
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
