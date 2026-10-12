import {
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const CasesPerJudgeBarChart = ({ report }) => {
  return (
    <div className="card bg-base-100 shadow-md">

      <div className="card-body">

        <h2 className="card-title">
          Cases Per Judge
        </h2>

        <div className="h-80">

          <ResponsiveContainer width="100%" height="100%">

            <BarChart
              data={report.casesPerJudge}
              layout="vertical"
              margin={{
                top: 10,
                right: 20,
                left: 20,
                bottom: 10,
              }}
            >

              <CartesianGrid strokeDasharray="3 3" />

              <XAxis
                type="number"
                allowDecimals={false}
              />

              <YAxis
                type="category"
                dataKey="judgeName"
                width={120}
              />

              <Tooltip />

              <Bar
                dataKey="totalCases"
                radius={[0, 8, 8, 0]}
              />

            </BarChart>

          </ResponsiveContainer>

        </div>

      </div>

    </div>
  );
};

export default CasesPerJudgeBarChart;