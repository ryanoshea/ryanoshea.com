import React from 'react';
import { Link } from 'react-router-dom';
import './Nameplate.scss';

const Nameplate = () => (
    <div id='left'>
        <h1>
            <Link to='/' className='nocolor nohover'>
                Ryan<strong>O’Shea</strong>
            </Link>
        </h1>
    </div>
);

export default Nameplate;
