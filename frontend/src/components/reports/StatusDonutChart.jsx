import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const StatusDonutChart = ({ report }) => {
  const data = [
    {
      name: "Pending",
      value: report.pendingCases,
    },
    {
      name: "Ongoing",
      value: report.ongoingCases,
    },
    {
      name: "Adjourned",
      value: report.adjournedCases,
    },
    {
      name: "Completed",
      value: report.completedCases,
    },
  ];

  const COLORS = [
    "#f59e0b",
    "#3b82f6",
    "#8b5cf6",
    "#22c55e",
  ];

  return (
    <div className="card bg-base-100 shadow-md">

      <div className="card-body">

        <h2 className="card-title">
          Case Status Distribution
        </h2>

        <div className="h-80">

          <ResponsiveContainer width="100%" height="100%">

            <PieChart>

              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                innerRadius={70}
                outerRadius={110}
                paddingAngle={3}
              >

                {data.map((entry, index) => (
                  <Cell
                    key={entry.name}
                    fill={COLORS[index]}
                  />
                ))}

              </Pie>

              <Tooltip />

              <Legend />

            </PieChart>

          </ResponsiveContainer>

        </div>

      </div>

    </div>
  );
};

export default StatusDonutChart;