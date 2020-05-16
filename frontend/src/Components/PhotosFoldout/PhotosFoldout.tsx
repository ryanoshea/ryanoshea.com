import React, { useEffect, useRef } from 'react';
import { ACTIONS, Photo, AppDispatchParam } from '../../State/AppState';

const PhotosFoldout = (props: {
    photos: Photo[];
    currentIdx: number;
    isOpen: boolean;
    dispatch: React.Dispatch<AppDispatchParam>;
}) => {
    const { photos, currentIdx, isOpen, dispatch } = props;
    const photo = photos[currentIdx];
    const exif = photo.exif;
    const foldout = useRef<HTMLLIElement>(null);
    const image = useRef<HTMLImageElement>(null);
    const foldoutSpacer = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const imageElem = image.current;
        const cb = () => {
            if (imageElem && foldout.current && foldoutSpacer.current) {
                const foldoutStyle = foldout.current.style;
                const spacerStyle = foldoutSpacer.current.style;
                let height, margin;
                if (isOpen) {
                    height = `${imageElem.clientHeight}px`;
                    margin = '0.5em 0';
                } else {
                    height = '0';
                    margin = '0';
                }
                foldoutStyle.height = height;
                foldoutStyle.margin = margin;
                spacerStyle.height = height;
                spacerStyle.margin = margin;
            }
        };
        cb();
        if (imageElem) {
            imageElem.addEventListener('load', cb);
            window.addEventListener('resize', cb);
        }
        return () => {
            if (imageElem) {
                imageElem.removeEventListener('load', cb);
                window.removeEventListener('resize', cb);
            }
        };
    }, [image, isOpen]);

    return (
        <>
            <li className='foldout' id='flickr-foldout' ref={foldout}>
                <a
                    className='flickr-photo'
                    id={`flickr-photo-${currentIdx}`}
                    target='_blank'
                    rel='noopener noreferrer'
                    href={photo.pageUrl}
                >
                    <img src={photo.url} alt={photo.title} ref={image} />
                </a>
                <div id='flickr-foldout-label'>
                    <p id='flickr-top-label'>Photos by Ryan O’Shea on Flickr:</p>
                    <h4>{photo.title}</h4>
                    <ul id='exif-data'>
                        {exif.camera != null && (
                            <li ng-show='flickrPhotoExif().camera != null'>
                                <i className='exif-icons fas fa-camera-retro' aria-hidden='true'></i> {exif.camera}
                            </li>
                        )}
                        {exif.aperture != null && (
                            <li ng-show='flickrPhotoExif().aperture != null'>
                                <i className='exif-icons far fa-circle' aria-hidden='true'></i> <em>f</em>/
                                {exif.aperture}
                            </li>
                        )}
                        {exif.shutter != null && (
                            <li ng-show='flickrPhotoExif().shutter != null'>
                                <i className='exif-icons fas fa-stopwatch' aria-hidden='true'></i> {exif.shutter}"
                            </li>
                        )}
                        {exif.iso != null && (
                            <li ng-show='flickrPhotoExif().iso != null'>
                                <span className='exif-icons' id='iso-icon'>
                                    ISO
                                </span>{' '}
                                {exif.iso}
                            </li>
                        )}
                        {exif.focalLength != null && (
                            <li ng-show='flickrPhotoExif().focalLength != null'>
                                <i className='exif-icons fas fa-eye' aria-hidden='true'></i> {exif.focalLength}
                            </li>
                        )}
                        {exif.flash != null && (
                            <li ng-show='flickrPhotoExif().flash != null'>
                                <i className='exif-icons fas fa-bolt' aria-hidden='true'></i> {exif.flash}
                            </li>
                        )}
                    </ul>
                    <div>
                        <button className='flickr-nav-button' onClick={() => dispatch({ type: ACTIONS.PREV_PHOTO })}>
                            <i className='fas fa-caret-left' aria-hidden='true'></i>
                        </button>
                        <button className='flickr-nav-button' onClick={() => dispatch({ type: ACTIONS.NEXT_PHOTO })}>
                            <i className='fas fa-caret-right' aria-hidden='true'></i>
                        </button>
                    </div>
                    <a
                        id='flickr-button'
                        href='https://www.flickr.com/photos/rinoshea/'
                        target='_blank'
                        rel='noopener noreferrer'
                    >
                        See All <i className='fas fa-external-link-square-alt' aria-hidden='true'></i>
                    </a>
                </div>
            </li>
            <div className='foldout-spacer' ref={foldoutSpacer}></div>
        </>
    );
};

export default PhotosFoldout;
