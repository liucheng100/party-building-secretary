import http from "@/utils/request";

// 用partybranchId获取党支部信息
// 见branch.ts
export function getBranchInfo<T>(branchId: any) {
    return http.get<T>({
        url: "/api/partyBranch",
        params:{
            branchId,
        }
    });
}
