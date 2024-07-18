import { BrowserRouter, Routes, Route } from 'react-router-dom'

// pages and components
import Home from './pages/Home'
import Stopwatch from './components/Stopwatch';
import Scramble from './components/Scramble';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div className='pages'>
          <Routes>
            <Route 
              path='/'
              element={ <Home /> }
            />
          </Routes>

          <Scramble />
          <Stopwatch />
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;