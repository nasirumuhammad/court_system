import { FaFileAlt, FaPlus } from "react-icons/fa";

import useDocumentStore from "../../store/documentStore";

const DocumentsHeader = () => {
  const { openDocumentModal } = useDocumentStore();

  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold">
          Documents
        </h1>

        <p className="text-base-content/60">
          Manage court case documents.
        </p>
      </div>

      <button
        className="btn btn-primary"
        onClick={() => openDocumentModal()}
      >
        <FaPlus />
        Add Document
      </button>
    </div>
  );
};

export default DocumentsHeader;