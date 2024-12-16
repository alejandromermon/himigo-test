import { useRouter } from "next/router";
import { useQuery, gql } from "@apollo/client";
import { useState, useEffect } from "react";
import SearchBar from "@/components/searchBar";

const COUNTRY_QUERY = gql`
  query GetAllCountries {
    countries {
      code
      name
      continent {
        name
      }
    }
  }
`;

export default function Home() {
  const router = useRouter();
  const [searchVal, setsearchVal] = useState("");

  useEffect(() => {
    setsearchVal(localStorage.getItem("lastQuery") || "");
  }, []);

  const { data, loading, error } = useQuery(COUNTRY_QUERY);
  if (loading) {
    return (
      <main className="bg-[#CFF80A] min-h-screen w-full p-6 flex justify-center items-center">
        <div className="flex items-center justify-center space-x-4">
          <div className="animate-spin rounded-full border-t-4 border-blue-500 w-16 h-16"></div>
          <div className="text-xl text-gray-700">Loading...</div>
        </div>
      </main>
    );
  }
  if (error) {
    return (
      <main className="bg-[#CFF80A] min-h-screen w-full p-6 flex justify-center items-center">
        <div className="flex items-center justify-center space-x-4">
          <pre className="text-red-500">{error.message}</pre>
        </div>
      </main>
    );
  }

  const handleCountryClick = (code: string) => {
    router.push(`/country/${code}`);
  };

  // Filter countries based on the search query
  const filteredCountries = data.countries.filter((country: { name: string }) =>
    country.name.toLowerCase().includes(searchVal.toLowerCase())
  );

  return (
    <main className="bg-[#CFF80A] min-h-screen w-full p-6 flex justify-center items-center">
      <div className="space-y-4 max-w-5xl w-full">
        <h1 className="text-4xl font-extrabold text-center mb-8 text-[#1C3D50]">
          Countries
        </h1>
        {/* SearchBar component */}
        <SearchBar
          onSearch={(value: string) => {
            setsearchVal(value);
            localStorage.setItem("lastQuery", value);
          }}
        />

        {/* Country List */}
        <ol className="mt-6 space-y-4">
          {filteredCountries.map((country: { code: string; name: string }) => (
            <li
              key={country.code}
              className="p-6 bg-white text-gray-800 rounded-xl cursor-pointer hover:bg-[#F4E04D] transition duration-200 ease-in-out transform hover:scale-105"
              onClick={() => handleCountryClick(country.code)}
            >
              <strong className="text-lg font-semibold">{country.code}</strong>:{" "}
              {country.name}
            </li>
          ))}
        </ol>

        {filteredCountries.length === 0 && (
          <p className="text-center text-gray-600 mt-6">No countries found</p>
        )}
      </div>
    </main>
  );
}
