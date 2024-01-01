import http from "@/utils/request";
//业务处理 文件审批用接口
export function getAllFiles<T>(filter:any){
    return http.get<T>({
        url:`/api/file/htd/list/?filter=${filter}`
    })
}

export function getFileDetail<T>(id:any){
    return http.get<T>({
        url: `/api/file/htd/?id=${id}`
    })
}

export function approvalFile<T>(status:number,id:string,comment:string){
    return http.post<T>({
        url:`/api/file/htd/${id}/approval`,
        params:{
            status,comment
        }
    })
}