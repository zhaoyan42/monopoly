import { WorldMap } from './model/Map.ts';
import { Country, countryList } from './model/Country.ts';
import { CountrySquare, EmptySquare } from './Square.tsx';
import { useRef, useState } from 'react';
import { Player } from './model/Player.ts';
import { CountryChain } from './model/CountryChain.ts';
import styled from 'styled-components';
import { useImmer } from 'use-immer';

import { useConfirm } from './hooks/useConfirm.tsx';
import { useOwnedCountriesStore } from './store/ownedCountriesStore.ts';
import { getCountryPrice, getPassagePrice } from './model/CountryPriceMap.ts';
import { useAlert } from './hooks/useAlert.tsx';

const BoardWrapper = styled('div')`
  flex-grow: 1;
  height: 0;
  display: grid;
  grid-template-columns: repeat(16, 1fr);
  grid-template-rows: repeat(9, 1fr);
`;

export function Board() {
  const worldMap = useRef(new WorldMap(countryList));
  const countryChain = useRef(new CountryChain(countryList));

  const [players, setPlayers] = useImmer([
    new Player('#ff0000', countryList[0]),
    new Player('#00ff00', countryList[0]),
    new Player('#0000ff', countryList[0]),
  ]);

  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);

  const { confirm } = useConfirm();
  const { alert } = useAlert();
  const { purchaseCountry, isCountryPurchased, getOwner } =
    useOwnedCountriesStore();

  function getPlayers(country: Country) {
    return players.filter((player) => player.country === country);
  }

  function rollDice() {
    return Math.floor(Math.random() * 6) + 1;
  }

  async function roll() {
    const currentPlayer = players[currentPlayerIndex];
    const steps = rollDice();
    console.log(`%c${steps}`, `color: ${currentPlayer.color};`);

    const targetCountry = countryChain.current.getTargetCountry(
      currentPlayer.country,
      steps,
    );
    setPlayers((draft) => {
      draft[currentPlayerIndex].country = targetCountry;
    });
    setCurrentPlayerIndex((index) => (index + 1) % players.length);

    if (!isCountryPurchased(targetCountry)) {
      if (
        await confirm({
          content: (
            <div>
              <p>
                你想要以${getCountryPrice(targetCountry, 0)}的价格买下
                <span style={{ color: '#FF0000' }}>
                  {targetCountry.name}
                </span>{' '}
                吗?
              </p>
            </div>
          ),
          confirmText: '购买',
          cancelText: '不要',
        })
      ) {
        purchaseCountry(currentPlayer, targetCountry);
        alert({
          content: (
            <div>
              <p>
                <span style={{ color: currentPlayer.color }}>玩家</span>已经以
                <span style={{ color: '#00FF00' }}>
                  ${getCountryPrice(targetCountry, 0)}
                </span>
                的价格购买了
                <span style={{ color: '#FF0000' }}>{targetCountry.name}</span>
              </p>
            </div>
          ),
        });
      } else {
        console.log(
          `%c玩家 ${currentPlayer.color} 选择不买 ${targetCountry.name}`,
          `color: ${currentPlayer.color};`,
        );
      }
    } else {
      const owner = getOwner(targetCountry);
      if (!owner) throw new Error('Country should have an owner');
      if (owner === currentPlayer) {
        alert({
          content: (
            <div>
              <p>
                <span style={{ color: currentPlayer.color }}>玩家</span>自己拥有
                <span style={{ color: '#FF0000' }}>{targetCountry.name}</span>
              </p>
            </div>
          ),
        });
        return;
      }
      alert({
        content: (
          <div>
            <p>
              <span style={{ color: currentPlayer.color }}>玩家</span>需要支付
              <span style={{ color: '#FF0000' }}>
                ${getPassagePrice(targetCountry, 0)}
              </span>
              的租金给
              <span style={{ color: owner.color }}>玩家</span>
            </p>
          </div>
        ),
      });
    }
  }

  return (
    <>
      <BoardWrapper onClick={roll}>
        {Array(9)
          .fill(0)
          .flatMap((_, y) =>
            Array(16)
              .fill(0)
              .map((_, x) => {
                const country = worldMap.current.getCountry(x, y);
                return country ? (
                  <CountrySquare
                    key={`${y}-${x}`}
                    country={country}
                    players={getPlayers(country)}
                  />
                ) : (
                  <EmptySquare key={`${y}-${x}`}></EmptySquare>
                );
              }),
          )}
      </BoardWrapper>
    </>
  );
}
