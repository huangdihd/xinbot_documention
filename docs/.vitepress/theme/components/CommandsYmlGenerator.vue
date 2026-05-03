<script setup>
import { reactive, computed, ref } from 'vue'
import { useData } from 'vitepress'

const { lang } = useData()

const t = computed(() => {
  const isZh = lang.value === 'zh-CN'
  const prefix = isZh ? '例如: ' : 'e.g. '
  return {
    commandInfo: isZh ? '命令信息' : 'Command Info',
    commandName: isZh ? '命令名' : 'Command Name',
    commandNamePlaceholder: prefix + 'hello',
    executor: isZh ? '执行器全限定名' : 'Executor Class',
    executorPlaceholder: prefix + 'com.example.plugin.HelloExecutor',
    description: isZh ? '描述' : 'Description',
    descriptionPlaceholder: isZh ? '在 /help 中显示的描述' : 'Description shown in /help',
    usage: isZh ? '用法' : 'Usage',
    usagePlaceholder: prefix + 'hello [name]',
    aliases: isZh ? '别名' : 'Aliases',
    aliasesPlaceholder: isZh ? '如 hi' : 'e.g. hi',
    aliasesAdd: isZh ? '添加别名' : 'Add Alias',
    optional: isZh ? '（可选）' : ' (Optional)',
    preview: isZh ? '实时预览' : 'Live Preview',
    copy: isZh ? '复制配置' : 'Copy Config',
    copied: isZh ? '已复制!' : 'Copied!',
    validationError: isZh ? '请填写必填项以复制配置' : 'Please fill required fields to copy'
  }
})

const config = reactive({
  name: '',
  executor: '',
  description: '',
  usage: '',
  aliases: []
})

const addAlias = () => {
  config.aliases.push('')
}

const removeAlias = (index) => {
  config.aliases.splice(index, 1)
}

const isValid = computed(() => {
  return config.name.trim() !== '' && config.executor.trim() !== ''
})

const generatedYaml = computed(() => {
  const cmdName = config.name || 'cmd_name'
  let yaml = `${cmdName}:\n`
  
  if (config.description.trim() !== '') {
    yaml += `  description: "${config.description}"\n`
  }
  
  if (config.usage.trim() !== '') {
    yaml += `  usage: "${config.usage}"\n`
  }
  
  if (config.aliases.length > 0) {
    const aliasList = config.aliases.map(a => a.trim()).filter(a => a !== '')
    if (aliasList.length > 0) {
      if (aliasList.length === 1) {
        yaml += `  aliases: "${aliasList[0]}"\n`
      } else {
        yaml += `  aliases: [${aliasList.map(a => `"${a}"`).join(', ')}]\n`
      }
    }
  }

  yaml += `  executor: "${config.executor || 'com.example.plugin.MyExecutor'}"\n`
  
  return yaml
})

const isCopied = ref(false)
const copyToClipboard = () => {
  if (!isValid.value) return
  navigator.clipboard.writeText(generatedYaml.value)
  isCopied.value = true
  setTimeout(() => (isCopied.value = false), 2000)
}
</script>

<template>
  <div class="config-generator-container">
    <div class="form-section">
      <h3>{{ t.commandInfo }}</h3>
      <div class="field">
        <label>{{ t.commandName }} <span class="req">*</span></label>
        <input v-model="config.name" type="text" :placeholder="t.commandNamePlaceholder" />
      </div>
      <div class="field">
        <label>{{ t.executor }} <span class="req">*</span></label>
        <input v-model="config.executor" type="text" :placeholder="t.executorPlaceholder" />
      </div>
      <div class="field">
        <label>{{ t.description }}{{ t.optional }}</label>
        <input v-model="config.description" type="text" :placeholder="t.descriptionPlaceholder" />
      </div>
      <div class="field">
        <label>{{ t.usage }}{{ t.optional }}</label>
        <input v-model="config.usage" type="text" :placeholder="t.usagePlaceholder" />
      </div>
      <div class="field">
        <label>{{ t.aliases }}{{ t.optional }}</label>
        <div v-for="(alias, index) in config.aliases" :key="index" class="list-item">
          <input v-model="config.aliases[index]" type="text" :placeholder="t.aliasesPlaceholder" />
          <button @click="removeAlias(index)" class="remove-btn" title="Remove">×</button>
        </div>
        <button @click="addAlias" class="add-btn">+ {{ t.aliasesAdd }}</button>
      </div>
    </div>

    <div class="preview-section">
      <h3>{{ t.preview }}</h3>
      <div class="code-header">
        <span>commands.yml</span>
        <div class="btn-group">
          <span v-if="!isValid" class="warning-text">{{ t.validationError }}</span>
          <button 
            @click="copyToClipboard" 
            class="copy-btn" 
            :class="{ copied: isCopied, disabled: !isValid }"
            :disabled="!isValid"
          >
            {{ isCopied ? t.copied : t.copy }}
          </button>
        </div>
      </div>
      <pre class="code-block"><code>{{ generatedYaml }}</code></pre>
    </div>
  </div>
</template>

<style scoped>
.config-generator-container {
  display: flex;
  gap: 2.5rem;
  width: 100%;
  margin-top: 1.5rem;
  flex-wrap: wrap;
  align-items: flex-start;
}

.form-section {
  flex: 1;
  width: 100%;
  max-width: 380px;
  background: var(--vp-c-bg-soft);
  padding: 1.5rem;
  border-radius: 8px;
  border: 1px solid var(--vp-c-divider);
  min-width: 0;
}

.preview-section {
  flex: 3;
  width: 100%;
  min-width: 0;
  position: sticky;
  top: 100px;
}

.field {
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
}

label {
  font-size: 0.9rem;
  font-weight: 600;
  margin-bottom: 0.3rem;
  color: var(--vp-c-text-1);
}

.req {
  color: #ef4444 !important;
  margin-left: 2px;
  font-weight: bold;
}

input[type="text"] {
  padding: 0.6rem;
  border-radius: 4px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  width: 100%;
  transition: border-color 0.25s;
  box-sizing: border-box;
}

input:focus {
  border-color: var(--vp-c-brand);
  outline: none;
}

.list-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}

.remove-btn {
  background: var(--vp-c-danger-3);
  color: white;
  border: none;
  width: 24px;
  height: 24px;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  line-height: 1;
  transition: background 0.2s;
  flex-shrink: 0;
}

.remove-btn:hover {
  background: var(--vp-c-danger-1);
}

.add-btn {
  background: transparent;
  color: var(--vp-c-brand-1);
  border: 1px dashed var(--vp-c-brand-1);
  padding: 0.4rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.85rem;
  transition: all 0.2s;
  width: 100%;
  margin-top: 0.2rem;
}

.add-btn:hover {
  background: var(--vp-c-brand-soft);
}

.code-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: var(--vp-code-block-bg);
  padding: 0.6rem 1rem;
  border-radius: 8px 8px 0 0;
  border-bottom: 1px solid var(--vp-c-divider);
  color: var(--vp-c-text-2);
  font-size: 0.85rem;
}

.btn-group {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.warning-text {
  color: #ef4444;
  font-size: 0.75rem;
  font-weight: 600;
}

.copy-btn {
  background: var(--vp-c-brand-1);
  color: white;
  border: none;
  padding: 0.35rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.8rem;
  transition: all 0.2s;
  font-weight: 600;
}

.copy-btn.disabled {
  background: var(--vp-c-gray-1) !important;
  opacity: 0.5;
  cursor: not-allowed;
  color: var(--vp-c-text-3) !important;
}

:deep(.dark) .copy-btn {
  background: var(--vp-c-brand-3);
  color: var(--vp-c-text-1);
}

:deep(.dark) .copy-btn.disabled {
  background: var(--vp-c-bg-alt) !important;
}

:deep(.dark) .copy-btn:hover:not(.disabled) {
  background: var(--vp-c-brand-2);
}

.copy-btn.copied {
  background: var(--vp-c-green-1) !important;
  color: white !important;
}

.code-block {
  margin: 0;
  padding: 1.2rem;
  background: var(--vp-code-block-bg);
  border-radius: 0 0 8px 8px;
  font-size: 0.9rem;
  line-height: 1.5;
  overflow-x: auto;
  color: var(--vp-c-brand-light);
  min-height: 250px;
}

h3 {
  margin-top: 0;
  margin-bottom: 1.2rem;
  border: none;
  font-size: 1.15rem;
  font-weight: 700;
  color: var(--vp-c-text-1);
}

@media (max-width: 960px) {
  .config-generator-container {
    flex-direction: column;
    gap: 1.5rem;
  }
  .form-section {
    max-width: 100%;
  }
  .preview-section {
    position: static;
    width: 100%;
  }
  .btn-group {
    flex-direction: column;
    align-items: flex-end;
    gap: 0.2rem;
  }
  .code-block {
    min-height: auto;
  }
}
</style>
