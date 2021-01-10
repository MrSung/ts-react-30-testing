import * as React from "react";
import styled from "styled-components";
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
  const fetchCities = async () => {
    const blob = await fetch(endpoint);
    const data = await blob.json();
    setCities((a) => [...a, ...data]);
  };

  React.useEffect(() => {
    fetchCities();

    return () => {
      setCities([]);
    };
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
    <SearchForm autoComplete="off">
      <SearchInput
        type="text"
        className="search"
        placeholder="City or State"
        value={inputText}
        onChange={handleInputChange}
      />
      <SuggestList>
        {inputText === "" || matchedCities.length === 0 ? (
          <>
            <SuggestItem>Filter for a city</SuggestItem>
            <SuggestItem>or a state</SuggestItem>
          </>
        ) : (
          matchedCities.map((mc, i) => {
            return (
              <SuggestItem key={mc.city + i}>
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
                />
                <Population>${numberWithCommas(mc.population)}</Population>
              </SuggestItem>
            );
          })
        )}
      </SuggestList>
    </SearchForm>
  );
};

const SearchForm = styled.form`
  max-width: 400px;
  margin: 50px auto;

  input {
    width: 100%;
    padding: 20px;
  }
`;

const SearchInput = styled.input`
  margin: 0;
  text-align: center;
  outline: 0;
  border: 10px solid #f7f7f7;
  width: 120%;
  position: relative;
  top: 10px;
  z-index: 2;
  border-radius: 5px;
  font-size: 40px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.12), inset 0 0 2px rgba(0, 0, 0, 0.19);
`;

const SuggestList = styled.ul`
  margin: 8px 0 0;
  padding: 0;
  position: relative;
`;

const SuggestItem = styled.li`
  background: white;
  list-style: none;
  border-bottom: 1px solid #d8d8d8;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.14);
  margin: 0;
  padding: 20px;
  transition: background 0.2s;
  display: flex;
  justify-content: space-between;
  text-transform: capitalize;

  &:nth-of-type(even) {
    transform: perspective(100px) rotateX(3deg) translateY(2px) scale(1.001);
    background: linear-gradient(to bottom, #ffffff 0%, #efefef 100%);
  }

  &:nth-of-type(odd) {
    transform: perspective(100px) rotateX(-3deg) translateY(3px);
    background: linear-gradient(to top, #ffffff 0%, #efefef 100%);
  }

  .hl {
    background: #ffc600;
  }
`;

const Population = styled.span`
  font-size: 15px;
`;
