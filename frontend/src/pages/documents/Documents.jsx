import { useEffect } from "react";

import useDocumentStore from "../../store/documentStore";

import DocumentsHeader from "../../components/documents/DocumentsHeader";
import DocumentsFilters from "../../components/documents/DocumentsFilters";
import DocumentsTable from "../../components/documents/DocumentsTable";
import DocumentModal from "../../components/documents/DocumentModal";
import ViewDocumentModal from "../../components/documents/ViewDocumentModal";
import DeleteDocumentModal from "../../components/documents/DeleteDocumentModal";

const Documents = () => {
  const {
    fetchDocuments,
    search,
    page,
    limit,
  } = useDocumentStore();

  useEffect(() => {
    fetchDocuments();
  }, [search, page, limit]);

  return (
    <div className="space-y-6">
      <DocumentsHeader />
      <DocumentsFilters />
      <DocumentsTable />
      <DocumentModal />
      <ViewDocumentModal />
      <DeleteDocumentModal />
    </div>
  );
};

export default Documents;