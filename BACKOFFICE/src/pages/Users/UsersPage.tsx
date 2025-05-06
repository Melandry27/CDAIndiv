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
import UserForm from "@/pages/Users/UserForm";
import {
  createUser,
  deleteUser,
  getAllUsers,
  updateUser,
} from "@/services/users";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";

export default function UsersPage() {
  const queryClient = useQueryClient();
  const { data: users, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: getAllUsers,
  });

  const [createOpen, setCreateOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [editUser, setEditUser] = useState<any>(null);

  const createMutation = useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]);
      toast.success("User created");
      setCreateOpen(false);
    },
    onError: () => toast.error("Failed to create user"),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) =>
      updateUser(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]);
      toast.success("User updated");
      setEditOpen(false);
    },
    onError: () => toast.error("Failed to update user"),
  });

  const deleteMutation = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]);
      toast.success("User deleted");
    },
    onError: () => toast.error("Failed to delete user"),
  });

  return (
    <div className="flex flex-col items-center justify-start min-h-screen px-4 py-8 bg-gray-50">
      <div className="w-full max-w-6xl space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Users</h1>
          <Dialog open={createOpen} onOpenChange={setCreateOpen}>
            <DialogTrigger asChild>
              <Button>Add User</Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Add User</DialogTitle>
              </DialogHeader>
              <UserForm
                onSubmit={(data) => createMutation.mutate(data)}
                loading={createMutation.isPending}
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
                  {users?.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell className="flex gap-2 justify-center">
                        <Dialog
                          open={editOpen && editUser?.id === user.id}
                          onOpenChange={(open) => {
                            setEditOpen(open);
                            if (open) setEditUser(user);
                            else setEditUser(null);
                          }}
                        >
                          <DialogTrigger asChild>
                            <Button size="sm" variant="secondary">
                              Edit
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-md">
                            <DialogHeader>
                              <DialogTitle>Edit User</DialogTitle>
                            </DialogHeader>
                            <UserForm
                              initialData={user}
                              loading={updateMutation.isPending}
                              onSubmit={(data) =>
                                updateMutation.mutate({ id: user.id, data })
                              }
                            />
                          </DialogContent>
                        </Dialog>

                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => deleteMutation.mutate(user.id)}
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
