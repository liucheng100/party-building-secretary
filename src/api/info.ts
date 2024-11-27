import http from "@/utils/request";

export function uploadFile<T>(FormData:any){
    return http.post<T>({
        url:'/api/file/upload',
        data: FormData,
    })
}

export function downloadFile<T>(parmas:any){
    return http.get<T>({
        url: `/d/${parmas.type}/${parmas.name}`,
        responseType: "blob",
    })
}

export function getStatistics2<T>() {
    return http.get<T>({
        url: '/api/manager/status/newCount',
    })
}

// just for test
// export async function getStatistics2<T>(): Promise<T> {
//     const token = `eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOlsiODk2MiIsIjMwMjIwMDE0ODIiLCIxMjciLCIwIl0sImNvbHVtbnMiOiIiLCJpc3MiOiJUd1RfU3R1ZGlvIiwiZXhwIjoxNzM1MjY4NTY4fQ.IIuCJsBYfySGXbYbAfbLZJ52SjwV1d3J88URx6JJ3uc`;

//     const response = await fetch('/api/manager/status/newCount', {
//         method: 'GET',
//         headers: {
//             'Content-Type': 'application/json',
//             'token': token,
//         },
//     });

//     if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//     }

//     return await response.json();
// }
