import { ElMessageBox } from 'element-plus'

export const preload = () => {
  window.addEventListener('vite:preloadError', () => {
    ElMessageBox.alert('新的版本更新', '提示', {
      confirmButtonText: '确定',
      callback: window.location.reload
    })
  })
}
