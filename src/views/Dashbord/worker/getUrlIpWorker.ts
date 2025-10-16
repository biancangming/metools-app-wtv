const ipv4Reg = /^(((\d{1,2})|(1\d{2})|(2[0-4]\d)|(25[0-5]))\.){3}((\d{1,2})|(1\d{2})|(2[0-4]\d)|(25[0-5]))$/;
self.addEventListener("message", (res) => {
    const u = new URL(res.data)
    if(!ipv4Reg.test(u.hostname)) return undefined
    // 不再请求外部域名，直接返回主机名信息或空对象
    self.postMessage({ ip: u.hostname })
})