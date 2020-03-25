import request from '@/utils/request.ts'

export function login (data) {
  return request({
    url: '/users/login',
    method: 'post',
    data
  })
}

export function getInfo (token) {
  return request({
    url: '/users/info',
    method: 'get',
    params: { token }
  })
}

export function logout () {
  return request({
    url: '/users/logout',
    method: 'post'
  })
}
