/**
 *  @FileCreator: StevenGao
 * @Date: 2022/2/11
 */

import Cookies from "js-cookie";

const TokenKey = "01ef8056f2e53c0e";

export function getToken() {
  return Cookies.get(TokenKey);
}

export function setToken(token: string) {
  return Cookies.set(TokenKey, token);
}

export function removeToken() {
  return Cookies.remove(TokenKey);
}
