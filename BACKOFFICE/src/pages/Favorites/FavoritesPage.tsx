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
import { getAllBreathingExercises } from "@/services/breathingExercises";
import {
  createFavorite,
  deleteFavorite,
  getFavorites,
  updateFavorite,
} from "@/services/favorites";
import { getAllUsers } from "@/services/users";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";
import FavoriteForm from "./FavoriteForm";

export default function FavoritesPage() {
  const queryClient = useQueryClient();
  const { data: favorites = [], isLoading } = useQuery({
    queryKey: ["favorites"],
    queryFn: getFavorites,
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
  const [editFavorite, setEditFavorite] = useState<any>(null);

  const createMutation = useMutation({
    mutationFn: createFavorite,
    onSuccess: () => {
      queryClient.invalidateQueries(["favorites"]);
      toast.success("Favori ajouté");
      setCreateOpen(false);
    },
    onError: () => toast.error("Erreur lors de l'ajout"),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) =>
      updateFavorite(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries(["favorites"]);
      toast.success("Favori modifié");
      setEditOpen(false);
    },
    onError: () => toast.error("Erreur lors de la modification"),
  });

  const deleteMutation = useMutation({
    mutationFn: deleteFavorite,
    onSuccess: () => {
      queryClient.invalidateQueries(["favorites"]);
      toast.success("Favori supprimé");
    },
    onError: () => toast.error("Erreur lors de la suppression"),
  });

  return (
    <div className="flex flex-col items-center justify-start min-h-screen px-4 py-8 bg-gray-50">
      <div className="w-full max-w-6xl space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Favoris</h1>
          <Dialog open={createOpen} onOpenChange={setCreateOpen}>
            <DialogTrigger asChild>
              <Button>Ajouter un favori</Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Ajouter un favori</DialogTitle>
              </DialogHeader>
              <FavoriteForm
                users={users}
                exercises={exercises}
                onSubmit={(data) => createMutation.mutate(data)}
                loading={createMutation.isPending}
              />
            </DialogContent>
          </Dialog>
        </div>

        <Card>
          <CardContent className="p-6">
            {isLoading ? (
              <p>Chargement...</p>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Utilisateur</TableHead>
                    <TableHead>Exercice</TableHead>
                    <TableHead className="text-center">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {favorites.map((fav) => (
                    <TableRow key={fav.id}>
                      <TableCell>{fav.user?.name}</TableCell>
                      <TableCell>{fav.exercise?.name}</TableCell>
                      <TableCell className="flex gap-2 justify-center">
                        <Dialog
                          open={editOpen && editFavorite?.id === fav.id}
                          onOpenChange={(open) => {
                            setEditOpen(open);
                            if (open) setEditFavorite(fav);
                            else setEditFavorite(null);
                          }}
                        >
                          <DialogTrigger asChild>
                            <Button size="sm" variant="secondary">
                              Modifier
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-md">
                            <DialogHeader>
                              <DialogTitle>Modifier le favori</DialogTitle>
                            </DialogHeader>
                            <FavoriteForm
                              initialData={fav}
                              users={users}
                              exercises={exercises}
                              onSubmit={(data) =>
                                updateMutation.mutate({ id: fav.id, data })
                              }
                              loading={updateMutation.isPending}
                            />
                          </DialogContent>
                        </Dialog>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => deleteMutation.mutate(fav.id)}
                        >
                          Supprimer
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
