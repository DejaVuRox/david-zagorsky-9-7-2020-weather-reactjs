import React from 'react';
import './App.css';
import {Route} from "react-router";
import Home from "./pages/home/Home";
import Favorites from "./pages/favorites/Favorites";

function App() {
    const lightTheme = 'linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%)'
    return (
        <div className="App" style={{
            backgroundImage: lightTheme
        }}>
            <Route exact path={'/'} render={() => <Home/>}/>
            <Route exact path={'/favorites'} render={() => <Favorites/>}/>
        </div>
    );
}

export default App;
