import { Link } from "react-router-dom";
import { FaScaleBalanced } from "react-icons/fa6";

const Logo = () => {
  return (
    <Link to="/" className="flex items-center gap-3">
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-content">
        <FaScaleBalanced className="text-2xl" />
      </div>

      <div>
        <h1 className="text-xl font-bold">
          CourtFlow
        </h1>

        <p className="text-xs text-base-content/70">
          Court Case Management
        </p>
      </div>
    </Link>
  );
};

export default Logo;