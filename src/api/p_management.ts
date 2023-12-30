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
