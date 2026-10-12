import { useEffect } from "react";
import { useForm } from "react-hook-form";

import useCaseStore from "../../store/caseStore";
import useUserStore from "../../store/userStore";

const CaseModal = () => {
  const {
    judges,
    lawyers,
    fetchJudges,
    fetchLawyers,
  } = useUserStore();

  const {
    isCaseModalOpen,
    closeCaseModal,
    selectedCase,
    createCase,
    updateCase,
    isLoading,
  } = useCaseStore();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      caseTitle: "",
      caseType: "",
      plaintiff: "",
      defendant: "",
      assignedJudge: "",
      assignedLawyer: "",
      status: "Pending",
    },
  });

  useEffect(() => {
    if (!isCaseModalOpen) {
      reset();
    }
  }, [isCaseModalOpen, reset]);

  useEffect(() => {
    if (isCaseModalOpen) {
      fetchJudges();
      fetchLawyers();
    }
  }, [
    isCaseModalOpen,
    fetchJudges,
    fetchLawyers,
  ]);
  
  useEffect(() => {
    if (selectedCase) {
      reset({
        caseTitle: selectedCase.caseTitle,
        caseType: selectedCase.caseType,
        plaintiff: selectedCase.plaintiff,
        defendant: selectedCase.defendant,
        assignedJudge:
          selectedCase.assignedJudge?._id || "",
        assignedLawyer:
          selectedCase.assignedLawyer?._id || "",
        status: selectedCase.status,
      });
    }
  }, [selectedCase, reset]);

  const onSubmit = async (data) => {
    try {
      if (selectedCase) {
        await updateCase(selectedCase._id, data);
      } else {
        await createCase(data);
      }

      reset();
    } catch (error) {
      console.error(error);
    }
  };

  if (!isCaseModalOpen) return null;

  return (
    <dialog className="modal modal-open">
      <div className="modal-box max-w-3xl max-h-[90vh] overflow-y-auto">
        <h3 className="text-2xl font-bold">
          {selectedCase
            ? "Edit Case"
            : "Create New Case"}
        </h3>

        <p className="mt-2 text-base-content/70">
          {selectedCase
            ? "Update the case information."
            : "Fill in the details below to create a new case."}
        </p>

        <div className="py-6">
          <form
            id="case-form"
            onSubmit={handleSubmit(onSubmit)}
            className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2"
          >
            {/* Case Title */}
            <div className="md:col-span-2">
              <label className="label">
                <span className="label-text">
                  Case Title
                </span>
              </label>

              <input
                type="text"
                className="input input-bordered w-full"
                {...register("caseTitle", {
                  required: "Case title is required",
                })}
              />

              {errors.caseTitle && (
                <p className="mt-1 text-sm text-error">
                  {errors.caseTitle.message}
                </p>
              )}
            </div>

            {/* Case Type */}
            <div className="md:col-span-2">
              <label className="label">
                <span className="label-text">
                  Case Type
                </span>
              </label>

              <select
                className="select select-bordered w-full"
                {...register("caseType", {
                  required: "Case type is required",
                })}
              >
                <option value="">
                  Select Case Type
                </option>
                <option value="Civil">
                  Civil
                </option>
                <option value="Criminal">
                  Criminal
                </option>
                <option value="Family">
                  Family
                </option>
                <option value="Commercial">
                  Commercial
                </option>
                <option value="Property">
                  Property
                </option>
                <option value="Labour">
                  Labour
                </option>
                <option value="Other">
                  Other
                </option>
              </select>

              {errors.caseType && (
                <p className="mt-1 text-sm text-error">
                  {errors.caseType.message}
                </p>
              )}
            </div>

            {/* Plaintiff */}
            <div>
              <label className="label">
                <span className="label-text">
                  Plaintiff
                </span>
              </label>

              <input
                type="text"
                className="input input-bordered w-full"
                {...register("plaintiff", {
                  required: "Plaintiff is required",
                })}
              />

              {errors.plaintiff && (
                <p className="mt-1 text-sm text-error">
                  {errors.plaintiff.message}
                </p>
              )}
            </div>

            {/* Defendant */}
            <div>
              <label className="label">
                <span className="label-text">
                  Defendant
                </span>
              </label>

              <input
                type="text"
                className="input input-bordered w-full"
                {...register("defendant", {
                  required: "Defendant is required",
                })}
              />

              {errors.defendant && (
                <p className="mt-1 text-sm text-error">
                  {errors.defendant.message}
                </p>
              )}
            </div>

            {/* Assigned Judge */}
            <div>
              <label className="label">
                <span className="label-text">
                  Assigned Judge
                </span>
              </label>

              <select
                className="select select-bordered w-full"
                {...register("assignedJudge")}
              >
                <option value="">
                  Select Judge
                </option>

                {judges.map((judge) => (
                  <option
                    key={judge._id}
                    value={judge._id}
                  >
                    {judge.fullName}
                  </option>
                ))}
              </select>
            </div>

            {/* Assigned Lawyer */}
            <div>
              <label className="label">
                <span className="label-text">
                  Assigned Lawyer
                </span>
              </label>

              <select
                className="select select-bordered w-full"
                {...register("assignedLawyer")}
              >
                <option value="">
                  Select Lawyer
                </option>

                {lawyers.map((lawyer) => (
                  <option
                    key={lawyer._id}
                    value={lawyer._id}
                  >
                    {lawyer.fullName}
                  </option>
                ))}
              </select>
            </div>

            {/* Status */}
            {selectedCase && (
              <div className="md:col-span-2">
                <label className="label">
                  <span className="label-text">
                    Status
                  </span>
                </label>

                <select
                  className="select select-bordered w-full"
                  {...register("status")}
                >
                  <option value="Pending">
                    Pending
                  </option>
                  <option value="Ongoing">
                    Ongoing
                  </option>
                  <option value="Adjourned">
                    Adjourned
                  </option>
                  <option value="Completed">
                    Completed
                  </option>
                </select>
              </div>
            )}
          </form>
        </div>

        <div className="modal-action mt-8 border-t border-base-300 pt-6">
          <button
            type="button"
            className="btn btn-outline"
            onClick={() => {
              reset();
              closeCaseModal();
            }}
          >
            Cancel
          </button>

          <button
            type="submit"
            form="case-form"
            className="btn btn-primary"
            disabled={isLoading}
          >
            {isLoading
              ? "Saving..."
              : selectedCase
              ? "Update Case"
              : "Create Case"}
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default CaseModal;