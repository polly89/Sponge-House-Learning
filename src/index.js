import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home';
import Auth from './pages/Auth';
import Game from './pages/Game';
import CreateGame from './pages/CreateGame';

export default function App (){
    return (
        <BrowserRouter>
            <Routes>
                <Route index element ={<Home />}/>
                <Route path='/auth' element={<Auth/>}/>
                {/* <Route path='/auth' render={()=>(!this.state.isLoggedIn ? <Auth/> : <Navigate to='/createGame'/>)}/> */}
                <Route path='/createGame' element={<CreateGame/>}/>
                <Route path='/game/:id' element={<Game/>}/>
            </Routes>
        </BrowserRouter>
    );
}
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);