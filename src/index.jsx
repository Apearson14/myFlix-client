
import { createRoot } from 'react-dom/client';
import { MainView } from './components/MainView/MainView';
import Container from "react-bootstrap/Container";

// Import statement to indicate that you need to bundle `./index.scss`
import "./index.scss";


    const MyFlixApplication = () => {
        return(
        <Container>
        <MainView />
        </Container>
        );
      };


const container = document.querySelector("#root");
const root = createRoot(container);


root.render(<MyFlixApplication />);