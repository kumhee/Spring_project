import './App.css';
import { Container } from 'react-bootstrap';
import HeaderPage from './components/HeaderPage';
import FooterPage from './components/FooterPage';

function App() {
  return (
    <Container>
      <HeaderPage/>
      <FooterPage/>
    </Container>
  );
}

export default App;
