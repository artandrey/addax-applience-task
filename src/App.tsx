import styled from 'styled-components';
import PlanningCalendar from './components/PlanningCalendar';
import { QueryClient, QueryClientProvider } from 'react-query';

const Container = styled.div`
  margin-inline: auto;
  max-width: 1400px;
`;

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Container>
        <PlanningCalendar />
      </Container>
    </QueryClientProvider>
  );
}

export default App;
