const statusStyles = {
  Pending: "badge-warning",
  Ongoing: "badge-info",
  Adjourned: "badge-secondary",
  Completed: "badge-success",
};

const StatusBadge = ({ status }) => {
  return (
    <span
      className={`badge ${
        statusStyles[status] || "badge-neutral"
      }`}
    >
      {status}
    </span>
  );
};

export default StatusBadge;