import { isUrl } from "./validate";

/**
 * 获取文档窗口的宽度
 */
export const getClientWidth = (): number => {
  return (document.compatMode === 'BackCompat' ? document.body : document.documentElement)
    .clientWidth;
};

/**
 * 获取文档窗口的高度
 */
export const getClientHeight = (): number => {
  return document.documentElement.clientHeight ?? document.body.clientHeight ?? 0;
};

/**
 * 获取 ScrollTop
 */
export const getScrollTop = (): number => {
  return document?.documentElement?.scrollTop ?? document?.body?.scrollTop;
}

/**
 * 获取 ScrollHeight
 */
export const getScrollHeight = (): number => {
  return document?.documentElement?.scrollHeight ?? document?.body?.scrollHeight;
}

/**
 * URL 的查询字符串
 */
export const getUrlParams = (url: string): URLSearchParams => {
  if (isUrl(url)) {
    const href = url ? url : document.location.href;
    const hashSearch = href.slice(href.indexOf('?'));

    return new URLSearchParams(hashSearch);
  } else {
    return new URLSearchParams('');
  }
};

/**
 * 设置 query parmas
 * @param baseUrl
 * @param paramsObj
 * @returns
 */
export const setObjToUrlParams = (baseUrl: string, paramsObj: Record<string, any>):string => {
  let parameters = '';

  Object.entries(paramsObj).forEach(([key, val]) => {
    parameters += key + '=' + encodeURIComponent(val) + '&';
  })
  parameters = parameters.replace(/&$/, '');

  return /\?$/.test(baseUrl) ? baseUrl + parameters : baseUrl.replace(/\/?$/, '?') + parameters;
};


/**
 * 平滑滚动到指定位置
 * @param to 滚动至Y轴的位置
 * @param during 滚动的时间(ms)
 */
export const scrollTo = (to: number = 0, during: number = 300): void => {
  const startDate = +new Date();
  const currentTop = getScrollTop();
  const change = currentTop - to;

  const move = () => {
    const now = +new Date();
    const val = Math.min(1, (now - startDate) / during);

    window.scrollTo(0, currentTop - change * val);

    if (val < 1) {
      requestAnimationFrame(move);
    }
  };

  requestAnimationFrame(move);
};

/**
 * 滚动到顶部
 */
export const scrollToTop = (): void => {
  scrollTo();
};

/**
 * 滚动到底部
 */
export const scrollToBottom = (): void => {
  const currentTop = getScrollTop();
  const scrollHeight = getScrollHeight();
  const clientHeight = getClientHeight();

  if (currentTop < scrollHeight - clientHeight) {
    window.requestAnimationFrame(scrollToBottom);
    window.scrollTo(0, currentTop + clientHeight / 16);
  }
};


