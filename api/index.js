import {
  request
} from '@/libs/request'

// ******************************************微信登录相关**************************

//微信登陆
export function weChatLoginApi(query) {
  return request({
    url: '/mapi/wxAuth/codeLogin',
    method: 'post',
    data: query
  })
}

//微信绑定手机号
export function weChatPhoneBindApi(query) {
  return request({
    url: '/mapi/wxAuth/phoneBind',
    method: 'post',
    data: query,
    showLoading: true
  })
}

//微信小程序登出并解绑手机
export function weChatLogoutApi(query) {
  return request({
    url: '/mapi/wxAuth/logout',
    method: 'post',
    data: query
  })
}





// ******************************************账号**************************

// 获取账号信息
export function getAccountInfoApi(query) {
  return request({
    url: '/mapi/account/account_info',
    method: 'post',
    data: query
  })
}
// 编辑账号信息

export function editAccountInfoApi(query) {
  return request({
    url: '/mapi/account/account_edit',
    method: 'post',
    data: query
  })
}

// 获取全局信息
export function getGlobDataApi(query) {
  return request({
    url: '/mapi/user/get_is_show',
    method: 'post',
  })
}