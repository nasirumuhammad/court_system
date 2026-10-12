
const StatCard = ({ title, value, icon: Icon }) => {
  return (
    <div className="card border border-base-300 bg-base-100 shadow-sm">
      <div className="card-body">

        <div className="flex items-center justify-between">

          <div>

            <p className="text-sm text-base-content/70">
              {title}
            </p>

            <h2 className="mt-2 text-3xl font-bold">
              {value}
            </h2>

          </div>

          <div className="rounded-xl bg-primary/10 p-4 text-primary">
            <Icon className="text-2xl" />
          </div>

        </div>

      </div>
    </div>
  );
};

export default StatCard;