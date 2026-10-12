import useHearingStore from "../../store/hearingStore";
import useCaseStore from "../../store/caseStore";
import { useForm } from "react-hook-form";
import { useEffect } from "react";

const HearingModal = () => {
  const {
    isHearingModalOpen,
    closeHearingModal,
    selectedHearing,
    createHearing,
    updateHearing,
    selectedCaseId
  } = useHearingStore();

  // We reuse cases from caseStore (for dropdown)
  const { cases, fetchCases } = useCaseStore();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      caseId: "",
      hearingDate: "",
      hearingTime: "",
      courtRoom: "",
      notes: "",
    },
  });
  
useEffect(() => {

  if (selectedCaseId) {
    reset((prev) => ({
      ...prev,
      caseId: selectedCaseId,
    }));
  }
}, [selectedCaseId, reset]);
  // Load cases for dropdown
  useEffect(() => {
    if (isHearingModalOpen) {
      fetchCases();
    }
  }, [isHearingModalOpen]);

  // Reset form when modal closes
  useEffect(() => {
    if (!isHearingModalOpen) {
      reset();
    }
  }, [isHearingModalOpen, reset]);

  // Fill form when editing
  useEffect(() => {
    if (selectedHearing) {
      reset({
        caseId: selectedHearing.caseId?._id || "",
        hearingDate: selectedHearing.hearingDate
          ? selectedHearing.hearingDate.split("T")[0]
          : "",
        hearingTime: selectedHearing.hearingTime,
        courtRoom: selectedHearing.courtRoom,
        notes: selectedHearing.notes || "",
      });
    }
  }, [selectedHearing, reset]);

  const onSubmit = async (data) => {
    try {
      if (selectedHearing) {
        await updateHearing(selectedHearing._id, data);
      } else {
        await createHearing(data);
      }

      reset();
    } catch (error) {
      console.error(error);
    }
  };

  if (!isHearingModalOpen) return null;

  return (
    <dialog className="modal modal-open">
      <div className="modal-box max-w-3xl max-h-[90vh] overflow-y-auto">

        <h3 className="text-2xl font-bold">
          {selectedHearing
            ? "Edit Hearing"
            : "Schedule Hearing"}
        </h3>

        <p className="mt-2 text-base-content/70">
          {selectedHearing
            ? "Update hearing details"
            : "Fill in details to schedule a new hearing"}
        </p>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2"
        >

          {/* Case */}
          <div className="md:col-span-2">
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
              <option value="">Select Case</option>

              {cases.map((c) => (
                <option key={c._id} value={c._id}>
                  {c.caseTitle}
                </option>
              ))}
            </select>

            {errors.caseId && (
              <p className="text-sm text-error mt-1">
                {errors.caseId.message}
              </p>
            )}
          </div>

          {/* Date */}
          <div>
            <label className="label">
              <span className="label-text">
                Hearing Date
              </span>
            </label>

            <input
              type="date"
              className="input input-bordered w-full"
              {...register("hearingDate", {
                required: "Date is required",
              })}
            />

            {errors.hearingDate && (
              <p className="text-sm text-error mt-1">
                {errors.hearingDate.message}
              </p>
            )}
          </div>

          {/* Time */}
          <div>
            <label className="label">
              <span className="label-text">
                Hearing Time
              </span>
            </label>

            <input
              type="time"
              className="input input-bordered w-full"
              {...register("hearingTime", {
                required: "Time is required",
              })}
            />

            {errors.hearingTime && (
              <p className="text-sm text-error mt-1">
                {errors.hearingTime.message}
              </p>
            )}
          </div>

          {/* Court Room */}
          <div>
            <label className="label">
              <span className="label-text">
                Court Room
              </span>
            </label>

            <input
              type="text"
              placeholder="e.g Court 3"
              className="input input-bordered w-full"
              {...register("courtRoom", {
                required: "Court room is required",
              })}
            />

            {errors.courtRoom && (
              <p className="text-sm text-error mt-1">
                {errors.courtRoom.message}
              </p>
            )}
          </div>

          {/* Notes */}
          <div>
            <label className="label">
              <span className="label-text">
                Notes
              </span>
            </label>

            <input
              type="text"
              placeholder="Optional notes"
              className="input input-bordered w-full"
              {...register("notes")}
            />
          </div>

          {/* Actions */}
          <div className="md:col-span-2 flex justify-end gap-3 mt-4 border-t border-base-300 pt-6">

            <button
              type="button"
              className="btn btn-outline"
              onClick={() => {
                reset();
                closeHearingModal();
              }}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="btn btn-primary"
              disabled={isSubmitting}
            >
              {isSubmitting
                ? "Saving..."
                : selectedHearing
                  ? "Update Hearing"
                  : "Schedule Hearing"}
            </button>

          </div>

        </form>

      </div>
    </dialog>
  );
};

export default HearingModal;