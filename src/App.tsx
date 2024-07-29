import { useState } from 'react';
import './App.css';
import styled from 'styled-components';
import { CountryChain } from './model/CountryChain.ts';
import { WorldMap } from './model/Map.ts';
import { countryList } from './model/Country.ts';

const GameWrapper = styled('div')`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const GamePanel = styled('div')`
  flex-grow: 1;
  height: 0;
  display: grid;
  grid-template-columns: repeat(16, 1fr);
  grid-template-rows: repeat(9, 1fr);
`;

const CountryTile = styled('div')`
  background-color: #f0f0f0;
  border-radius: 8px;
  padding: 8px;
  margin: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

const EmptyTile = styled('div')`
  background-color: #ffffff;
  border-radius: 8px;
  padding: 8px;
  margin: 8px;
  overflow: hidden;
`;

function App() {
  const worldMap = new WorldMap(countryList);
  console.log(worldMap);
  const elements = Array(9)
    .fill(0)
    .flatMap((_, y) =>
      Array(16)
        .fill(0)
        .map((_, x) => {
          const country = worldMap.getCountry(x, y);
          return country ? (
            <CountryTile key={`${y}-${x}`}>
              {country.name.substring(0, 1)}
            </CountryTile>
          ) : (
            <EmptyTile key={`${y}-${x}`}></EmptyTile>
          );
        }),
    );
  console.log(elements);
  return (
    <GameWrapper>
      <GamePanel>{elements}</GamePanel>
    </GameWrapper>
  );
}

export default App;
