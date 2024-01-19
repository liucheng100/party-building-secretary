import http from "@/utils/request";
//业务处理 状态管理用接口
export function processFilter<T>(processId:any){
    return http.get<T>({
        url:`/api/process/filter`,
        params:{'processId':processId}
    })
}

export function updateBatch<T>(data:any){
    return http.post<T>({
        url:`/api/process/updateBatch`,
        data:data
    })
}