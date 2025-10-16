// Minimal ambient declarations for crypto-js to satisfy TypeScript in this project.
// If available, prefer installing official types: npm i --save-dev @types/crypto-js
declare module 'crypto-js' {
  const CryptoJS: any
  export default CryptoJS
  export const AES: any
  export const enc: any
  export const mode: any
  export const pad: any
}