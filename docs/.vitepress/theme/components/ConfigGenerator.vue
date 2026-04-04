<script setup>
import { reactive, computed, ref } from 'vue'
import { useData } from 'vitepress'

const { lang } = useData()

// 翻译字典
const t = computed(() => {
  const isZh = lang.value === 'zh-CN'
  const prefix = isZh ? '如 ' : 'e.g. '
  return {
    basic: isZh ? '1. 基础设置' : '1. Basic Settings',
    botName: isZh ? '机器人名称' : 'Bot Name',
    botNamePlaceholder: prefix + 'Xinbot',
    onlineMode: isZh ? '正版登录' : 'Online Mode',
    password: isZh ? '服务器密码' : 'Server Password',
    passwordHint: isZh ? '离线模式下必填' : 'Required for offline mode',
    owner: isZh ? '主人名称' : 'Owner Name',
    ownerPlaceholder: prefix + 'huangdihd',
    plugin: isZh ? '2. 插件设置' : '2. Plugin Settings',
    pluginDir: isZh ? '插件目录' : 'Plugin Directory',
    pluginDirPlaceholder: prefix + 'plugin',
    proxy: isZh ? '3. 代理设置' : '3. Proxy Settings',
    enableProxy: isZh ? '启用代理' : 'Enable Proxy',
    proxyAddr: isZh ? '代理地址' : 'Proxy Address',
    proxyAddrPlaceholder: prefix + '127.0.0.1:1080',
    proxyType: isZh ? '代理类型' : 'Proxy Type',
    proxyUser: isZh ? '代理用户名' : 'Proxy Username',
    proxyPass: isZh ? '代理密码' : 'Proxy Password',
    optional: isZh ? '（可选）' : ' (Optional)',
    preview: isZh ? '实时预览' : 'Live Preview',
    copy: isZh ? '复制配置' : 'Copy Config',
    copied: isZh ? '已复制!' : 'Copied!',
    validationError: isZh ? '请填写必填项以复制配置' : 'Please fill required fields to copy'
  }
})

const config = reactive({
  name: '',
  onlineMode: false,
  password: '',
  owner: '',
  enableTranslation: true,
  plugin: {
    directory: 'plugin'
  },
  proxy: {
    enable: false,
    address: '',
    type: 'SOCKS5',
    username: '',
    password: ''
  }
})

// 校验逻辑
const isValid = computed(() => {
  const hasName = config.name.trim() !== ''
  // owner 设为可选，不再检查
  const passwordValid = config.onlineMode || config.password.trim() !== ''
  const proxyValid = !config.proxy.enable || config.proxy.address.trim() !== ''
  return hasName && passwordValid && proxyValid
})

// 生成用于预览的配置（隐藏密码）
const previewConfig = computed(() => {
  const mask = (val) => val ? '*'.repeat(val.length) : ''
  return `{
    "account" : {
        "fullSession" : null,
        "name" : "${config.name}",
        "onlineMode" : ${config.onlineMode},
        "password" : "${mask(config.password)}"
    },
    "enableTranslation" : ${config.enableTranslation},
    "owner" : "${config.owner}",
    "plugin" : {
        "directory" : "${config.plugin.directory}"
    },
    "proxy" : {
        "enable" : ${config.proxy.enable},
        "info" : {
            "address" : "${config.proxy.address}",
            "type" : "${config.proxy.type}",
            "password" : "${mask(config.proxy.password)}",
            "username" : "${config.proxy.username}"
        }
    }
}`
})

// 生成用于复制的配置（真实内容）
const realConfig = computed(() => {
  return `{
    "account" : {
        "fullSession" : null,
        "name" : "${config.name}",
        "onlineMode" : ${config.onlineMode},
        "password" : "${config.password}"
    },
    "enableTranslation" : ${config.enableTranslation},
    "owner" : "${config.owner}",
    "plugin" : {
        "directory" : "${config.plugin.directory}"
    },
    "proxy" : {
        "enable" : ${config.proxy.enable},
        "info" : {
            "address" : "${config.proxy.address}",
            "type" : "${config.proxy.type}",
            "password" : "${config.proxy.password}",
            "username" : "${config.proxy.username}"
        }
    }
}`
})

const isCopied = ref(false)
const copyToClipboard = () => {
  if (!isValid.value) return
  navigator.clipboard.writeText(realConfig.value)
  isCopied.value = true
  setTimeout(() => (isCopied.value = false), 2000)
}
</script>

<template>
  <div class="config-generator-container">
    <div class="form-section">
      <h3>{{ t.basic }}</h3>
      <div class="field">
        <label>{{ t.botName }} <span class="req">*</span></label>
        <input v-model="config.name" type="text" :placeholder="t.botNamePlaceholder" />
      </div>
      <div class="field checkbox">
        <input v-model="config.onlineMode" type="checkbox" id="onlineMode" />
        <label for="onlineMode">{{ t.onlineMode }}</label>
      </div>
      <div class="field" v-if="!config.onlineMode">
        <label>{{ t.password }} <span class="req">*</span></label>
        <input v-model="config.password" type="password" :placeholder="t.passwordHint" />
      </div>
      <div class="field">
        <label>{{ t.owner }}{{ t.optional }}</label>
        <input v-model="config.owner" type="text" :placeholder="t.ownerPlaceholder" />
      </div>

      <h3>{{ t.plugin }}</h3>
      <div class="field">
        <label>{{ t.pluginDir }}</label>
        <input v-model="config.plugin.directory" type="text" :placeholder="t.pluginDirPlaceholder" />
      </div>

      <h3>{{ t.proxy }}</h3>
      <div class="field checkbox">
        <input v-model="config.proxy.enable" type="checkbox" id="proxyEnable" />
        <label for="proxyEnable">{{ t.enableProxy }}</label>
      </div>
      <div v-if="config.proxy.enable" class="proxy-fields">
        <div class="field">
          <label>{{ t.proxyType }}</label>
          <select v-model="config.proxy.type">
            <option>HTTP</option>
            <option>SOCKS4</option>
            <option>SOCKS5</option>
          </select>
        </div>
        <div class="field">
          <label>{{ t.proxyAddr }} <span class="req">*</span></label>
          <input v-model="config.proxy.address" type="text" :placeholder="t.proxyAddrPlaceholder" />
        </div>
        <div class="field">
          <label>{{ t.proxyUser }}{{ t.optional }}</label>
          <input v-model="config.proxy.username" type="text" />
        </div>
        <div class="field">
          <label>{{ t.proxyPass }}{{ t.optional }}</label>
          <input v-model="config.proxy.password" type="password" />
        </div>
      </div>
    </div>

    <div class="preview-section">
      <h3>{{ t.preview }}</h3>
      <div class="code-header">
        <span>config.conf</span>
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
      <pre class="code-block"><code>{{ previewConfig }}</code></pre>
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
  min-width: 300px;
  max-width: 380px;
  background: var(--vp-c-bg-soft);
  padding: 1.5rem;
  border-radius: 8px;
  border: 1px solid var(--vp-c-divider);
}

.preview-section {
  flex: 3;
  min-width: 400px;
  position: sticky;
  top: 100px;
}

.field {
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
}

.field.checkbox {
  flex-direction: row;
  align-items: center;
  gap: 0.5rem;
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

input[type="text"],
input[type="password"],
select {
  padding: 0.6rem;
  border-radius: 4px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  width: 100%;
  transition: border-color 0.25s;
  box-sizing: border-box;
}

input:focus, select:focus {
  border-color: var(--vp-c-brand);
  outline: none;
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
  min-height: 480px;
}

h3 {
  margin-top: 0;
  margin-bottom: 1.2rem;
  border: none;
  font-size: 1.15rem;
  font-weight: 700;
  color: var(--vp-c-text-1);
}

.proxy-fields {
  border-left: 3px solid var(--vp-c-brand);
  padding: 1.2rem 1.5rem 0.2rem 1.5rem;
  margin-top: 1rem;
  margin-bottom: 1.5rem;
  background: var(--vp-c-bg-alt);
  border-radius: 0 8px 8px 0;
}

@media (max-width: 960px) {
  .config-generator-container {
    gap: 1.5rem;
  }
  .form-section {
    max-width: 100%;
  }
  .preview-section {
    position: static;
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
