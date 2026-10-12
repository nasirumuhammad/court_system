import { FaSearch, FaUndo } from "react-icons/fa";
import useHearingStore from "../../store/hearingStore";

const HearingsFilters = () => {
  const {
    search,
    setSearch,
    resetFilters,
  } = useHearingStore();

  return (
    <div className="card border border-base-300 bg-base-100 shadow-sm">
      <div className="card-body">

        <div className="grid gap-4 md:grid-cols-[1fr_auto]">

          <label className="input input-bordered flex items-center gap-2">
            <FaSearch className="text-base-content/60" />

            <input
              type="text"
              className="grow"
              placeholder="Search by case title..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />
          </label>

          <button
            className="btn btn-outline"
            onClick={resetFilters}
          >
            <FaUndo />
            Reset
          </button>

        </div>

      </div>
    </div>
  );
};

export default HearingsFilters;