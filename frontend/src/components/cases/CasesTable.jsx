import {
  FaEye,
  FaPen,
  FaTrash,
} from "react-icons/fa6";
import useCaseStore from "../../store/caseStore";
import StatusBadge from "../ui/StatusBadge";

const CasesTable = () => {
  const { cases, isLoading, openViewModal, openCaseModal, openDeleteModal } = useCaseStore();

  if (isLoading) {
    return (
      <div className="flex justify-center py-10">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border bg-base-100">

      <table className="table">

        <thead>
          <tr>
            <th>Case No.</th>
            <th>Title</th>
            <th>Judge</th>
            <th>Lawyer</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>

          {cases.map((courtCase) => (
            <tr key={courtCase._id}>

              <td>{courtCase.caseNumber}</td>

              <td>{courtCase.caseTitle}</td>

              <td>
                {courtCase.assignedJudge?.fullName || "Not Assigned"}
              </td>

              <td>
                {courtCase.assignedLawyer?.fullName || "Not Assigned"}
              </td>

              <td>
                <StatusBadge status={courtCase.status} />
              </td>

             <td>
             <div className="flex gap-2">

               <button className="btn btn-sm btn-ghost"  onClick={() => openViewModal(courtCase)}>
                <FaEye />
                </button>

                <button
                        className="btn btn-sm btn-ghost text-info"
                        onClick={() => openCaseModal(courtCase)}>
                <FaPen />
                </button>

                <button className="btn btn-sm btn-ghost text-error" onClick={() => openDeleteModal(courtCase)}>
                <FaTrash />
                </button>

            </div>
            </td>

            </tr>
          ))}

        </tbody>

      </table>

    </div>
  );
};

export default CasesTable;