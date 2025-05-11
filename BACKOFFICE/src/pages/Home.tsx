import { Card, CardContent } from "@/components/ui/card";
import { getAllBreathingExercises } from "@/services/breathingExercises";
import { getFavorites } from "@/services/favorites";
import { getAllSessions } from "@/services/sessions";
import { getAllUsers } from "@/services/users";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import {
  Bar,
  BarChart,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff7f50", "#a29bfe"];

export default function Home() {
  const { data: users = [] } = useQuery({
    queryKey: ["users"],
    queryFn: getAllUsers,
  });
  const { data: exercises = [] } = useQuery({
    queryKey: ["exercises"],
    queryFn: getAllBreathingExercises,
  });
  const { data: sessions = [] } = useQuery({
    queryKey: ["sessions"],
    queryFn: getAllSessions,
  });
  const { data: favorites = [] } = useQuery({
    queryKey: ["favorites"],
    queryFn: getFavorites,
  });

  const sessionData = exercises.map((ex) => ({
    name: ex.name,
    sessions: sessions.filter((s) => s.exerciseId === ex.id).length,
  }));

  const favoriteData = exercises.map((ex) => ({
    name: ex.name,
    favorites: favorites.filter((f) => f.exerciseId === ex.id).length,
  }));

  const userByMonth = users.reduce((acc, user) => {
    const month = format(new Date(user.createdAt), "MMM yyyy");
    acc[month] = (acc[month] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  const userData = Object.entries(userByMonth).map(([month, count]) => ({
    month,
    count,
  }));

  const typeDistribution = exercises.reduce((acc, ex) => {
    acc[ex.type] = (acc[ex.type] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  const typeData = Object.entries(typeDistribution).map(([type, value]) => ({
    name: type,
    value,
  }));

  const EmptyMessage = ({ message }: { message: string }) => (
    <div className="h-[300px] flex items-center justify-center text-muted-foreground">
      {message}
    </div>
  );

  return (
    <div className="min-h-screen p-8 bg-gray-100 space-y-10">
      <Card className="text-center">
        <CardContent className="p-8 space-y-4">
          <h1 className="text-3xl font-bold">Backoffice CESIZen</h1>
          <p className="text-muted-foreground">
            Statistiques des utilisateurs, sessions, favoris et exercices.
          </p>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Sessions par exercice */}
        <Card>
          <CardContent className="p-4">
            <h2 className="text-lg font-semibold mb-4">
              Sessions par exercice
            </h2>
            {sessionData.length > 0 &&
            sessionData.some((d) => d.sessions > 0) ? (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={sessionData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="sessions" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <EmptyMessage message="Aucune session enregistrée." />
            )}
          </CardContent>
        </Card>

        {/* Favoris par exercice */}
        <Card>
          <CardContent className="p-4">
            <h2 className="text-lg font-semibold mb-4">Favoris par exercice</h2>
            {favoriteData.length > 0 &&
            favoriteData.some((d) => d.favorites > 0) ? (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={favoriteData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="favorites" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <EmptyMessage message="Aucun favori pour le moment." />
            )}
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <h2 className="text-lg font-semibold mb-4">
              Utilisateurs par mois
            </h2>
            {userData.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={userData}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#ffc658" />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <EmptyMessage message="Aucun utilisateur enregistré." />
            )}
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <h2 className="text-lg font-semibold mb-4">Types d'exercices</h2>
            {typeData.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={typeData}
                    dataKey="value"
                    nameKey="name"
                    outerRadius={100}
                    label
                  >
                    {typeData.map((_, i) => (
                      <Cell key={i} fill={COLORS[i % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <EmptyMessage message="Aucun type d'exercice trouvé." />
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
