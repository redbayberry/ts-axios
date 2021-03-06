import { ResolvedFn, RejectedFn } from '../types'
interface Interceptor<T> {
  resolved: ResolvedFn<T>
  rejected?: RejectedFn
}
export default class InterceptorManager<T> {
  private interceptor: Array<Interceptor<T> | null>
  constructor() {
    this.interceptor = []
  }
  // 用use其实就是往数组里push数据
  use(resolved: ResolvedFn<T>, rejected?: RejectedFn): number {
    this.interceptor.push({
      resolved,
      rejected
    })
    return this.interceptor.length - 1
  }
  forEach(fn: (Interceptor: Interceptor<T>) => void): void {
    this.interceptor.forEach(interceptor => {
      if (interceptor !== null) {
        fn(interceptor)
      }
    })
  }
  eject(id: number): void {
    if (this.interceptor[id]) {
      this.interceptor[id] = null
    }
  }
}
