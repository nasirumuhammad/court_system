import {
  FaEye,
  FaPen,
  FaTrash,
} from "react-icons/fa";

import useDocumentStore from "../../store/documentStore";

const DocumentsTable = () => {
  const {
    documents,
    pagination,
    isLoading,

    page,
    setPage,

    openViewModal,
    openDocumentModal,
    openDeleteModal,
  } = useDocumentStore();

  if (isLoading) {
    return (
      <div className="flex justify-center py-10">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-box border border-base-300 bg-base-100">

      <table className="table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Case</th>
            <th>Created By</th>
            <th>Date Added</th>
            <th className="text-center">
              Actions
            </th>
          </tr>
        </thead>

        <tbody>

          {documents.length === 0 ? (
            <tr>
              <td
                colSpan={5}
                className="py-10 text-center text-base-content/60"
              >
                No documents found.
              </td>
            </tr>
          ) : (
            documents.map((document) => (
              <tr key={document._id}>

                <td>{document.title}</td>

                <td>
                  {document.caseId?.caseNumber}
                </td>

                <td>
                  {document.createdBy?.fullName}
                </td>

                <td>
                  {new Date(
                    document.dateAdded
                  ).toLocaleDateString()}
                </td>

                <td>
  <div className="flex gap-2">

    <button
      className="btn btn-sm btn-ghost"
      onClick={() => openViewModal(document)}
    >
      <FaEye />
    </button>

    <button
      className="btn btn-sm btn-ghost text-info"
      onClick={() => openDocumentModal(null, document)}
    >
      <FaPen />
    </button>

    <button
      className="btn btn-sm btn-ghost text-error"
      onClick={() => openDeleteModal(document)}
    >
      <FaTrash />
    </button>

  </div>
</td>

              </tr>
            ))
          )}

        </tbody>

      </table>

      {pagination && (
        <div className="flex items-center justify-between border-t border-base-300 p-4">

          <span className="text-sm text-base-content/60">
            Page {pagination.currentPage} of{" "}
            {pagination.totalPages}
          </span>

          <div className="join">

            <button
              className="join-item btn"
              disabled={!pagination.hasPrevPage}
              onClick={() => setPage(page - 1)}
            >
              Previous
            </button>

            <button
              className="join-item btn"
              disabled={!pagination.hasNextPage}
              onClick={() => setPage(page + 1)}
            >
              Next
            </button>

          </div>

        </div>
      )}

    </div>
  );
};

export default DocumentsTable;