import {
  FaFolderOpen,
  FaUserShield,
  FaFileLines,
} from "react-icons/fa6";

const features = [
  {
    title: "Case Management",
    description:
      "Create, assign, search and manage court cases efficiently.",
    icon: FaFolderOpen,
  },
  {
    title: "Role-Based Access",
    description:
      "Separate permissions for Admins, Clerks, Judges and Lawyers.",
    icon: FaUserShield,
  },
  {
    title: "Documents & Hearings",
    description:
      "Track hearings and manage legal documents in one place.",
    icon: FaFileLines,
  },
];

const Features = () => {
  return (
    <section className="py-20 bg-base-100">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold">
            Everything You Need
          </h2>

          <p className="mt-3 text-base-content/70">
            Designed to simplify court administration.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="card bg-base-200 shadow-lg"
              >
                <div className="card-body items-center text-center">
                  <Icon className="text-5xl text-primary" />

                  <h3 className="card-title">
                    {feature.title}
                  </h3>

                  <p>{feature.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;