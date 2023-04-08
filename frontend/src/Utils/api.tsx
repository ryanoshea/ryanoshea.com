// Local dev setup involves backend running on one port and react dev server on another. Ensure backend calls get routed
// to the local backend instead of the react dev server.
export const getUrl = (relativePath: string) =>
    window.location.hostname.indexOf('localhost') >= 0 || window.location.hostname.indexOf('127.0.0.1') >= 0
        ? `https://localhost${relativePath}`
        : relativePath;
