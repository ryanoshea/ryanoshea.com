import React from 'react';
import './App.scss';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Nameplate from './Components/Nameplate/Nameplate';
import Footer from './Components/Footer/Footer';
import Home from './Components/Home/Home';

function App() {
    return (
        <Router>
            <main>
                <div id='main' role='main'>
                    <article>
                        <Nameplate />
                        <div id='content'>
                            <Switch>
                                <Route path='/' exact>
                                    <Home />
                                </Route>
                                <Route path='*'>404</Route>
                            </Switch>
                        </div>
                    </article>
                </div>
            </main>

            <Footer />
        </Router>
    );
}

export default App;
