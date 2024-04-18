import http from "@/utils/request";

export function getInfoBySno<T>(sno: any) {
  return http.get<T>({
    url: `/api/user/${sno}`,
  });
}
