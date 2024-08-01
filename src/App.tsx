import './App.css';
import styled from 'styled-components';
import { Board } from './Board.tsx';

const GameWrapper = styled('div')`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

function App() {
  return (
    <GameWrapper>
      <Board></Board>
    </GameWrapper>
  );
}

export default App;
