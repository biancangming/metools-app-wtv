declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

// 添加完整的 Vue 模块类型声明
declare module 'vue' {
  import { App, CreateAppFunction } from '@vue/runtime-core'
  
  export * from '@vue/runtime-core'
  export interface CreateAppFunction<HostElement> {
    (rootComponent: any, rootProps?: any): App<HostElement>
  }
  export const createApp: CreateAppFunction<Element>
}