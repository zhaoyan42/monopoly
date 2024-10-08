import './App.css';
import styled from 'styled-components';
import { Board } from './Board.tsx';
import { useConfirm } from './hooks/useConfirm.tsx';
import { useAlert } from './hooks/useAlert.tsx';
import { useImmer } from 'use-immer';
import { Player } from './model/Player.ts';
import { countryList } from './model/Country.ts';
import {
  createConfirmContent,
  createOwnAlertContent,
  createPurchaseAlertContent,
  createRentAlertContent,
} from './utils/contentFactory.tsx';
import { useOwnedCountriesStore } from './store/ownedCountriesStore.ts';
import { useRef, useState } from 'react';
import { CountryChain } from './model/CountryChain.ts';
import { DiceRoller } from './components/dice/DiceRoller.tsx';

const GameWrapper = styled('div')`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

function App() {
  const countryChain = useRef(new CountryChain(countryList));

  const [rolling, setRolling] = useState(false);

  const { ConfirmComponent } = useConfirm();
  const { AlertComponent } = useAlert();

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

  function roll() {
    setRolling(true);
  }

  async function go(steps: number) {
    const currentPlayer = players[currentPlayerIndex];
    console.log(`%c${steps}`, `color: ${currentPlayer.color};`);

    const targetCountry = countryChain.current.getTargetCountry(
      currentPlayer.country,
      steps,
    );
    setPlayers((draft) => {
      draft[currentPlayerIndex].country = targetCountry;
    });

    if (!isCountryPurchased(targetCountry)) {
      if (
        await confirm({
          content: createConfirmContent(targetCountry),
          confirmText: '购买',
          cancelText: '不要',
        })
      ) {
        purchaseCountry(currentPlayer, targetCountry);
        alert({
          content: createPurchaseAlertContent(currentPlayer, targetCountry),
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
          content: createOwnAlertContent(currentPlayer, targetCountry),
        });
      } else {
        alert({
          content: createRentAlertContent(currentPlayer, targetCountry, owner),
        });
      }
    }

    setCurrentPlayerIndex((index) => (index + 1) % players.length);
  }

  return (
    <>
      {rolling ? (
        <DiceRoller
          onSettled={(points) => {
            setRolling(false);
            void go(points);
          }}
        />
      ) : null}
      <ConfirmComponent />
      <AlertComponent />
      <GameWrapper>
        <Board
          players={players}
          currentPlayerIndex={currentPlayerIndex}
          onClick={roll}
        />
      </GameWrapper>
    </>
  );
}

export default App;
