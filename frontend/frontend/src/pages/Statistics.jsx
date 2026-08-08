import useFetch from "../hooks/useFetch";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  BarChart,
  Bar,
} from "recharts";

import "../styles/statistics.css";

const COLORS = [
  "#3B82F6",
  "#22C55E",
  "#F59E0B",
  "#EF4444",
  "#7C3AED",
];

export default function Statistics() {
  const { data, loading } = useFetch("/statistics");

  if (loading) return <h2>Loading...</h2>;

  console.log(data);

  const dist = data?.distribution || [];
  const daily = data?.daily || [];
  const weekly = data?.weekly || [];

  return (
    <div className="statistics">

      <h1>Statistics</h1>

      <div className="chart-grid">

        {/* Pie */}

        <div className="chart-card">

          <h3>Animal Distribution</h3>

          <div className="chart-box">

            <ResponsiveContainer width="100%" height={300}>

              <PieChart>

                <Pie
                  data={dist}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={90}
                  label
                >
                  {dist.map((entry, index) => (
                    <Cell
                      key={index}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>

                <Tooltip />

                <Legend />

              </PieChart>

            </ResponsiveContainer>

          </div>

        </div>

        {/* Line */}

        <div className="chart-card">

          <h3>Daily Detection</h3>

          <div className="chart-box">

            <ResponsiveContainer width="100%" height={300}>

              <LineChart data={daily}>

                <CartesianGrid strokeDasharray="3 3" />

                <XAxis dataKey="date" />

                <YAxis />

                <Tooltip />

                <Legend />

                <Line
                  type="monotone"
                  dataKey="count"
                  stroke="#3B82F6"
                  strokeWidth={3}
                />

              </LineChart>

            </ResponsiveContainer>

          </div>

        </div>

        {/* Bar */}

        <div className="chart-card">

          <h3>Weekly Detection</h3>

          <div className="chart-box">

            <ResponsiveContainer width="100%" height={300}>

              <BarChart data={weekly}>

                <CartesianGrid strokeDasharray="3 3" />

                <XAxis dataKey="day" />

                <YAxis />

                <Tooltip />

                <Legend />

                <Bar
                  dataKey="count"
                  fill="#22C55E"
                />

              </BarChart>

            </ResponsiveContainer>

          </div>

        </div>

      </div>

    </div>
  );
}