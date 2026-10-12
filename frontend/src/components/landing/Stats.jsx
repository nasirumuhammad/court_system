import {
  FaUsers,
  FaScaleBalanced,
  FaShieldHalved,
} from "react-icons/fa6";

const Stats = () => {
  return (
    <section className="py-20 bg-base-200">
      <div className="mx-auto max-w-7xl px-6">
        <div className="stats stats-vertical lg:stats-horizontal shadow w-full">

          <div className="stat">
            <FaScaleBalanced className="text-3xl text-primary mb-2" />

            <div className="stat-title">
              User Roles
            </div>

            <div className="stat-value">
              4
            </div>

            <div className="stat-desc">
              Admin, Clerk, Judge & Lawyer
            </div>
          </div>

          <div className="stat">
            <FaUsers className="text-3xl text-primary mb-2" />

            <div className="stat-title">
              Modules
            </div>

            <div className="stat-value">
              5
            </div>

            <div className="stat-desc">
              Cases, Hearings, Documents...
            </div>
          </div>

          <div className="stat">
            <FaShieldHalved className="text-3xl text-primary mb-2" />

            <div className="stat-title">
              Security
            </div>

            <div className="stat-value">
              100%
            </div>

            <div className="stat-desc">
              Role-based authorization
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Stats;