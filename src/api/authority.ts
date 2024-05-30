import http from "@/utils/request";

export function getInfoBySno<T>(sno: any) {
  return http.get<T>({
    url: `/api/user/${sno}`,
  });
}

export function getBranchInfo<T>(branchId: any) {
  return http.get<T>({
    url: "/api/partyBranch",
    params: {
      branchId,
    },
  });
}

export function update3Person<T>(params: any) {
  return http.post<T>({
    url: `/api/partyBranch/update3Person`,
    params: {
      branchId: params.branchId,
      index: params.index,
      newStuNum: params.newStuNum,
    },
  });
}
