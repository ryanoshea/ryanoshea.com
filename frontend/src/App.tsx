import './App.scss';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Nameplate from './Components/Nameplate/Nameplate';
import Footer from './Components/Footer/Footer';
import Home from './Components/Home/Home';
import NotFound from './Components/404/404';

const App = () => {
    return (
        <Router>
            <div className='scroll-body'>
                <main role='main'>
                    <article className='limit-width'>
                        <Nameplate />
                        <div className='text-content router-body'>
                            <Switch>
                                <Route path='/' exact>
                                    <Home />
                                </Route>
                                <Route path='*'>
                                    <NotFound />
                                </Route>
                            </Switch>
                        </div>
                    </article>
                </main>
            </div>

            <Footer />
        </Router>
    );
};

export default App;
