import './App.css';
import styled from 'styled-components';
import { Board } from './Board.tsx';

const GameWrapper = styled('div')`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const BoardWrapper = styled('div')`
  flex-grow: 1;
  height: 0;
  display: grid;
  grid-template-columns: repeat(16, 1fr);
  grid-template-rows: repeat(9, 1fr);
`;

function App() {
  return (
    <GameWrapper>
      <BoardWrapper>
        <Board></Board>
      </BoardWrapper>
    </GameWrapper>
  );
}

export default App;
