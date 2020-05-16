export class PhotosState {
    public constructor(
        public currentIdx = 0,
        public data = [] as Photo[],
        public loading = true,
        public open = false
    ) {}
}

export class AppState {
    public constructor(
        public photos = new PhotosState()
    ) { }
}

export interface Exif {
    camera: string;
    aperture: string;
    shutter: string;
    iso: string;
    focalLength: string;
    flash: string;
}

export interface Photo {
    id: string;
    pageUrl: string;
    exif: Exif;
    url: string;
    title: string;
    file: any
}

export type AppDispatchParam = {
    type: string;
    payload?: any;
};

export type AppDispatch = (d: AppDispatchParam) => void;

export type AppReducer = (state: AppState, action: AppDispatchParam) => AppState;

export const ACTIONS = {
    LOAD_PHOTOS: 'loadPhotos',
    NEXT_PHOTO: 'nextPhoto',
    PREV_PHOTO: 'prevPhoto',
    OPEN_PHOTOS: 'openPhotos',
    CLOSE_PHOTOS: 'closePhotos'
}
