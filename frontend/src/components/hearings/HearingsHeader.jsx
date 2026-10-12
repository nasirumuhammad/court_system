import { FaPlus } from "react-icons/fa6";
import useHearingStore from "../../store/hearingStore";

const HearingsHeader = () => {
  const { openHearingModal } = useHearingStore();

  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

      <div>
        <h1 className="text-3xl font-bold">
          Hearings
        </h1>

        <p className="mt-2 text-base-content/70">
          Schedule and manage court hearings.
        </p>
      </div>

      <button
        className="btn btn-primary"
        onClick={() => openHearingModal()}
      >
        <FaPlus />
        Schedule Hearing
      </button>

    </div>
  );
};

export default HearingsHeader;