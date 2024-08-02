import './App.css';
import styled from 'styled-components';
import { Board } from './Board.tsx';
import { useConfirm } from './hooks/useConfirm.tsx';

const GameWrapper = styled('div')`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

function App() {
  const { ConfirmComponent } = useConfirm();

  return (
    <>
      <GameWrapper>
        <Board></Board>
      </GameWrapper>
      <ConfirmComponent />
    </>
  );
}

export default App;
