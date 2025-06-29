import { Box, Container } from "@chakra-ui/react";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import {Routes,Route} from 'react-router-dom';
import Navbar from './components/Navbar';
function App() {
  return(
    <Box>
      <Navbar/>
      <Container w='full' py={10}>
        <Routes>
          <Route path="/" element={<HomePage/>}/>
          <Route path="/login" element={<LoginPage/>}/>
          <Route path="register" element={<RegisterPage/>}/>
        </Routes>
      </Container>
    </Box>
  );
}
export default App;
