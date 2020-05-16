import React, { useReducer, useEffect, useRef } from 'react';
import './Home.scss';
import classNames from 'classnames';
import { AppReducer, ACTIONS, AppState, Photo } from '../../State/AppState';
import PhotosFoldout from '../PhotosFoldout/PhotosFoldout';
import Biography from '../Biography/Biography';
import { mobileViewport } from '../../Utils';
import { FOLDOUT_ANIMATION_PRIMARY_DURATION } from '../../Consts';
import SometimesLabel from '../SometimesLabel/SometimesLabel';

const Home = () => {
    const foldoutElem = useRef<HTMLLIElement>(null);
    const foldoutOpenLink = useRef<HTMLButtonElement>(null);

    // Profile link refs
    const codeRef = useRef<HTMLLIElement>(null);
    const workRef = useRef<HTMLLIElement>(null);
    const photoRef = useRef<HTMLLIElement>(null);
    const tweetRef = useRef<HTMLLIElement>(null);

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
            case ACTIONS.SET_SELECTED_SOMETIMES_LABEL:
                newState.selectedSometimesLabel = action.payload;
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
            selectedSometimesLabel,
        },
        dispatch,
    ] = useReducer(reducer, new AppState());

    // Load Flickr portfolio image data
    const flickrDataUrl =
        window.location.hostname === 'ryanoshea.com'
            ? '/api/flickr/most-recent-photos'
            : `https://localhost/api/flickr/most-recent-photos`;
    useEffect(() => {
        if (photoData.length === 0 && !loadingPhotos) {
            const promise = fetch(flickrDataUrl)
                .then(rs => rs.json())
                .then(rs => rs.photos as Photo[])
                .then(rs => {
                    // Preload each image if user is on a desktop
                    if (!mobileViewport()) {
                        rs.forEach(photo => {
                            // Preload each image
                            const img = new Image();
                            img.src = photo.url;
                        });
                    }

                    return rs;
                })
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
        // Open the foldout only if the window is big enough
        if (!mobileViewport()) {
            if (loadingPhotos) {
                // If user tried to open the foldout before the photo data was loaded, show a loading indicator and hook
                // onto the in-progress request to open the foldout when it completes.
                dispatch({
                    type: ACTIONS.ATTEMPT_EARLY_FOLDOUT_OPEN,
                });
                photosPromise?.then(() => {
                    dispatch({
                        type: ACTIONS.OPEN_PHOTOS,
                    });
                    scrollFoldoutIntoView();
                });
            } else {
                // Data is loaded, just open or close the foldout
                dispatch({
                    type: photosOpen ? ACTIONS.CLOSE_PHOTOS : ACTIONS.OPEN_PHOTOS,
                });

                if (!photosOpen) {
                    scrollFoldoutIntoView();
                }
            }
        } else {
            const newTab = window.open('https://www.flickr.com/photos/rinoshea/', '_blank');
            if (newTab) {
                newTab.opener = null;
            }
        }
    };

    const scrollFoldoutIntoView = () => {
        setTimeout(() => {
            if (foldoutOpenLink.current) {
                foldoutOpenLink.current.scrollIntoView({ behavior: 'smooth' });
            }
        }, FOLDOUT_ANIMATION_PRIMARY_DURATION);
    };

    return (
        <>
            <Biography />
            <div id='profile-links'>
                <ul id='profiles'>
                    <li ref={codeRef}>
                        <SometimesLabel
                            identifier='code'
                            selectedId={selectedSometimesLabel}
                            listItem={codeRef}
                            dispatch={dispatch}
                        />
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
                    <li ref={workRef}>
                        <SometimesLabel
                            identifier='work'
                            selectedId={selectedSometimesLabel}
                            listItem={workRef}
                            dispatch={dispatch}
                        />
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
                    <li ref={photoRef}>
                        <SometimesLabel
                            identifier='take photos'
                            selectedId={selectedSometimesLabel}
                            listItem={photoRef}
                            dispatch={dispatch}
                        />
                        <button
                            id='flickr-link'
                            className='link'
                            title='I shoot on a Nikon D610 nowadays.'
                            onClick={() => toggleFoldout()}
                            ref={foldoutOpenLink}
                        >
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
                        </button>
                    </li>
                    {photoData.length > 0 && (
                        <PhotosFoldout
                            photos={photoData}
                            currentIdx={currentPhotoIdx}
                            isOpen={photosOpen}
                            foldoutElem={foldoutElem}
                            dispatch={dispatch}
                        />
                    )}
                    <li ref={tweetRef}>
                        <SometimesLabel
                            identifier='tweet'
                            selectedId={selectedSometimesLabel}
                            listItem={tweetRef}
                            dispatch={dispatch}
                        />
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
