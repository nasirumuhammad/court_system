import useDocumentStore from "../../store/documentStore";

const DocumentsFilters = () => {
  const {
    search,
    setSearch,
    resetFilters,
  } = useDocumentStore();

  return (
    <div className="card bg-base-100 shadow">
      <div className="card-body">

        <div className="flex flex-col gap-4 md:flex-row">

          <input
            type="text"
            placeholder="Search documents..."
            className="input input-bordered flex-1"
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />

          <button
            className="btn btn-outline"
            onClick={resetFilters}
          >
            Reset
          </button>

        </div>

      </div>
    </div>
  );
};

export default DocumentsFilters;