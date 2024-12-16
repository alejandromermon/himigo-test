import { useEffect, useState } from "react";

export default function SearchBar({
  value,
  onSearch,
}: {
  value: string;
  onSearch: (value: string) => void;
}) {
  const [searchValue, setSearchValue] = useState(value);

  useEffect(() => {
    setSearchValue(value);
  }, [value]);

  const handleClear = () => {
    setSearchValue("");
    onSearch("");
  };

  return (
    <div className="relative w-full max-w-md mx-auto">
      <input
        type="text"
        value={searchValue}
        onChange={(e) => {
          const value = e.target.value;
          setSearchValue(value);
          onSearch(value);
        }}
        placeholder="Search country"
        className="w-full p-4 pl-8 rounded-lg shadow-lg bg-white text-gray-800 border border-[#CFF80A] focus:outline-none focus:ring-2 focus:ring-[#CFF80A] focus:border-transparent transition duration-300 ease-in-out"
      />
      {searchValue && (
        <button
          onClick={handleClear}
          aria-label="Clear search"
          className="absolute top-1/2 right-3 transform -translate-y-1/2 text-[#CFF80A] hover:text-[#F4E04D] transition duration-200"
        >
          ✕
        </button>
      )}
    </div>
  );
}
