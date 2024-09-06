import './App.css'
import Manager from './Components/Manager'
import Home from './Components/Home'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <>
      <BrowserRouter>
          <Routes>    
            <Route path="/manager" element={<Manager />} />
            <Route path="/" element={<Home />} />
          </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;
