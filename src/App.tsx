import './App.css';
import styled from 'styled-components';
import { Board } from './Board.tsx';
import { useConfirm } from './hooks/useConfirm.tsx';
import { useAlert } from './hooks/useAlert.tsx';

const GameWrapper = styled('div')`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

function App() {
  const { ConfirmComponent } = useConfirm();
  const { AlertComponent } = useAlert();

  return (
    <>
      <GameWrapper>
        <Board></Board>
      </GameWrapper>
      <ConfirmComponent />
      <AlertComponent />
    </>
  );
}

export default App;
