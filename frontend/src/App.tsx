import React, { useRef } from 'react';
import './App.scss';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Nameplate from './Components/Nameplate/Nameplate';
import Footer from './Components/Footer/Footer';
import Home from './Components/Home/Home';
import NotFound from './Components/404/404';

const App = () => {
    const article = useRef<HTMLDivElement>(null);
    const contentColumn = useRef<HTMLDivElement>(null);
    return (
        <Router>
            <main>
                <div id='main' role='main'>
                    <article ref={article}>
                        <Nameplate />
                        <div id='content' ref={contentColumn}>
                            <Switch>
                                <Route path='/' exact>
                                    <Home container={article} contentColumn={contentColumn} />
                                </Route>
                                <Route path='*'>
                                    <NotFound />
                                </Route>
                            </Switch>
                        </div>
                    </article>
                </div>
            </main>

            <Footer />
        </Router>
    );
};

export default App;
