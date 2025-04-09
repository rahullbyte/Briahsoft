import { useEffect, useRef } from "react";
import { Chart, ChartTypeRegistry, registerables } from "chart.js";
import { useTheme } from "@/components/theme-provider";

Chart.register(...registerables);

interface CommitChartProps {
  commitData: { date: string; count: number }[];
}

export function CommitsChart({ commitData }: CommitChartProps) {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart<keyof ChartTypeRegistry> | null>(null);
  const { theme } = useTheme();

  useEffect(() => {
    if (!chartRef.current) return;

    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const isDarkMode = theme === "dark";
    const fontColor = isDarkMode ? "#e5e7eb" : "#1f2937";
    const gridColor = isDarkMode ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)";

    const ctx = chartRef.current.getContext("2d");
    if (!ctx) return;

    chartInstance.current = new Chart(ctx, {
      type: "bar",
      data: {
        labels: commitData.map(item => item.date),
        datasets: [{
          label: "Commits",
          data: commitData.map(item => item.count),
          backgroundColor: "rgba(0, 112, 243, 0.7)",
          borderColor: "rgba(0, 112, 243, 1)",
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              color: fontColor,
              stepSize: 5
            },
            grid: {
              color: gridColor
            }
          },
          x: {
            ticks: {
              color: fontColor,
              maxRotation: 45,
              minRotation: 45
            },
            grid: {
              display: false
            }
          }
        },
        plugins: {
          legend: {
            labels: {
              color: fontColor,
              font: {
                family: "'Inter', sans-serif",
              }
            }
          },
          tooltip: {
            callbacks: {
              title: (items) => {
                return items[0].label;
              },
              label: (context) => {
                const value = context.raw as number;
                return `${value} commit${value !== 1 ? 's' : ''}`;
              }
            }
          }
        }
      }
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [commitData, theme]);

  if (commitData.length === 0) {
    return <div className="text-center py-8 text-muted-foreground">No commit data available</div>;
  }

  return <canvas ref={chartRef} height="250"></canvas>;
}
