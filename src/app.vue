<template>
  <n-config-provider :locale="zhCN" :date-locale="dateZhCN" :theme="NaiveTheme">
    <n-loading-bar-provider>
      <n-message-provider>
        <n-notification-provider>
          <n-dialog-provider>
            <router-view></router-view>
            <GroupDialog/>
          </n-dialog-provider>
        </n-notification-provider>
      </n-message-provider>
    </n-loading-bar-provider>
  </n-config-provider>
</template>

<script lang="ts" setup>
import { zhCN, dateZhCN } from "naive-ui";
import { darkTheme, lightTheme } from 'naive-ui'
import GroupDialog from "./components/GroupDialog.vue";

import { useWebviewMsgStore } from "./store/webviewMsg";

const webviewMsgStore = useWebviewMsgStore()

const NaiveTheme = computed(()=> {
    return webviewMsgStore.themeMode === 'dark' ? darkTheme : lightTheme
})

// 初始立即设置一次，以确保 Tailwind 的 dark: 变体和 NaiveUI 主题与当前模式一致
watch(()=> webviewMsgStore.themeMode, (newVal)=> {
    if(newVal === 'dark'){
        document.documentElement.classList.add('dark')
    }else{
        document.documentElement.classList.remove('dark')
    }
}, { immediate: true })
</script>
