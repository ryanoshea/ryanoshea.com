import React from 'react';

const Home = () => {
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
                        sometimes I
                        <a id='flickr-link' title='I shoot on a Nikon D610 nowadays.'>
                            take photos
                            <span ng-hide='flickrWaiting || flickrFoldoutOpen  || isMobile'>
                                <i className='fas fa-angle-down' aria-hidden='true'></i>
                            </span>
                            <span ng-hide='flickrWaiting || !flickrFoldoutOpen || isMobile'>
                                <i className='fas fa-angle-up' aria-hidden='true'></i>
                            </span>
                        </a>
                        <span ng-hide='!flickrWaiting'>
                            <i className='foldout-loading-indicators fas fa-sync fa-spin' aria-hidden='true'></i>
                        </span>
                    </li>
                    <li className='foldout' id='flickr-foldout'>
                        {/* <a
                            className='flickr-photo'
                            id='flickr-photo-{{$index}}'
                            ng-repeat='item in dummyArray'
                            ng-className="{'invisible': selectedFlickrPhoto != $index}"
                            target='_blank'
                            rel='noopener noreferrer'
                            ng-href='{{ flickrPhotos[$index].pageUrl }}'
                        >
                            <img ng-src='{{ flickrPhotos[$index].url }}' />
                        </a>
                        <div id='flickr-foldout-label'>
                            <p id='flickr-top-label'>Photos by Ryan O’Shea on Flickr:</p>
                            <h4>{{ flickrPhotoTitle(); }}</h4>
                            <ul id='exif-data'>
                                <li ng-show="flickrPhotoExif().camera != null"><i className="exif-icons fas fa-camera-retro" aria-hidden="true"></i> {{flickrPhotoExif().camera}}</li>
                                <li ng-show="flickrPhotoExif().aperture != null"><i className="exif-icons far fa-circle" aria-hidden="true"></i> <em>f</em>/{{flickrPhotoExif().aperture}}</li>
                                <li ng-show="flickrPhotoExif().shutter != null"><i className="exif-icons fas fa-stopwatch" aria-hidden="true"></i> {{flickrPhotoExif().shutter}}"</li>
                                <li ng-show="flickrPhotoExif().iso != null"><span className="exif-icons" id="iso-icon">ISO</span> {{flickrPhotoExif().iso}}</li>
                                <li ng-show="flickrPhotoExif().focalLength != null"><i className="exif-icons fas fa-eye" aria-hidden="true"></i> {{flickrPhotoExif().focalLength}}</li>
                                <li ng-show="flickrPhotoExif().flash != null"><i className="exif-icons fas fa-bolt" aria-hidden="true"></i> {{flickrPhotoExif().flash}}</li>
                            </ul>
                            <div>
                                <button className='flickr-nav-button' ng-click="changeFlickrPhoto('left')">
                                    <i className='fas fa-caret-left' aria-hidden='true'></i>
                                </button>
                                <button className='flickr-nav-button' ng-click="changeFlickrPhoto('right')">
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
                        </div> */}
                    </li>
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
