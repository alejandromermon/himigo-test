import { useRouter } from "next/router";
import { useQuery, gql } from "@apollo/client";
import Head from "next/head";

const COUNTRY_DETAILS_QUERY = gql`
  query GetCountryDetails($code: ID!) {
    country(code: $code) {
      code
      name
      capital
      currencies
      emoji
      continent {
        name
      }
      languages {
        code
        name
      }
    }
  }
`;

export default function CountryDetails() {
  const router = useRouter();
  const { code } = router.query;

  const { data, loading, error } = useQuery(COUNTRY_DETAILS_QUERY, {
    variables: { code },
    skip: !code, // Skip query if code isn't available
  });

  // Show loading state if `code` is not yet available or the query is loading
  if (!code || loading) {
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
        <div className="flex flex-col items-center justify-center space-x-4">
          <pre className="text-red-500">{error.message}</pre>
          <div className="mt-6 text-center">
            <button
              onClick={() => router.push("/")}
              className="px-4 py-2 bg-black text-white rounded-md hover:bg-black/90 transition ease-in-out duration-200"
            >
              Home
            </button>
          </div>
        </div>
      </main>
    );
  }

  if (!data || !data.country) {
    return (
      <main className="bg-[#CFF80A] min-h-screen w-full p-6 flex justify-center items-center">
        <div className="flex flex-col items-center space-x-4">
          <div className="text-xl text-gray-700">Country not found</div>
          <div className="mt-6 text-center">
            <button
              onClick={() => router.push("/")}
              className="px-4 py-2 bg-black text-white rounded-md hover:bg-black/90 transition ease-in-out duration-200"
            >
              Home
            </button>
          </div>
        </div>
      </main>
    );
  }

  const { country } = data;

  return (
    <main className="bg-[#CFF80A] min-h-screen w-full p-6 flex justify-center items-center">
      <Head>
        <title>
          {country.name} {country.emoji}
        </title>
      </Head>
      <div className="space-y-4 max-w-4xl w-full">
        <div className="space-y-4">
          <h1 className="text-3xl font-bold text-center text-black">
            {country.name} {country.emoji}
          </h1>
          <p className="text-xl font-semibold text-[#330AF8]">
            Capital:{" "}
            <span className="text-lg text-black">{country.capital}</span>
          </p>
          <p className="text-xl font-semibold text-[#330AF8]">
            Continent:{" "}
            <span className="text-lg text-black">{country.continent.name}</span>
          </p>

          <div>
            <p className="text-xl font-semibold text-[#330AF8] mb-1.5">
            Currencies:
            </p>
            <ul className="list-disc pl-8 space-y-2 list-inside">
              {country.currencies && country.currencies.length > 0 ? (
                country.currencies.map(
                  (currency: string) => (
                    <li key={currency} className="text-lg text-black">
                      {currency}
                    </li>
                  )
                )
              ) : (
                <p className="text-gray-500">No currency available</p>
              )}
            </ul>
          </div>

          <div>
            <p className="text-xl font-semibold text-[#330AF8] mb-1.5">
              Languages:
            </p>
            <ul className="list-disc pl-8 space-y-2 list-inside">
              {country.languages && country.languages.length > 0 ? (
                country.languages.map(
                  (language: { code: string; name: string }) => (
                    <li key={language.code} className="text-lg text-black">
                      {language.name}
                    </li>
                  )
                )
              ) : (
                <p className="text-gray-500">No languages available</p>
              )}
            </ul>
          </div>

          <div className="mt-6 text-center">
            <button
              onClick={() => router.push("/")}
              className="px-4 py-2 bg-black text-white rounded-md hover:bg-black/90 transition ease-in-out duration-200"
            >
              Back
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
