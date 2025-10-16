import { M3UObject } from '@/utils/file';
import { getStreamFFmpegArgs, getStreamInfo } from '@/utils/util'

export function useCheck() {
  // 为本次检测会话生成唯一的分组 ID（使用纯数字随机数，避免与其他会话重复）
  const groupId = `${Date.now()}-${Math.floor(Math.random() * 1_000_000)}`
  function createRequest(m3u8: M3UObject): Promise<{ width: number, height: number, speed: number, fps: number, codec: string }> {
    return new Promise(async (resolve, reject) => {
      const start = new Date().getTime()

      // 原力链接检测
      // const lowUrl = m3u8.url.toLocaleLowerCase()
      // let isForceTv = false
      // let forceTvUrl = ""
      // if (lowUrl.startsWith("p2p://") || lowUrl.startsWith("p8p://") || lowUrl.startsWith("mitv://")) {
      //   const sp = lowUrl.split("/")
      //   const server = sp[2]
      //   const channel = sp[3]
      //   await window.eUtils.execPorcess({
      //     root: "forcetv/forcetv.exe",
      //     timeout: 10 * 1000,
      //     args: `-s ${server} -c ${channel} -o ${port}`,
      //     name: `forcetv-${name}`,
      //   })
      //   forceTvUrl = `http://127.0.0.1:9906/${channel}.ts`
      //   isForceTv = true
      //   port++
      //   if (port > 9900) port = 9106
      // }

      // 通过 util.getStreamFFmpegArgs 生成更完整的 ffmpeg 命令，并启用输出捕获
      const ffArgs = getStreamFFmpegArgs(m3u8.url, 'h264')
      window.$api!
        .runInternalCommand('ffmpeg', ffArgs, { timeoutMs: 10 * 1000, groupid: groupId, captureOutput: 'collect' })
        .then((result) => {
          console.log('ffmpeg result:', result)
          const speed = new Date().getTime() - start
          // 解析 ffmpeg stderr 中的探测信息（分辨率、编码、帧率）
          if (result?.success) {
            const info = getStreamInfo(result?.stderr || '', false) || { width: 0, height: 0, fps: 0, codec: '' }
            resolve({ ...info, speed })
          } else {
            reject(new Error(result?.message || 'runInternalCommand failed'))
          }
        })
        .catch(reject)
    })
  }

  function stopCheck() {
    // 终止当前检测分组下的所有内部命令（与 runInternalCommand 保持同一 groupId）
    void window.$api!.terminateInternalCommandsByGroup(groupId).catch((err) => {
      console.warn('terminateInternalCommandsByGroup failed:', err)
    })
  }

  return {
    createRequest,
    stopCheck
  }
}
