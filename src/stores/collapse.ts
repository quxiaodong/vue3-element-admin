import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useCollapseStore = defineStore('collapse', () => {
  // false是展开
  const collapse = ref(false)

  /**
   * 切换collapse状态
   * @param value 是否展开闭合
   */
  const toggleCollapse = (value?: boolean) => {
    if (value !== undefined) {
      // 如果传值，就赋值
      collapse.value = value
    } else {
      // 没有传值，就取反
      collapse.value = !collapse.value
    }
  }

  return { collapse, toggleCollapse }
})
