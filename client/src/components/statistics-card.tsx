import { Card, CardContent } from "@/components/ui/card";

interface StatisticsCardProps {
  title: string;
  value: number;
  label: string;
  labelColor: "primary" | "secondary" | "accent";
}

export function StatisticsCard({ title, value, label, labelColor }: StatisticsCardProps) {
  const getColorClasses = (color: string) => {
    switch (color) {
      case "primary":
        return "text-primary bg-primary/10";
      case "secondary":
        return "text-secondary bg-secondary/10";
      case "accent":
        return "text-accent bg-accent/10";
      default:
        return "text-primary bg-primary/10";
    }
  };

  return (
    <Card>
      <CardContent className="p-4">
        <h3 className="text-sm font-medium text-muted-foreground mb-2">{title}</h3>
        <div className="flex items-end justify-between">
          <span className="text-2xl font-bold">{value}</span>
          <div className={`${getColorClasses(labelColor)} px-2 py-1 rounded text-xs`}>
            {label}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
