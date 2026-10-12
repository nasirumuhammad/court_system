import { Link } from "react-router-dom";

const CTA = () => {
  return (
    <footer className="py-20 bg-primary text-primary-content">
      <div className="mx-auto max-w-3xl text-center px-6">
        <h2 className="text-4xl font-bold">
          Ready to Get Started?
        </h2>

        <p className="mt-4">
          Sign in to manage cases, hearings,
          documents and users.
        </p>

        <Link
          to="/login"
          className="btn btn-neutral mt-8"
        >
          Login
        </Link>
      </div>
    </footer>
  );
};

export default CTA;