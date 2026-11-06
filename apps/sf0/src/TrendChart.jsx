import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { DEMO_DAILY_WEIGHTS, allocate } from "./data.js";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler,
  Legend,
);
export default function TrendChart({ start, end }) {
  const points = allocate(2840, DEMO_DAILY_WEIGHTS)
    .map((value, i) => ({
      date: new Date(Date.UTC(2026, 9, 5 + i)).toISOString().slice(0, 10),
      value,
    }))
    .filter((p) => p.date >= start && p.date <= end);
  const data = {
    labels: points.map((p) =>
      new Intl.DateTimeFormat("en-CA", {
        month: "short",
        day: "numeric",
        timeZone: "UTC",
      }).format(new Date(`${p.date}T12:00:00Z`)),
    ),
    datasets: [
      {
        label: "Sessions",
        data: points.map((p) => p.value),
        borderColor: "#526f97",
        backgroundColor: "rgba(82,111,151,.035)",
        borderWidth: 1.7,
        pointRadius: 0,
        pointHoverRadius: 4,
        tension: 0.18,
        fill: true,
      },
      {
        label: "Previous period (sample)",
        data: points.map((p) => Math.round(p.value / 1.186)),
        borderColor: "#a7aebb",
        borderWidth: 1.2,
        borderDash: [4, 4],
        pointRadius: 0,
        tension: 0.18,
      },
    ],
  };
  return (
    <div className="traffic-chart">
      <Line
        data={data}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          interaction: { mode: "index", intersect: false },
          plugins: {
            legend: {
              position: "bottom",
              labels: {
                usePointStyle: true,
                pointStyle: "line",
                padding: 25,
                font: { family: "Inter", size: 11 },
                color: "#6d7873",
              },
            },
            tooltip: {
              backgroundColor: "#303b4b",
              padding: 12,
              displayColors: false,
            },
          },
          scales: {
            x: {
              grid: { display: false },
              border: { color: "#e5ebe7" },
              ticks: {
                maxTicksLimit: 6,
                color: "#7a8580",
                font: { family: "Inter", size: 11 },
              },
            },
            y: {
              beginAtZero: true,
              grid: { color: "#edf0ee" },
              border: { display: false },
              ticks: {
                maxTicksLimit: 5,
                color: "#7a8580",
                font: { family: "Inter", size: 11 },
              },
            },
          },
        }}
        role="img"
        aria-label="Sample daily sessions with an illustrative prior period comparison"
      />
    </div>
  );
}
