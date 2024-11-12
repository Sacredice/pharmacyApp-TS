import { FaSearch } from "react-icons/fa"

interface PropsType {
  search: string,
  setSearch: React.Dispatch<React.SetStateAction<string>>,
}

function SearchBar({ search, setSearch}: PropsType) {
  return (
    <div>
      <form className='searchForm' onSubmit={(e) => e.preventDefault()}>
        <input
          className="searchBar"
          type="text"
          placeholder='Listede Ara'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          autoFocus
        />
        <button>
          <FaSearch className="searchIcon" />
        </button>
      </form>
    </div>
  )
}

export default SearchBar
