// 全局 Window 接口扩展：为宿主页面提供 api / eApi / eUtils 的类型提示
export {}

declare global {
  interface Window {
    /**
     * 宿主页面可用的 API（由 preload 或外部环境注入）
     */
    api?: {
      /**
       * 执行命令并返回输出（用于 ffmpeg 等探测场景）
       */
      executeCommand: (command: string) => Promise<{
        output?: string | Buffer
        error?: string | Buffer
      }>

      /**
       * 运行内部命令（长时间运行的后台任务）
       */
      runInternalCommand: (
        tool: 'ffmpeg' | 'python' | 'node',
        args?: string[],
        options?: {
          timeoutMs?: number
          commandid?: string
          groupid?: string
          cwd?: string
        }
      ) => Promise<{
        success: boolean
        commandId: string
        groupId?: string
        pid?: number
        message?: string
      }>

      /**
       * 通过 commandId 终止单个内部命令
       */
      terminateInternalCommandById: (commandId: string) => Promise<{
        success: boolean
        message?: string
      }>

      /**
       * 按 groupId 终止内部命令；不传 groupId 则终止所有当前运行中的内部命令
       */
      terminateInternalCommandsByGroup: (groupId?: string) => Promise<{
        success: boolean
        terminated: number
        message?: string
      }>

      /**
       * 列出当前运行中的内部命令
       */
      listInternalCommands: () => Promise<Array<{
        id: string
        groupId?: string
        tool: 'ffmpeg' | 'python' | 'node'
        pid: number
        startAt: number
        timeoutMs?: number
      }>>
    }

    /**
     * 额外的宿主工具 API（可选）
     */
    eApi?: {
      writeClipboardText?: (text: string) => void
      readFileDialogAsText?: () => Promise<{ path: string; data: string }>
      readFileAsText?: (path: string) => Promise<string>
      getClipboardText?: () => string | Promise<string>
    }

    /**
     * 杂项工具集（可选）
     */
    eUtils?: {
      closePorcess?: (id: string) => Promise<void> | void
    }

    /**
     * 宿主用于传递消息的回调（例如主题切换）。
     * 约定：key 为消息类型，msg 为内容，例如 key='theme-change', msg='light'|'dark'
     */
    onMessage?: (key: string, msg: string) => void
  }
}