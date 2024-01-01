import http from "@/utils/request";

//获取个人入党流程
export function getPersonProcess<T>(userId: string) {
  return http.get<T>({
    url: `/api/process/${userId}`,
  });
}

//改变个人入党流程
export function updatePersonProcess<T>(userId: string,processId:number,status:number) {
  return http.post<T>({
    url: `/api/process/${userId}/update`,
    params:{
        processId,status
    }
  });
}

//获取已提交的文档
export function getFile<T>(userId: string) {
  return http.get<T>({
    url: `/api/file/htd/user/${userId}`,
  });
}

//获取党支部成员
export function getMemberList<T>(branchId: string | undefined) {
  return http.get<T>({
    url: `/api/partyBranch/memberList`,
    params:{
      branchId
    }
  });
}
