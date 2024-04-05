export function findSecondaryItems(): NodeListOf<Element> | undefined {
  return document.querySelector('#columns')
    ?.querySelector('#items')
    ?.querySelectorAll('ytd-playlist-panel-video-renderer')
}

export const getList = () => document.querySelector('#playlist.style-scope.ytd-watch-flexy');
