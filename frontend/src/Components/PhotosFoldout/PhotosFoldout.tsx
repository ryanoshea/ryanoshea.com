import React from 'react';
import { AppDispatch, ACTIONS, Photo } from '../../State/AppState';

const PhotosFoldout = (props: {
    photos: Photo[];
    currentIdx: number;
    isOpen: boolean;
    container: React.RefObject<HTMLDivElement>;
    contentColumn: React.RefObject<HTMLDivElement>;
    dispatch: AppDispatch;
}) => {
    const { photos, currentIdx, isOpen, container, contentColumn, dispatch } = props;
    const photo = photos[currentIdx];
    const exif = photo.exif;

    return (
        <li
            className='foldout'
            id='flickr-foldout'
            style={{
                height: `${isOpen ? 400 : 0}px`,
                width: `${Math.max(document.documentElement.clientWidth, window.innerWidth || 0)}px`,
                marginLeft:
                    container && container.current && contentColumn && contentColumn.current
                        ? `${-1 * (contentColumn.current.offsetLeft)}px`
                        : '0',
            }}
        >
            <a
                className='flickr-photo'
                id={`flickr-photo-${currentIdx}`}
                target='_blank'
                rel='noopener noreferrer'
                href={photo.pageUrl}
            >
                <img src={photo.url} alt={photo.title} />
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
                            <i className='exif-icons far fa-circle' aria-hidden='true'></i> <em>f</em>/{exif.aperture}
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
    );
};

export default PhotosFoldout;
