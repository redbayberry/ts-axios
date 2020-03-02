import { AxiosInstance } from './types'
import Axios from './core/Axios'
import { extend } from './helpers/util'
function createInstance(): AxiosInstance {
  const context = new Axios()
  console.log(context, '111')
  const instance = Axios.prototype.request.bind(context)
  console.log(instance)
  extend(instance, context)
  return instance as AxiosInstance
}
const axios = createInstance()
export default axios