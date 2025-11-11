import { useEffect, useState } from "react";
import type { Click } from "../types/Click";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from "chart.js";

function DataPlot() {
  ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);
  const [clicks, setClicks] = useState<Click[]>([]);

  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchAllClicks = async () => {
      try {
        const response = await fetch("http://localhost:1337/api/clicks/all");

        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

        const data = await response.json();
        console.log("✅ Click data:", data);
        setClicks(data);
      } catch (err) {
        console.error("❌ Error fetching clicks:", err);
        //setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAllClicks();
  }, []);

  // 🧮 Compute clicks per job title
  const skillCounts: Record<string, number> = {};
  clicks.forEach((click) => {
    const name = click.skill?.name || "Unspecified";
    skillCounts[name] = (skillCounts[name] || 0) + 1;
  });

  const sortedEntries = Object.entries(skillCounts).sort((a, b) => b[1] - a[1]);

  const labels = sortedEntries.map(([label]) => label);
  const values = sortedEntries.map(([_, value]) => value);

  const data = {
    labels,
    datasets: [
      {
        label: "Number of Clicks per Job Title",
        data: values,
        backgroundColor: "rgba(54, 162, 235, 0.6)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Clicks by Job Title",
      },
    },
  };

  if (loading) return <div>Loading clicks...</div>;

  return (
    <div className="w-full">
      <h2 className="font-bold text-lg mb-2">All Clicks</h2>
      {clicks.length === 0 ? <p>No clicks yet.</p> : <Bar data={data} options={options} />}
    </div>
  );
}

export default DataPlot;
