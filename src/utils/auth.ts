/**
 *  @FileCreator: StevenGao
 * @Date: 2022/2/11
 */

import Cookies from "js-cookie";

const TokenKey = "01ef8056f2e53c0e";
const BranchId : string = '0';

export function getToken() {
  return Cookies.get(TokenKey);
}

export function setToken(token: string) {
  return Cookies.set(TokenKey, token);
}

export function setBranchId(Id: string) {
  return Cookies.set(BranchId, Id);
}

export function getBranchId():string {
  return Cookies.get(BranchId);
}

export function removeToken() {
  return Cookies.remove(TokenKey);
}
