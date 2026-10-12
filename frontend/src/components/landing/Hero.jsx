import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa6";

const Hero = () => {
  return (
    <section className="hero min-h-[85vh] bg-base-200">
      <div className="hero-content max-w-7xl flex-col lg:flex-row-reverse">

        <div className="max-w-xl">
          <h1 className="text-5xl font-bold">
            Modern Court Case
            Management
          </h1>

          <p className="py-6 text-lg">
            Manage court cases, hearings,
            legal documents and users
            from one secure platform.
          </p>

          <div className="flex gap-4">
            <Link
              to="/login"
              className="btn btn-primary"
            >
              Get Started

              <FaArrowRight />
            </Link>

            <button className="btn btn-outline">
              Learn More
            </button>
          </div>
        </div>

        {/* illustration goes here later */}

      </div>
    </section>
  );
};

export default Hero;