import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <Card className="w-full max-w-xl text-center shadow-xl">
        <CardContent className="p-8 space-y-6">
          <h1 className="text-3xl font-bold">Backoffice CESIZen</h1>
          <p className="text-muted-foreground">
            Gestion des utilisateurs, exercices de respiration, sessions et
            historiques.
          </p>
          <Button size="lg">Accéder au tableau de bord</Button>
        </CardContent>
      </Card>
    </div>
  );
}
