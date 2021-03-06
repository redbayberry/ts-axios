import { AxiosInstance, AxiosRequestConfig } from './types'
import Axios from './core/Axios'
import { extend } from './helpers/util'
import defaults from './defaults'
function createInstance(config:AxiosRequestConfig): AxiosInstance {
  const context = new Axios(config)
  console.log(context, '111')
  const instance = Axios.prototype.request.bind(context)
  console.log(instance)
  extend(instance, context)
  return instance as AxiosInstance
}
const axios = createInstance(defaults)
export default axios
