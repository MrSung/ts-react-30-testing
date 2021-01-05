import * as React from "react";
import "./style.css";

export const endpoint =
  "https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json";

export interface ICity {
  city: string;
  growth_from_2000_to_2013: string;
  latitude: number;
  longitude: number;
  population: string;
  rank: string;
  state: string;
}

type Cities = ICity[];

export interface IUserFetchCitiesReturnType {
  cities: Cities;
}

export const useFetchCities = (): IUserFetchCitiesReturnType => {
  const [cities, setCities] = React.useState([]);

  React.useEffect(() => {
    fetch(endpoint)
      .then((blob) => blob.json())
      .then((data) => {
        setCities((a) => [...a, ...data]);
      });
  }, [setCities]);

  return {
    cities,
  };
};

const findMatches = (wordToMatch: string, cities: Cities) =>
  cities.filter(({ city, state }) => {
    const regex = new RegExp(wordToMatch, "gi");
    return city.match(regex) || state.match(regex);
  });
const numberWithCommas = (x: string) =>
  x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

export const TypeAhead: React.FC = () => {
  const [inputText, setInputText] = React.useState("");
  const { cities } = useFetchCities();
  const inputTextRegExp = new RegExp(inputText, "gi");
  const matchedCities = React.useMemo(() => findMatches(inputText, cities), [
    inputText,
    cities,
  ]);

  const handleInputChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(ev.target.value);
  };

  return (
    <form className="search-form" autoComplete="off">
      <input
        type="text"
        className="search"
        placeholder="City or State"
        value={inputText}
        onChange={handleInputChange}
      />
      <ul className="suggestions">
        {inputText === "" || matchedCities.length === 0 ? (
          <>
            <li>Filter for a city</li>
            <li>or a state</li>
          </>
        ) : (
          matchedCities.map((mc, i) => {
            return (
              <li key={mc.city + i}>
                <span
                  className="name"
                  dangerouslySetInnerHTML={{
                    __html:
                      mc.city.replace(
                        inputTextRegExp,
                        `<span class="hl">${inputText}</span>`,
                      ) +
                      ", " +
                      mc.state.replace(
                        inputTextRegExp,
                        `<span class="hl">${inputText}</span>`,
                      ),
                  }}
                >
                  {/* {mc.city}, {mc.state} */}
                </span>
                <span className="population">
                  ${numberWithCommas(mc.population)}
                </span>
              </li>
            );
          })
        )}
      </ul>
    </form>
  );
};
