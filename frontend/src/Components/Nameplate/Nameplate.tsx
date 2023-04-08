import { Link } from 'react-router-dom';
import './Nameplate.scss';
import headshot from '../../Static/headshot.jpg';

const Nameplate = () => (
    <div id='left'>
        <h1>
            <Link to='/' className='nocolor nohover'>
                Ryan<strong>O’Shea</strong>
            </Link>
        </h1>
        <div className="headshot-container">
            <div className="headshot-mask">
                <img className='headshot' src={headshot} alt='My face'/>
            </div>
        </div>
    </div>
);

export default Nameplate;
