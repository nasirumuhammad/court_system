import useCaseStore from "../../store/caseStore";

const CasesFilters = () => {
  const {
    search,
    status,
    setSearch,
    setStatus,
  } = useCaseStore();

  return (
    <div className="flex flex-col gap-4 rounded-xl bg-base-100 p-4 shadow sm:flex-row">

      <input
        type="text"
        placeholder="Search cases..."
        className="input input-bordered w-full"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <select
        className="select select-bordered w-full sm:w-60"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      >
        <option value="">All Status</option>
        <option value="Pending">Pending</option>
        <option value="Ongoing">Ongoing</option>
        <option value="Adjourned">Adjourned</option>
        <option value="Completed">Completed</option>
      </select>

    </div>
  );
};

export default CasesFilters;