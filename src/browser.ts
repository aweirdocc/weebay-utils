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

/**
 * 复制的文本到粘贴版
 * @param text 要复制的文本
 * @returns 
 */
export const copyToClipboard = (text:string) => {
  try {
      return navigator.clipboard.writeText(text);
  }
  catch {
      const element = document.createElement('textarea');
      const previouslyFocusedElement = document.activeElement;
      element.value = text;
      // Prevent keyboard from showing on mobile
      element.setAttribute('readonly', '');
      element.style.contain = 'strict';
      element.style.position = 'absolute';
      element.style.left = '-9999px';
      element.style.fontSize = '12pt'; // Prevent zooming on iOS
      const selection = document.getSelection();
      const originalRange = selection
          ? selection.rangeCount > 0 && selection.getRangeAt(0)
          : null;
      document.body.appendChild(element);
      element.select();
      // Explicit selection workaround for iOS
      element.selectionStart = 0;
      element.selectionEnd = text.length;
      document.execCommand('copy');
      document.body.removeChild(element);
      if (originalRange) {
          (selection  as Selection).removeAllRanges(); // originalRange can't be truthy when selection is falsy
          (selection as Selection).addRange(originalRange);
      }
      // Get the focus back on the previously focused element, if any
      if (previouslyFocusedElement) {
          (previouslyFocusedElement as HTMLInputElement)!.focus();
      }
  }
}

/**
 * 文件 转 Blob
 * @param file File 文件
 * @returns 
 */
export const file2Blob = (file: File): Blob => new Blob([file], { type: file.type });

/**
 * Blob 转 Base64
 * @param data 数据流
 * @param callback 成功时的回调
 */
export const blob2Base64 = (data: Blob, callback: Function) => {
  const fileReader = new FileReader();

  fileReader.onload = function (e:ProgressEvent<FileReader>) { callback(e.target!.result); };
  fileReader.readAsDataURL(data);
};