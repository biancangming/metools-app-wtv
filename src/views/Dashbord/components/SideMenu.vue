<template>
  <n-button class="!w-[200px] !mt-2" type="primary" ghost @click="changeFile">
    <template #icon>
      <n-icon>
        <VideocamOutlineIcon />
      </n-icon>
    </template>
    选择m3u/txt
  </n-button>
  <div>
    <n-button class="!w-[200px] !mt-2" type="primary" @click="$emit('check')" v-if="!process" :disabled="!isImport">
      <template #icon>
        <n-icon>
          <CaretBackCircleOutlineIcon />
        </n-icon>
      </template>
      开始检测
    </n-button>
    <n-button class="!w-[200px] !mt-2" type="error" @click="$emit('cancel')" v-if="process">
      <template #icon>
        <n-icon>
          <RemoveCircleOutlineIcon />
        </n-icon>
      </template>
      停止检测
    </n-button>
  </div>
  <n-button class="!w-[200px] !mt-2" type="info" @click="$emit('export', '')">
    <template #icon>
      <n-icon>
        <ArrowUndoCircleSharpIcon />
      </n-icon>
    </template>
    导出
  </n-button>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import {
  VideocamOutline as VideocamOutlineIcon,
  DocumentText as DocumentTextIcon,
  CaretBackCircleOutline as CaretBackCircleOutlineIcon,
  ArrowUndoCircleSharp as ArrowUndoCircleSharpIcon,
  RemoveCircleOutline as RemoveCircleOutlineIcon,
  ShieldCheckmarkOutline as ShieldCheckmarkOutlineIcon,
} from "@vicons/ionicons5";
import { readerHandleTxt } from "@/utils/file";
import { readerHandleM3u } from '../../../utils/file';
import { useOriginData } from "@/store/originFormatData";
import { message } from "@/utils/data";
export default defineComponent({
  props: {
    process: {
      default: false, //是否已经开始
      type: Boolean,
    },
    isImport: {
      //是否已导入文件
      default: false,
      type: Boolean,
    },
  },
  emits: {
    getM3u: null,
    check: null,
    cancel: null,
    exportM3u: null,
    export: null,
  },
  components: {
    VideocamOutlineIcon,
    DocumentTextIcon,
    CaretBackCircleOutlineIcon,
    ArrowUndoCircleSharpIcon,
    RemoveCircleOutlineIcon,
    ShieldCheckmarkOutlineIcon,
  },
  setup(props, { emit }) {
    const { importTxt, hasImport } = useOriginData()
    const accept = ".m3u,.m3u8,.txt";

    // 本地文件导入逻辑
    async function changeFile() {
      const webviewApi = (window as any).$api
      try {
        if (!webviewApi?.openTextFile) {
          message.error('未找到 $api.openTextFile，请确认 webview 预加载脚本已注入')
          return
        }
        const res = await webviewApi.openTextFile({
          filters: [{ name: 'Playlist', extensions: ['m3u', 'm3u8', 'txt'] }]
        })
        if (!res || res.canceled) {
          return
        }
        if (!res.success) {
          message.error(res.message || '读取文件失败')
          return
        }
        const path = res.path || ''
        const data = res.content || ''
        if (!path || !data) {
          message.warning('未选择文件或文件内容为空')
          return
        }
        const suffix = path.slice(path.lastIndexOf('.'), path.length)
        if (suffix.indexOf('m3u') > -1) {
          emit('getM3u', readerHandleM3u(data), 'local')
          importTxt(data, 'm3u')
        } else {
          emit('getM3u', readerHandleTxt(data), 'local')
          importTxt(data, 'txt')
        }
      } catch (err: any) {
        message.error(err?.message || '读取文件发生异常')
      }
    }

    return {
      changeFile,
      accept,
      hasImport,
    };
  },
});
</script>
<!-- 移除 scoped 样式以避免覆盖 Tailwind 类 -->
