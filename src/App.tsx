import styled from 'styled-components';
import PlanningCalendar from './components/PlanningCalendar';

const Container = styled.div`
  margin-inline: auto;
  max-width: 1400px;
`;

function App() {
  return (
    <Container>
      <PlanningCalendar />
    </Container>
  );
}

export default App;
