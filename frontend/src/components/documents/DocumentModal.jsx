import { useEffect } from "react";
import { useForm } from "react-hook-form";

import useCaseStore from "../../store/caseStore";
import useDocumentStore from "../../store/documentStore";

const DocumentModal = () => {
  const { cases, fetchCases } = useCaseStore();

  const {
    isDocumentModalOpen,
    closeDocumentModal,
    selectedDocument,
    selectedCaseId,
    createDocument,
    updateDocument,
    isLoading,
  } = useDocumentStore();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      caseId: "",
      title: "",
      description: "",
    },
  });

  useEffect(() => {
    fetchCases();
  }, []);

  useEffect(() => {
    if (!isDocumentModalOpen) {
      reset();
      return;
    }

    if (selectedDocument) {
      reset({
        caseId:
          selectedDocument.caseId?._id || "",
        title: selectedDocument.title,
        description:
          selectedDocument.description,
      });
    } else {
      reset({
        caseId: selectedCaseId || "",
        title: "",
        description: "",
      });
    }
  }, [
    isDocumentModalOpen,
    selectedDocument,
    selectedCaseId,
    reset,
  ]);

  const onSubmit = async (data) => {
    try {
      if (selectedDocument) {
        await updateDocument(
          selectedDocument._id,
          data
        );
      } else {
        await createDocument(data);
      }

      reset();
    } catch (err) {
      console.error(err);
    }
  };

  if (!isDocumentModalOpen) return null;

  return (
    <dialog className="modal modal-open">
      <div className="modal-box">

        <h2 className="text-2xl font-bold">
          {selectedDocument
            ? "Edit Document"
            : "Add Document"}
        </h2>

        <form
          id="document-form"
          className="mt-6 space-y-5"
          onSubmit={handleSubmit(onSubmit)}
        >

          <div>
            <label className="label">
              <span className="label-text">
                Case
              </span>
            </label>

            <select
              className="select select-bordered w-full"
              {...register("caseId", {
                required: "Case is required",
              })}
            >
              <option value="">
                Select Case
              </option>

              {cases.map((courtCase) => (
                <option
                  key={courtCase._id}
                  value={courtCase._id}
                >
                  {courtCase.caseNumber}
                </option>
              ))}
            </select>

            <p className="text-error text-sm">
              {errors.caseId?.message}
            </p>
          </div>

          <div>
            <label className="label">
              <span className="label-text">
                Title
              </span>
            </label>

            <input
              className="input input-bordered w-full"
              {...register("title", {
                required: "Title is required",
              })}
            />

            <p className="text-error text-sm">
              {errors.title?.message}
            </p>
          </div>

          <div>
            <label className="label">
              <span className="label-text">
                Description
              </span>
            </label>

            <textarea
              rows={4}
              className="textarea textarea-bordered w-full"
              {...register("description", {
                required:
                  "Description is required",
              })}
            />

            <p className="text-error text-sm">
              {errors.description?.message}
            </p>
          </div>

        </form>

        <div className="modal-action">

          <button
            className="btn"
            onClick={closeDocumentModal}
          >
            Cancel
          </button>

          <button
            className="btn btn-primary"
            form="document-form"
            type="submit"
            disabled={isLoading}
          >
            {isLoading
              ? "Saving..."
              : selectedDocument
              ? "Update"
              : "Create"}
          </button>

        </div>

      </div>
    </dialog>
  );
};

export default DocumentModal;