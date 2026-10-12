const JudgeReportTable = ({ report }) => {
  return (
    <div className="card bg-base-100 shadow-md">

      <div className="card-body">

        <h2 className="card-title">
          Cases Assigned Per Judge
        </h2>

        <div className="overflow-x-auto">

          <table className="table">

            <thead>

              <tr>

                <th>#</th>

                <th>Judge</th>

                <th>Total Cases</th>

              </tr>

            </thead>

            <tbody>

              {report.casesPerJudge.map(
                (judge, index) => (

                  <tr key={judge.judgeId}>

                    <td>{index + 1}</td>

                    <td>{judge.judgeName}</td>

                    <td>

                      <span className="badge badge-primary badge-lg">

                        {judge.totalCases}

                      </span>

                    </td>

                  </tr>

                )
              )}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
};

export default JudgeReportTable;