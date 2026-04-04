<script setup>
import { onMounted, ref } from 'vue'

const container = ref(null)

onMounted(() => {
  const script = document.createElement('script')
  script.src = 'https://asciinema.org/a/788266.js'
  script.id = 'asciicast-788266'
  script.async = true
  // 将脚本插入到容器中
  if (container.value) {
    container.value.appendChild(script)
  }
})
</script>

<template>
  <div class="asciinema-wrapper">
    <div class="asciinema-container" ref="container">
      <!-- 脚本会被动态注入到这里 -->
    </div>
  </div>
</template>

<style scoped>
.asciinema-wrapper {
  margin: 3rem 0;
  width: 100%;
  display: flex;
  justify-content: center;
}

.asciinema-container {
  width: 100%;
  max-width: 1200px;
  min-height: 700px; /* 极大的最小高度，确保它不是个扁长条 */
  display: flex;
  justify-content: center;
  align-items: center; /* 垂直居中 */
  background: #1a1b26;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 20px 50px rgba(0,0,0,0.4);
}

/* 强制通过字体大小来撑大终端 */
:deep(pre.asciinema-terminal) {
  font-size: 24px !important; /* 极大字体，这会直接把终端撑得又高又大 */
  line-height: 1.3 !important;
  font-family: 'JetBrains Mono', 'Fira Code', monospace !important;
}

/* 强制覆盖内部容器，让它真正占据 100% 宽度 */
:deep(.asciinema-player-wrapper) {
  width: 100% !important;
  max-width: 100% !important;
  height: 100% !important;
}

/* 适配移动端 */
@media (max-width: 768px) {
  .asciinema-container {
    min-height: 300px;
  }
  :deep(pre.asciinema-terminal) {
    font-size: 14px !important;
  }
}
</style>
