<template>
  <div class="space-y-3 text-sm">
    <div class="px-4">
      <label class="font-semibold">{{ t('language') }}</label>
      <el-select
        v-model="language"
        filterable
        class="w-full px-2 pr-3 py-1 outline-none rounded bg-transparent text-gray-700 border-gray-900/10"
      >
        <el-option
          v-for="lang in locales"
          :key="typeof lang === 'object' ? lang.code : lang"
          :value="typeof lang === 'object' ? lang.code : lang"
          :label="t(typeof lang === 'object' ? lang.code : lang)"
        >
          <div class="flex items-center">
            <icon-flag-england
              v-if="(typeof lang === 'object' ? lang.code : lang) === 'en'"
            />
            <icon-flag-vietnam
              v-else-if="(typeof lang === 'object' ? lang.code : lang) === 'vi'"
            />
            <icon-flag-japan
              v-else-if="(typeof lang === 'object' ? lang.code : lang) === 'ja'"
            />
            <span class="ms-2">
              {{ typeof lang === 'object' ? lang.name : lang }}
            </span>
          </div>
        </el-option>
      </el-select>
    </div>
  </div>
</template>

<script setup>
import IconFlagEngland from '~icons/twemoji/flag-england'
import IconFlagJapan from '~icons/twemoji/flag-japan'
import IconFlagVietnam from '~icons/twemoji/flag-vietnam'
const { locales, locale, setLocale } = useI18n()
const language = computed({
  get: () => locale.value,
  set: (value) => setLocale(value),
})
const { t } = useI18n()
</script>

<style></style>
