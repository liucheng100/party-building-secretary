import http from "@/utils/request";

//查看普通用户收到的站内信
export function userGetMessage<T>(token:string){
    return http.get<T>({
        url:'/api/message/stu',
        params:{
            token,
        }
    })
}

// 查看普通用户已发送的站内信
export function userSentMessage<T>(token:string){
    return http.get<T>({
        url:'/api/message/stu/sent',
        params:{
            token,
        }
    })
}

// 普通用户发送站内信
export function userPostMessage<T>(params:any){
    return http.post<T>({
        url:'/api/message/stu',
        params:{
            receiverId: params.receiverId,       //发送对象
            title: params.title,                 //信件题目
            content: params.content,             //信件内容
            token: params.token,                 //token
        }
    })
}

// 查看管理员收到的站内信
export function adminGetMessage<T>(token:string){
    return http.get<T>({
        url:'/api/message/admin',
        params:{
            token,
        }
    })
}

// 查看管理员已发送的站内信
export function adminSentMessage<T>(token:string){
    return http.get<T>({
        url:'/api/message/admin/sent',
        params:{
            token,
        }
    })
}

// 管理员发送站内信（非回复）
export function adminPostMessage<T>(params:any){
    return http.post<T>({
        url:'/api/message/admin',
        params:{
            receiverId: params.receiverId,       //发送对象
            title: params.title,                 //信件题目
            content: params.content,             //信件内容
            token: params.token,                 //token
        }
    })
}

// 管理员发送站内信（回复）
export function adminReplyMessage<T>(params:any){
    return http.post<T>({
        url:'/api/message/admin/reply',
        params:{
            receiverId: params.receiverId,            //发送对象
            title: params.title,                      //信件题目
            content: params.content,                  //信件内容
            replyMessageId: params.replyMessageId,    //所回复的信件的id
            token: params.token,                      //token
        }
    })
}


