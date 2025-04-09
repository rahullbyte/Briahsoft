import { useEffect, useRef } from "react";
import { Chart, ChartTypeRegistry, registerables } from "chart.js";
import { LanguageStat } from "@shared/types";
import { getLanguageColor } from "@/lib/githubApi";
import { useTheme } from "@/components/theme-provider";

Chart.register(...registerables);

interface LanguageChartProps {
  languages: LanguageStat[];
}

export function LanguageChart({ languages }: LanguageChartProps) {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart<keyof ChartTypeRegistry> | null>(null);
  const { theme } = useTheme();

  useEffect(() => {
    if (!chartRef.current || languages.length === 0) return;

    // Destroy existing chart if it exists
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const isDarkMode = theme === "dark";
    const fontColor = isDarkMode ? "#e5e7eb" : "#1f2937";

    const ctx = chartRef.current.getContext("2d");
    if (!ctx) return;

    chartInstance.current = new Chart(ctx, {
      type: "pie",
      data: {
        labels: languages.map(lang => lang.language),
        datasets: [{
          data: languages.map(lang => lang.percentage),
          backgroundColor: languages.map(lang => getLanguageColor(lang.language)),
          borderWidth: 1,
          borderColor: isDarkMode ? "#1f1f23" : "#ffffff",
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: "right",
            labels: {
              color: fontColor,
              font: {
                family: "'Inter', sans-serif",
              }
            }
          },
          tooltip: {
            callbacks: {
              label: (context) => {
                const label = context.label || "";
                const value = context.raw as number;
                return `${label}: ${value}%`;
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
  }, [languages, theme]);

  if (languages.length === 0) {
    return <div className="text-center py-8 text-muted-foreground">No language data available</div>;
  }

  return (
    <div>
      <canvas ref={chartRef} height="250"></canvas>
      
      <div className="mt-6 grid gap-3">
        {languages.slice(0, 4).map((lang) => (
          <div key={lang.language} className="space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">{lang.language}</span>
              <span className="text-xs text-muted-foreground">{lang.percentage}%</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2.5">
              <div 
                className="h-2.5 rounded-full" 
                style={{ 
                  width: `${lang.percentage}%`,
                  backgroundColor: getLanguageColor(lang.language)
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
