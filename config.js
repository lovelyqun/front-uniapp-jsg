// let env = 'production'
// let env = 'dev'

let env = 'test'

const PROD_URL = 'https://server-api.nicekol.com'
const SPIDER_PROD_URL = 'https://spider.nicekol.com'
const PACKAGE_NAME = 'tonggao'
const PRODUCT_NAME = '真香通告'
const TEMPIDS = ['uXcROlNagemyEtg-jgf2Cm6SF7Ge34TTS8ggPbI4MqQ', 'TkCCpXqDqdsGXHK3y1B0wQIej6AMSRvLqblcTC7R-8I']
const IMG_SRC = `https://wodan-idc.oss-cn-hangzhou.aliyuncs.com/miniProgram/${env === 'production' ? 'prod' : 'test'}/${PACKAGE_NAME}/img/`
const config = {
  nodeEnv: env === 'production' ? 'production' : 'development',
  baseUrl: env === 'production' ? PROD_URL : `http://${env}-server-api.shijianke.com`,
  spiderUrl: env === 'production' ? SPIDER_PROD_URL : `http://${env}-reptile.shijianke.com`,
  upImageUrl: '/mapi/file/upload',
  packName: PACKAGE_NAME,
  productName: PRODUCT_NAME,
  imgSrc: IMG_SRC,
  tmplIds: TEMPIDS,
}

export default config