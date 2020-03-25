import request from '@/utils/request.ts'

export function fetchList (query) {
  const { pageSize = 10, page = 1, ...rest } = query || {}
  return request({
    url: '/article/list',
    method: 'post',
    data: {
      pageSize,
      page,
      ...rest
    },
    showLoading: false
  })
}
