import { FaSearch } from "react-icons/fa"

interface PropsType {
  search: string,
  setSearch: React.Dispatch<React.SetStateAction<string>>,
}

function SearchBar({ search, setSearch }: PropsType) {
  return (
    <div className="flex justify-center my-3">
      <form className="flex w-full" onSubmit={(e) => e.preventDefault()}>
        <input
          className="text-lg p-1 border border-black rounded grow"
          type="text"
          placeholder='Listede Ara'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          autoFocus
        />
        <button className="flex bg-gray-300 ml-1 w-[38px] h-[38px] justify-center items-center border border-black rounded">
          <FaSearch />
        </button>
      </form>
    </div>
  )
}

export default SearchBar
