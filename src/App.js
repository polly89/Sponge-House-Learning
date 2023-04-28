import {
    BrowserRouter,
    Routes,
    Route
  } from 'react-router-dom'

import Home from './pages/Home';
import Auth from './pages/Auth';
import Game from './pages/Game';
import CreateGame from './pages/CreateGame';

function App (){
    return (
        
            <BrowserRouter>
                <Routes>
                    <Route index element ={<Home />}/>
                    <Route exact path='/auth' element={<Auth/>}/>
                    <Route exact path='/createGame' element={<CreateGame/>}/>
                    <Route exact path='/game/:id' element={<Game/>}/>
                </Routes>
            </BrowserRouter>
        
    );
}
export default App;