/*
 * @Author: Dunn-liu 15817294245@163.com
 * @Date: 2023-09-05 13:51:27
 * @LastEditors: Dunn-liu 15817294245@163.com
 * @LastEditTime: 2023-09-05 13:55:43
 * @FilePath: \qrcode-demo\src\utils\element-helper.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const getPadding = (el: HTMLElement) => {
  const style = window.getComputedStyle(el, null);
  const paddingLeft = Number.parseInt(style.paddingLeft, 10) || 0;
  const paddingRight = Number.parseInt(style.paddingRight, 10) || 0;
  const paddingTop = Number.parseInt(style.paddingTop, 10) || 0;
  const paddingBottom = Number.parseInt(style.paddingBottom, 10) || 0;
  return {
    left: paddingLeft,
    right: paddingRight,
    top: paddingTop,
    bottom: paddingBottom,
  };
};
export const checkElementOverflow = (el: HTMLElement) => {
  const range = document.createRange();
  range.setStart(el, 0);
  range.setEnd(el, el.childNodes.length);
  let rangeWidth = range.getBoundingClientRect().width;
  let rangeHeight = range.getBoundingClientRect().height;
  /** detail: https://github.com/element-plus/element-plus/issues/10790
* What went wrong?
* UI > Browser > Zoom, In Blink/WebKit, getBoundingClientRect() sometimes returns inexact values, probably due to lost
precision during internal calculations. In the example above:
* - Expected: 188
* - Actual: 188.00000762939453
*/
  const offsetWidth = rangeWidth - Math.floor(rangeWidth);
  if (offsetWidth < 0.001) {
    rangeWidth = Math.floor(rangeWidth);
  }
  const offsetHeight = rangeHeight - Math.floor(rangeHeight);
  if (offsetHeight < 0.001) {
    rangeHeight = Math.floor(rangeHeight);
  }

  const { top, left, right, bottom } = getPadding(el); // 见下方
  const horizontalPadding = left + right;
  const verticalPadding = top + bottom;
  if (
    rangeWidth + horizontalPadding > el.offsetWidth ||
    rangeHeight + verticalPadding > el.offsetHeight ||
    el.scrollWidth > el.offsetWidth
  ) {
    return true;
  }
};
