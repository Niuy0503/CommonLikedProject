/**
 * Created by PanJiaChen on 16/11/18.
 */

/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}
/**
 *  用户名验证
 * @param {*} str
 * @returns {Boolean}
 */
export function validUserName(str) {
  return /^[a-zA-Z0-9_-]{4,16}$/.test(str.trim())
}
/**
 *
 * @param {string} str
 * @returns {Boolean}
 */
export function validPhone(str) {
  return /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-79])|(?:5[0-35-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[189]))\d{8}$/.test(str.trim())
}
