import { FaPlus } from "react-icons/fa6";
import useCaseStore from "../../store/caseStore";

const CasesHeader = () => {

  const { openCaseModal } = useCaseStore();

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

      <div>
        <h1 className="text-3xl font-bold">
          Cases
        </h1>

        <p className="text-base-content/70">
          Manage all court cases.
        </p>
      </div>

      <button
        className="btn btn-primary"
        onClick={() => openCaseModal()}
      >
        <FaPlus />
        New Case
      </button>

    </div>
  );
};

export default CasesHeader;