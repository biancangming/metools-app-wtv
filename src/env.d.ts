/**
 * webview-preload.d.ts
 * 
 * 说明：
 * - 本声明文件用于为 <webview> 内部页面（guest）提供 TypeScript 类型提示；
 * - 这些 API 由 webview 预加载脚本（src/preload/webview-preload.ts/js）通过 contextBridge 暴露；
 * - 仅在 webview 内部页面（guest）中可用，宿主页面（host 渲染进程）不可直接访问 window.$api；
 * - 事件通道与主进程 preload（src/preload/index.ts）保持一致，便于统一管理。
 */

// 内部命令工具类型（与主进程保持一致）
type InternalCommandTool = 'ffmpeg' | 'python' | 'node'

/**
 * 运行内部命令的可选参数
 * - timeoutMs: 超时时间（毫秒），到时自动终止该进程
 * - commandid: 自定义命令 ID（不传则由主进程自动生成）
 * - groupid: 分组 ID（用于后续批量终止相关进程）
 * - cwd: 进程工作目录（可选）
 */
interface RunInternalCommandOptions {
  timeoutMs?: number
  commandid?: string
  groupid?: string
  cwd?: string
  /**
   * 输出捕获模式：
   * - 'none'：后台运行，不捕获输出（默认）
   * - 'collect'：等待结束，一次性返回 stdout/stderr
   * - 'stream'：实时通过事件通道回传（需使用 onInternalCommandOutput 监听）
   */
  captureOutput?: 'none' | 'collect' | 'stream'
}

/**
 * 运行内部命令返回结构
 * - success: 是否成功启动进程
 * - commandId: 进程对应的命令 ID
 * - groupId: 分组 ID（若传入）
 * - pid: 进程 PID（若可获取）
 * - message: 可选提示或错误信息
 */
interface RunInternalCommandResult {
  success: boolean
  commandId: string
  groupId?: string
  pid?: number
  exitCode?: number
  stdout?: string
  stderr?: string
  message?: string
}

/**
 * 终止内部命令返回结构
 * - success: 是否成功终止
 * - message: 可选提示或错误信息
 */
interface TerminateResult {
  success: boolean
  message?: string
}

/**
 * 当前运行中的内部命令条目
 * - id: 命令 ID
 * - groupId: 分组 ID（可选）
 * - tool: 工具名称（ffmpeg/python/node）
 * - pid: 进程 PID
 * - startAt: 启动时间（时间戳，毫秒）
 * - timeoutMs: 超时时间（毫秒，若设置）
 */
interface ListInternalCommandItem {
  id: string
  groupId?: string
  tool: InternalCommandTool
  pid: number
  startAt: number
  timeoutMs?: number
}

/**
 * Webview 下载数据结构
 * - url: 待下载资源链接
 * - filename: 期望保存的文件名（可选）
 */
interface WebviewDownloadData {
  url: string
  filename?: string
}

/**
 * Webview 预加载脚本暴露的 API（仅供 <webview> 内部页面使用）
 * 
 * 注意：
 * - 这些方法通过 Electron 的 contextBridge 暴露到 window.$api；
 * - 宿主页面（host）若需要与 webview 交互，请通过 <webview> 的 ipc-message 事件接收 sendToHost 发来的消息，或直接在宿主中调用 preload 暴露的 window.api。
 */
interface WebviewAPI {
  /**
   * 触发下载（向主进程/宿主页面发送下载事件）
   * - 使用主进程预定义频道 'webview-download'
   * - 宿主页面可通过 window.api.onWebviewDownload 监听统一处理下载
   * @param data 下载数据（url、filename）
   */
  download: (data: WebviewDownloadData) => void

  /**
   * 向宿主页面发送消息（embedder），由宿主页面通过 <webview> 的 'ipc-message' 事件接收
   * @param channel 频道名称
   * @param args 变长参数（序列化后通过 IPC 发送）
   */
  sendToHost: (channel: string, ...args: any[]) => void

  /**
   * 获取一个可用的 GitHub 镜像站地址
   * - 主进程会测试预置镜像列表的可用性，返回第一个可用的地址
   * - 如均不可用，则返回空字符串
   */
  getAvailableGithubProxy: () => Promise<string>

  /**
   * 选择并读取文本文件（系统文件对话框）
   * - 主进程使用 chardet 进行编码检测，iconv-lite 解码；失败时回退 UTF-8
   * - 默认显示隐藏文件（dotfiles），并包含常见文本/代码/配置与 .xxxrc 扩展名过滤；可通过 opts.filters 自定义
   * @param opts 可选项：filters 文件过滤器（如不传使用默认）
   * @returns Promise<{
   *   success: boolean
   *   canceled?: boolean
   *   message?: string
   *   path?: string
   *   content?: string
   *   encoding?: string
   * }>
   */
  openTextFile: (opts?: { filters?: Array<{ name: string; extensions: string[] }> }) => Promise<{
    success: boolean
    canceled?: boolean
    message?: string
    path?: string
    content?: string
    encoding?: string
  }>

  /**
   * 运行内部命令（主进程封装，使用应用内“系统默认版本”软链接执行，不依赖系统 PATH）
   * - 可用于 ffmpeg/python/node 的后台执行
   * - 主进程通过 spawn 启动，不直接返回实时输出；可结合其他事件通道实现日志/进度回传（如需）
   * @param tool 工具名称（'ffmpeg' | 'python' | 'node'）
   * @param args 参数数组（无需手动加引号，主进程会通过 spawn 处理）
   * @param options 可选项（超时、命令 ID、分组 ID、工作目录）
   * @returns Promise<RunInternalCommandResult>
   */
  runInternalCommand: (tool: InternalCommandTool, args?: string[], options?: RunInternalCommandOptions) => Promise<RunInternalCommandResult>
  /**
   * 监听内部命令的实时输出（当 captureOutput='stream' 时生效）
   * @param callback 回调，参数包含 { commandId, groupId?, tool, type: 'stdout'|'stderr'|'exit', data?, code? }
   */
  onInternalCommandOutput: (callback: (payload: { commandId: string; groupId?: string; tool: InternalCommandTool; type: 'stdout'|'stderr'|'exit'; data?: string; code?: number }) => void) => void
  /**
   * 移除所有内部命令输出监听器
   */
  removeAllInternalCommandOutputListeners: () => void

  /**
   * 通过 commandId 终止单个内部命令进程
   * @param commandId 命令 ID（runInternalCommand 返回的 commandId）
   * @returns Promise<TerminateResult>
   */
  terminateInternalCommandById: (commandId: string) => Promise<TerminateResult>

  /**
   * 按 groupId 终止内部命令进程；不传 groupId 则终止所有当前运行中的内部命令
   * @param groupId 分组 ID（可选）
   * @returns Promise<{ success: boolean; terminated: number; message?: string }>
   */
  terminateInternalCommandsByGroup: (groupId?: string) => Promise<{ success: boolean; terminated: number; message?: string }>

  /**
   * 列出当前运行中的内部命令进程（仅返回由 runInternalCommand 启动并被主进程索引的进程）
   * @returns Promise<ListInternalCommandItem[]>
   */
  listInternalCommands: () => Promise<ListInternalCommandItem[]>
}

declare global {
  interface Window {
    /**
     * <webview> 内部页面可用的 API 集合（新名称统一为 $api）
     */
    $api: WebviewAPI
    onMessage: (key: 'change-theme', value: any) => void // 请不要删除，挂载在 window 上，用于接收主进程广播的消息
    /**
     * 通过主进程发起的网络请求封装，避免与原生 window.fetch 冲突
     * - 使用主进程的 node-fetch，并返回文本数据或错误信息
     * - 请求选项与返回值具备明确类型定义
     */
    $fetch: (url: string, options?: FetchRequestOptions) => Promise<FetchResponse>
  }
}

/**
 * $fetch 请求选项（精简版，覆盖常用字段）
 */
interface FetchRequestOptions {
  /** HTTP 方法，默认 GET */
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'HEAD' | 'OPTIONS'
  /** 请求头（键值对） */
  headers?: Record<string, string>
  /**
   * 请求体（文本或二进制）
   * - 若为对象请自行 JSON.stringify，并设置 headers['Content-Type'] = 'application/json'
   */
  body?: string | ArrayBuffer | Uint8Array | URLSearchParams | FormData
  /** 跟随重定向策略（默认 follow） */
  redirect?: 'follow' | 'manual' | 'error'
  /** 最大跟随重定向次数 */
  follow?: number
  /** 请求超时时间（毫秒） */
  timeout?: number
  /** 响应体最大尺寸（字节），超出将抛错 */
  size?: number
  /** 取消信号 */
  signal?: AbortSignal
}

/** 成功响应结构 */
type FetchSuccessResponse = {
  status: number
  statusText: string
  headers: Record<string, string>
  url: string
  ok: boolean
  /** 文本数据（如需 JSON 请在调用处 JSON.parse） */
  data: string
}

/** 失败响应结构 */
type FetchErrorResponse = {
  error: true
  message: string
  code: string
}

/** 综合返回类型（成功或失败） */
type FetchResponse = FetchSuccessResponse | FetchErrorResponse

// 导出主要类型，便于外部文件引用
export type {
  WebviewAPI,
  WebviewDownloadData,
  RunInternalCommandOptions,
  RunInternalCommandResult,
  TerminateResult,
  ListInternalCommandItem,
  InternalCommandTool,
}