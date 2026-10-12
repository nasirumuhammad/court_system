import {
  FaFolderOpen,
  FaClock,
  FaGavel,
  FaPauseCircle,
  FaCheckCircle,
} from "react-icons/fa";

const ReportCards = ({ report }) => {
  const cards = [
    {
      title: "Total Cases",
      value: report.totalCases,
      icon: <FaFolderOpen className="text-3xl text-primary" />,
      border: "border-primary",
    },
    {
      title: "Pending",
      value: report.pendingCases,
      icon: <FaClock className="text-3xl text-warning" />,
      border: "border-warning",
    },
    {
      title: "Ongoing",
      value: report.ongoingCases,
      icon: <FaGavel className="text-3xl text-info" />,
      border: "border-info",
    },
    {
      title: "Adjourned",
      value: report.adjournedCases,
      icon: <FaPauseCircle className="text-3xl text-secondary" />,
      border: "border-secondary",
    },
    {
      title: "Completed",
      value: report.completedCases,
      icon: <FaCheckCircle className="text-3xl text-success" />,
      border: "border-success",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-5">

      {cards.map((card) => (

        <div
          key={card.title}
          className={`card bg-base-100 shadow-md border-l-4 ${card.border}`}
        >

          <div className="card-body">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-sm text-base-content/60">
                  {card.title}
                </p>

                <h2 className="mt-2 text-3xl font-bold">
                  {card.value}
                </h2>

              </div>

              {card.icon}

            </div>

          </div>

        </div>

      ))}

    </div>
  );
};

export default ReportCards;