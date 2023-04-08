import { useEffect, useState } from 'react';
import './Biography.scss';
import { getUrl } from '../../Utils/api';

const Biography = () => {
    // Fetch info on the last updated date for the resume
    let [resumeInfo, setResumeInfo] = useState<{ date: string; url: string } | undefined>();
    let [resumeInfoError, setResumeInfoError] = useState(false);
    useEffect(() => {
        fetch(getUrl('/api/github/resume-info'))
            .then(rs => {
                if (!rs.ok) throw new Error(rs.statusText);
                return rs.json();
            })
            .then(info => setResumeInfo(info))
            .catch(e => {
                setResumeInfoError(true);
                console.error(e);
            });
    }, []);

    const formatResumeDate = (isoDate: string | undefined) => {
        if (isoDate) {
            const date = new Date(isoDate);
            return new Intl.DateTimeFormat('en-US', {
                month: 'long',
                year: 'numeric',
            }).format(date);
        }

        return null;
    };

    return (
        <article className='biography'>
            <h2 className='intro-lines'>
                <p id='line1'>I’m a full-stack software engineer based in Boston.</p>
                <p id='line2'>I build scalable, maintainable, and well-tested systems from the ground up.</p>
                <p id='line3'>I like learning from peers and teaching what works.</p>
                <p id='line4'>Say hello if you’d like to chat or work together.</p>
            </h2>

            <div className='resume'>
                <a href='/contact/resume.pdf' className='resume-link' target='_blank' rel='noopener noreferrer'>
                    Résumé &nbsp;<i className='far fa-file-alt'></i>
                </a>{' '}
                {!resumeInfoError && (
                    <em className='resume-timestamp'>
                        Last updated{' '}
                        {resumeInfo ? (
                            <a className='nocolor' href={resumeInfo.url} target='_blank' rel='noopener noreferrer'>
                                {formatResumeDate(resumeInfo.date)}
                            </a>
                        ) : (
                            <span className='resume-timestamp-loading'>
                                <i className='fas fa-sync fa-spin' aria-hidden='true'></i>
                            </span>
                        )}
                        .
                    </em>
                )}
            </div>

            <p>
                Since 2020, I’ve been a tech lead, then Staff Engineer, on{' '}
                <a href='https://www.chewy.com' target='_blank' rel='noopener noreferrer'>
                    Chewy’s
                </a>{' '}
                <a href='https://www.chewy.com/app/buy-from-your-vet' target='_blank' rel='noopener noreferrer'>
                    Pet Health
                </a>{' '}
                and{' '}
                <a href='https://www.chewy.com/pet-insurance' target='_blank' rel='noopener noreferrer'>
                    Pet Insurance
                </a>{' '}
                teams, leading the delivery of e-commerce features at scale with EKS-hosted Spring Boot microservices and React SPAs.
            </p>

            <p>
                Until the pandemic, I spent a brief while at{' '}
                <a href='https://pos.toasttab.com' target='_blank' rel='noopener noreferrer'>
                    Toast
                </a>{' '}
                building React apps backed by Java microservices and DynamoDB.
            </p>

            <p>
                Before that, I spent 4 years at{' '}
                <a href='https://composableanalytics.com' target='_blank' rel='noopener noreferrer'>
                    Composable Analytics
                </a>{' '}
                leading a team designing, bootstrapping, and implementing their one-of-a-kind enterprise data
                orchestration platform on .NET, SQL Server, and AngularJS.
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
                was a scalable network of temperature sensors for monitoring data center climates. Projects:{' '}
                <a href='https://github.com/ryanoshea/car-lab' target='_blank' rel='noopener noreferrer'>
                    Car Lab
                </a>
                ,{' '}
                <a href='https://github.com/ryanoshea/poll-princeton' target='_blank' rel='noopener noreferrer'>
                    PollPrinceton
                </a>
                .
            </p>
        </article>
    );
};

export default Biography;
