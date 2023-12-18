import http from "@/utils/request";

//获取个人入党流程
export function getPersonProcess<T>(userId: string) {
  return http.get<T>({
    url: `/api/process/${userId}`,
  });
}
