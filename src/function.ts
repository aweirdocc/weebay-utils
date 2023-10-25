import { isObject } from "./validate";

interface IObject {
  [key: string]: any;
}

type IFunction = () => void
interface IInterval {
  start: () => number | null;
  stop: () => void;
}

/**
 * Interval
 * @param { Function } cb   回调方法
 * @param { Number } delay  延时（毫秒）数  
 * @returns { start, clear }
 */
export const intervalFn = (cb: IFunction, delay: number): IInterval => {
  let timer: number | null;
  const rAF  = 
    (function () {
      return (
        window.requestAnimationFrame ||
        (window as any).webkitRequestAnimationFrame ||
        (window as any).mozRequestAnimationFrame ||
        function (callback: TimerHandler) {
          window.setTimeout(callback, 1000 / 60);
        }
      );
    })();

  return {
    start() {
      let startTime = Date.now();
      let endTime = Date.now();

      const self = this;  
      const loop = () => {
        timer = rAF(loop);
        endTime = Date.now();

        if (endTime - startTime >= delay) {
          endTime = startTime = Date.now();
          cb && cb();
          (self as IInterval).stop();  // 在回调执行后停止定时器  
        }
      };

      timer = rAF(loop);

      return timer;
    },

    stop() {
      if(timer){  // 确保timer存在再取消定时器  
        cancelAnimationFrame(timer);   
        timer = null;   
      }     
    }
  };
};

/**
 * 深拷贝合并对象
 * @param { Object } obj1 对象1
 * @param { Object } obj2 对象2
 * @returns 
 */
export const mergeObject = (obj1: IObject, obj2: IObject): IObject => {
  // 如果没有传参，返回默认值
  if (!isObject(obj1)) {
    return mergeObject({}, obj2);
  }
  // 如果没有默认，返回传参
  if (!isObject(obj2)) {
    return mergeObject({}, obj1);
  }
  // 定义一个以默认值为基础的新对象
  const newObj = Object.assign({}, obj2)
  // 遍历传参对象
  Object.keys(obj1).forEach(function (key) {
    const val = obj1[key]
    if (key === '__proto__' || key === 'constructor') {
      return
    }
    if (val === null) {
      return
    }
    // 如果传参对象中的值为对象，则递归调用
    if (isObject(val) && isObject(newObj[key])) {
      newObj[key] = mergeObject(val, newObj[key])
    } else {
      newObj[key] = val
    }
  })

  return newObj
}
