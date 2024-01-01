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
export function getMemberList<T>(type: number) {
  return http.get<T>({
    url: `/api/process/filterMain`,
    params:{
      type
    }
  });
}

//按学号搜索
export function searchByNum<T>(sno:string){
  return http.get<T>({
    url:'/api/process/searchBySno',
    params:{
      sno
    }
  })
}

//查询文档详情
export function getSFileDetail<T>(id:string){
  return http.get<T>({
    url:`/api/file/htd/${id}`,
  })
}

