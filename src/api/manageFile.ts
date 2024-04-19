import http from "@/utils/request";
//业务处理 文件审批用接口
export function getAllFiles<T>(
  type: number,
  hasRead: number,
  page: number,
  countPerPage: number
) {
  return http.get<T>({
    url: "/api/file/htd/list",
    params: {
      type,
      hasRead,
      page,
      countPerPage,
    },
  });
}

export function getFileDetail<T>(id: any) {
  return http.get<T>({
    url: `/api/file/htd/?id=${id}`,
  });
}

export function approvalFile<T>(
  status: number,
  id: string,
  comment: string,
  approvalAt: string
) {
  return http.post<T>({
    url: `/api/file/htd/${id}/approval`,
    params: {
      status,
      comment,
      approvalAt,
    },
  });
}
