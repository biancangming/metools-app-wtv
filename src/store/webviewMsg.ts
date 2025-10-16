import { defineStore } from "pinia"

export const useWebviewMsgStore = defineStore('webviewMsg', () => {
    // 初始值跟随系统主题偏好：暗色或亮色
    const prefersDark = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
    const themeMode = ref<'dark' | 'light' | 'system'>(prefersDark ? 'dark' : 'light')
    let isSysThemeMode = false
    let isChange = false

    /**
   * 检测系统主题偏好
   */
  const detectSystemTheme = () => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
      
      // 只有在系统模式下才更新系统主题状态
      if (isSysThemeMode) {
        themeMode.value = mediaQuery.matches ? 'dark' : 'light'
      }
      
      // 监听系统主题变化
      mediaQuery.addEventListener('change', (e) => {
        if (isSysThemeMode) {
          themeMode.value = e.matches ? 'dark' : 'light'
        }
      })
    }
  }

    onMounted(() => {
        // 宿主消息驱动的主题切换（优先级更高）
        if (!window.onMessage) {
            window.onMessage = (key: string, msg: string) => {
                if (key === 'theme-change') {
                    if (msg === 'system') {
                        isSysThemeMode = true
                        detectSystemTheme()
                        return
                    }
                    isSysThemeMode = false
                    themeMode.value = msg as 'dark' | 'light' | 'system'
                    document.documentElement.classList.remove('dark', 'light')
                    document.documentElement.classList.add(msg)
                }
            }
        }

        // 跟随系统主题变化（如果宿主未强制设置，也能生效）
        if (window.matchMedia && !isChange) {
            const mq = window.matchMedia('(prefers-color-scheme: dark)')
            const handler = (e: MediaQueryListEvent) => {
                if (isSysThemeMode) {
                    themeMode.value = e.matches ? 'dark' : 'light'
                }
            }

            mq.addEventListener('change', handler)
            isChange = true
        }
    })

    return {
        themeMode
    }
})