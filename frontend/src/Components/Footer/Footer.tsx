import React from 'react';
import './Footer.scss';

const Footer = () => (
    <footer>
        <div className='footer-content'>
            <p>
                <a
                    href='https://github.com/ryanoshea/ryanoshea.com'
                    className='nocolor'
                    target='_blank'
                    rel='noopener noreferrer'
                >
                    see the code for this site on github <i className='fab fa-github'></i>
                </a>
            </p>
            <p>
                Contact me at <span className='dummy'>asdfas</span>ry<span className='dummy'>asdfas</span>an@
                <span className='dummy'>7jt30h</span>ryanosh<span className='dummy'>asdfas</span>ea.com (
                <a
                    href='http://pgp.mit.edu/pks/lookup?op=get&search=0x3BE538A4E17D2A03'
                    className='nocolor'
                    target='_blank'
                    rel='noopener noreferrer'
                >
                    PGP key
                </a>
                ).
            </p>
        </div>
    </footer>
);

export default Footer;
