import http from "@/utils/request";

export function uploadFile<T>(FormData: any) {
  return http.post<T>({
    url: "/api/file/upload",
    data: FormData,
  });
}

export function downloadFile<T>(parma: any) {
  return http.get<T>({
    url: `/d/${parma}`,
    responseType: "blob",
    needHeader: true,
  });
}
