import React, { useReducer, useEffect } from 'react';
import classNames from 'classnames';
import { AppReducer, ACTIONS, AppState, Photo, PhotosState } from '../../State/AppState';
import PhotosFoldout from '../PhotosFoldout/PhotosFoldout';

const Home = () => {
    const reducer: AppReducer = (state, action) => {
        const newState = state.clone();
        switch (action.type) {
            case ACTIONS.REQUEST_PHOTO_DATA:
                newState.photos.apiPromise = action.payload;
                break;
            case ACTIONS.LOAD_PHOTO_DATA:
                newState.photos.data = action.payload;
                newState.photos.apiPromise = null;
                break;
            case ACTIONS.ATTEMPT_EARLY_FOLDOUT_OPEN:
                newState.photos.attemptedEarlyFoldoutOpen = true;
                break;
            case ACTIONS.NEXT_PHOTO:
                newState.photos.currentIdx = (state.photos.currentIdx + 1) % newState.photos.data.length;
                break;
            case ACTIONS.PREV_PHOTO:
                newState.photos.currentIdx =
                    (state.photos.currentIdx + newState.photos.data.length - 1) % newState.photos.data.length;
                break;
            case ACTIONS.OPEN_PHOTOS:
                newState.photos.open = true;
                newState.photos.attemptedEarlyFoldoutOpen = false;
                break;
            case ACTIONS.CLOSE_PHOTOS:
                newState.photos.open = false;
                break;
        }
        return newState;
    };
    const [
        {
            photos: {
                open: photosOpen,
                currentIdx: currentPhotoIdx,
                data: photoData,
                loading: loadingPhotos,
                apiPromise: photosPromise,
                attemptedEarlyFoldoutOpen,
            },
        },
        dispatch,
    ] = useReducer(reducer, new AppState());

    const flickrDataUrl =
        window.location.hostname === 'ryanoshea.com'
            ? '/api/flickr/most-recent-photos'
            : `https://localhost/api/flickr/most-recent-photos`;
    useEffect(() => {
        if (photoData.length === 0 && !loadingPhotos) {
            const promise = fetch(flickrDataUrl)
                .then(rs => rs.json())
                .then(rs => rs.photos as Photo[])
                .then(rs =>
                    rs.map(photo => {
                        // Preload each image
                        const img = new Image();
                        img.src = photo.url;
                        return {
                            ...photo,
                            raw: img,
                        };
                    })
                )
                .then(rs => {
                    dispatch({
                        type: ACTIONS.LOAD_PHOTO_DATA,
                        payload: rs,
                    });
                })
                .catch(e => console.error(e));
            dispatch({
                type: ACTIONS.REQUEST_PHOTO_DATA,
                payload: promise,
            });
        }
    }, [photoData, flickrDataUrl, loadingPhotos]);

    const toggleFoldout = () => {
        if (loadingPhotos) {
            dispatch({
                type: ACTIONS.ATTEMPT_EARLY_FOLDOUT_OPEN
            });
            photosPromise?.then(() =>
                dispatch({
                    type: ACTIONS.OPEN_PHOTOS,
                })
            );
        } else {
            dispatch({
                type: photosOpen ? ACTIONS.CLOSE_PHOTOS : ACTIONS.OPEN_PHOTOS,
            });
        }
    };

    return (
        <>
            <h2 className='bio'>
                <p id='line1'>I’m a full-stack software engineer based in Boston.</p>
                <p id='line2'>I build user-facing products and core infrastructure from the ground up.</p>
                <p id='line3'>I like writing apps, designing user experiences, and taking photos on the side.</p>
                <p id='line4'>Say hello if you’d like to chat or work together.</p>
            </h2>

            <div id='resume'>
                <a href='/contact/resume.pdf' className='nocolor resume-link' target='_blank' rel='noopener noreferrer'>
                    Résumé &nbsp;<i className='far fa-file-alt'></i>
                </a>
            </div>

            <p>
                Currently, I’m prepping to start a new software engineering position at{' '}
                <a href='https://chewy.com' target='_blank' rel='noopener noreferrer'>
                    Chewy
                </a>
                .
            </p>

            <p>
                Until the COVID crisis hit the restaurant industry, I spent a brief while as full-stack web developer at{' '}
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
            <div id='profile-links'>
                <ul id='profiles'>
                    <li>
                        sometimes I{' '}
                        <a
                            id='github-link'
                            href='https://github.com/ryanoshea'
                            title='github'
                            target='_blank'
                            rel='noopener noreferrer'
                        >
                            code
                        </a>
                    </li>
                    <li>
                        sometimes I{' '}
                        <a
                            id='linkedin-link'
                            href='https://www.linkedin.com/in/ryancoshea'
                            title='linkedin'
                            target='_blank'
                            rel='noopener noreferrer'
                        >
                            work
                        </a>
                    </li>
                    <li>
                        sometimes I{' '}
                        <a id='flickr-link' title='I shoot on a Nikon D610 nowadays.' onClick={() => toggleFoldout()}>
                            take photos{' '}
                            {loadingPhotos && attemptedEarlyFoldoutOpen ? (
                                <i className='foldout-loading-indicators fas fa-sync fa-spin' aria-hidden='true'></i>
                            ) : (
                                <i
                                    className={classNames('fas', {
                                        'fa-angle-down': !photosOpen,
                                        'fa-angle-up': photosOpen,
                                    })}
                                    aria-hidden='true'
                                ></i>
                            )}
                        </a>
                    </li>
                    {photoData.length > 0 && (
                        <PhotosFoldout
                            photos={photoData}
                            currentIdx={currentPhotoIdx}
                            isOpen={photosOpen}
                            dispatch={dispatch}
                        />
                    )}
                    <li>
                        sometimes I{' '}
                        <a
                            id='twitter-link'
                            href='https://twitter.com/ryancoshea'
                            title='twitter'
                            target='_blank'
                            rel='noopener noreferrer'
                        >
                            tweet
                        </a>
                    </li>
                </ul>
                <p>
                    I went to{' '}
                    <a href='http://devonprep.com' title='high school' target='_blank' rel='noopener noreferrer'>
                        Devon Prep
                    </a>{' '}
                    before undergrad.
                </p>
                <p>
                    <a href='https://twitter.com/djoshea' title="Dan O'Shea" target='_blank' rel='noopener noreferrer'>
                        This guy
                    </a>{' '}
                    is my brother. He's doing some amazing stuff in neuroscience.
                </p>
            </div>
        </>
    );
};

export default Home;
