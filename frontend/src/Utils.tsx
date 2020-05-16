import { BOOTSTRAP_BREAKPOINT_XL } from './Consts';

export const viewportWidth = () => Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
export const mobileViewport = () => viewportWidth() < BOOTSTRAP_BREAKPOINT_XL;
