import "../../renderer"

declare module '*.vue' {
	import { DefineComponent } from 'vue'
	const component: DefineComponent<{}, {}, any>
	export default component
}


declare module '*.json' {
	const json: Record<string, any>
	export default json
}

declare module "*.png";

// 临时模块类型声明，缓解类型解析报错（请尽快安装真实依赖以获得完整类型）
declare module 'pinia' {
  export function createPinia(): any
  export type Pinia = any
}

declare module 'vue3-contextmenu' {
  const plugin: any
  export default plugin
}

declare module 'iptv-playlist-parser' {
  export function parse(manifest: string): any
}

declare module 'mpegts.js' {
  const Mpegts: any
  export default Mpegts
}

declare module 'dayjs' {
  const dayjs: any
  export default dayjs
}

declare module 'howtools' {
  export const md5: (val: string) => string
  export const isNumber: (val: string | number) => boolean
  export const numberAndWordReg: RegExp
  const Howtools: any
  export default Howtools
}

// crypto-js 最小类型声明，消除 TS 对类型缺失的诊断
declare module 'crypto-js' {
  const CryptoJS: any
  export default CryptoJS
  export const AES: any
  export const enc: any
  export const mode: any
  export const pad: any
}