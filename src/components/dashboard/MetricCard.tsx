
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ArrowDown, ArrowUp } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon?: React.ReactNode;
  trend?: {
    value: number;
    direction: "up" | "down" | "neutral";
  };
  loading?: boolean;
}

const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  description,
  icon,
  trend,
  loading = false,
}) => {
  return (
    <Card className={loading ? "opacity-70 animate-pulse" : ""}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon && <div className="h-4 w-4 text-muted-foreground">{icon}</div>}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{loading ? "-" : value}</div>
        {trend && (
          <p className="text-xs text-muted-foreground flex items-center mt-1">
            {trend.direction === "up" && (
              <ArrowUp
                className={cn(
                  "mr-1 h-3 w-3",
                  trend.value > 0 ? "text-green-500" : "text-muted-foreground"
                )}
              />
            )}
            {trend.direction === "down" && (
              <ArrowDown
                className={cn(
                  "mr-1 h-3 w-3",
                  trend.value < 0 ? "text-red-500" : "text-muted-foreground"
                )}
              />
            )}
            <span
              className={cn(
                trend.direction === "up" && trend.value > 0 && "text-green-500",
                trend.direction === "down" && trend.value < 0 && "text-red-500"
              )}
            >
              {trend.value}%
            </span>{" "}
            <span className="ml-1">{description}</span>
          </p>
        )}
        {!trend && description && (
          <p className="text-xs text-muted-foreground mt-1">{description}</p>
        )}
      </CardContent>
    </Card>
  );
};

export default MetricCard;
