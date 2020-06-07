import React from 'react';
import './Biography.scss';

const Biography = () => (
    <div className='biography'>
        <h2 className='intro-lines'>
            <p id='line1'>I’m a full-stack software engineer based in Boston.</p>
            <p id='line2'>I build user-facing products and core infrastructure from the ground up.</p>
            <p id='line3'>I like writing apps, designing user experiences, and taking photos on the side.</p>
            <p id='line4'>Say hello if you’d like to chat or work together.</p>
        </h2>

        <div id='resume'>
            <a href='/contact/resume.pdf' className='resume-link' target='_blank' rel='noopener noreferrer'>
                Résumé &nbsp;<i className='far fa-file-alt'></i>
            </a>
        </div>

        <p>
            I recently started a new senior software engineering position on{' '}
            <a href='https://chewy.com' target='_blank' rel='noopener noreferrer'>
                Chewy’s
            </a>{' '}
            Pet Health team.
        </p>

        <p>
            Until the COVID-19 pandemic hit the restaurant industry, I spent a brief while at{' '}
            <a href='https://pos.toasttab.com' target='_blank' rel='noopener noreferrer'>
                Toast
            </a>{' '}
            building React apps backed by Java microservices and DynamoDB.
        </p>

        <p>
            Previously, I spent 4 years at{' '}
            <a href='https://composableanalytics.com' target='_blank' rel='noopener noreferrer'>
                Composable Analytics
            </a>{' '}
            leading a team designing, bootstrapping, and implementing their one-of-a-kind enterprise data orchestration
            platform on .NET, SQL Server, and AngularJS.
        </p>

        <p>
            In 2016, I graduated cum laude from{' '}
            <a href='https://princeton.edu' target='_blank' rel='noopener noreferrer'>
                Princeton University
            </a>{' '}
            with a <abbr title='Bachelor of Science in Engineering'>B.S.E.</abbr> in Electrical Engineering and a{' '}
            <abbr title='a minor'>certificate</abbr> in Computer Science. My{' '}
            <a
                href="https://github.com/ryanoshea/data-center-monitoring/blob/master/report-roshea/O'Shea_Ryan_Thesis.pdf"
                target='_blank'
                rel='noopener noreferrer'
            >
                senior thesis
            </a>{' '}
            was a scalable network of temperature sensors for monitoring data center climates. Interesting projects:{' '}
            <a href='https://github.com/ryanoshea/car-lab' target='_blank' rel='noopener noreferrer'>
                Car Lab
            </a>
            ,{' '}
            <a href='https://github.com/ryanoshea/poll-princeton' target='_blank' rel='noopener noreferrer'>
                PollPrinceton
            </a>
            .
        </p>

        <p>
            Way back, I interned at{' '}
            <a href='https://robotics.vecna.com/' target='_blank' rel='noopener noreferrer'>
                Vecna Technologies
            </a>{' '}
            and{' '}
            <a href='https://business.comcast.com' target='_blank' rel='noopener noreferrer'>
                Comcast
            </a>
            .
        </p>
    </div>
);

export default Biography;
