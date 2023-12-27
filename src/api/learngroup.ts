import http from "@/utils/request";

//获取所有学习小组
export function getGroup<T>() {
	return http.get<T>({
		url: `/api/studyGroup/myBranch`,
	});
}

export function getUnGroup<T>() {
	return http.get<T>({
		url: `/api/studyGroup/unalloc`,
	});
}
// 获取特定学习小组
export function getSingleGroup<T>(id: any){
    return http.get<T>({
        url:`/api/studyGroup/${id}`,
    })
}

// 获取特定学习小组成员
export function getGroupMember<T>(id: any){
    return http.get<T>({
        url:`/api/studyGroup/${id}/member`,
    })
}

// 删除学习小组
export function getDeleteGroup<T>(id: any){
    return http.get<T>({
        url:`/api/studyGroup/${id}/delete`,
    })
}

// 添加学习小组
export function addGroup<T>(sno: string){
    return http.post<T>({
        url:`/api/studyGroup/new`,
        data:{
            'leaderSno' : sno
        }
    })
}

// 添加学习小组成员
export function addGroupMember<T>(params: any, id: any){
    return http.post<T>({
        url:`/api/studyGroup/${id}/addMember`,
        params:{
            params,
        }
    })
}