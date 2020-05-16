export class PhotosState {
    public constructor(
        public currentIdx = 0,
        public data = [] as Photo[],
        public open = false,
        public apiPromise = null as Promise<any> | null,
        public attemptedEarlyFoldoutOpen = false
    ) {}

    public get loading(): boolean {
        return this.apiPromise != null;
    }

    public clone(): PhotosState {
        return new PhotosState(
            this.currentIdx,
            [...this.data],
            this.open,
            this.apiPromise,
            this.attemptedEarlyFoldoutOpen
        );
    }
}

export class AppState {
    public constructor(public photos = new PhotosState()) {}

    public clone(): AppState {
        return new AppState(this.photos.clone());
    }
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
    file: any;
}

export type AppDispatchParam = {
    type: string;
    payload?: any;
};

export type AppReducer = (state: AppState, action: AppDispatchParam) => AppState;

export const ACTIONS = {
    REQUEST_PHOTO_DATA: 'requestPhotoData',
    LOAD_PHOTO_DATA: 'loadPhotoData',
    ATTEMPT_EARLY_FOLDOUT_OPEN: 'attemptEarlyFoldoutOpen',
    NEXT_PHOTO: 'nextPhoto',
    PREV_PHOTO: 'prevPhoto',
    OPEN_PHOTOS: 'openPhotos',
    CLOSE_PHOTOS: 'closePhotos',
};
