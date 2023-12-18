import http from "@/utils/request";

export function login<T>(data: any) {
    return http.post<T>({
        url: "/api/user/login",
        needHeader: true,
        data: data,
    });
}

// 登陆后获取token后获取信息
export function getInfo<T>() {
    return http.get<T>({
        url: "/api/user",
    });
}


// 用partybranchId获取党支部信息
// 见branch.ts

