<script lang="ts" setup>
import IconFlagEngland from '~icons/twemoji/flag-england'
import IconFlagVietnam from '~icons/twemoji/flag-vietnam'
import IconFlagJapan from '~icons/twemoji/flag-japan'
const props = defineProps({
  type: {
    type: String,
    default: 'dropdown-right-top',
  },
})
const { t } = useI18n()
const { locales, locale, setLocale } = useI18n()

// using computed to get and set locale
const language = computed({
  get: () => locale.value,
  set: (value) => setLocale(value),
})

const currentStyle = toRef(props, 'type')
</script>

<template>
  <div class="flex items-center">
    <client-only>
      <HeadlessListbox
        v-if="currentStyle === 'dropdown-right-top'"
        v-model="language"
        as="div"
        class="relative flex items-center"
      >
        <HeadlessListboxLabel class="sr-only">{{
          t('language')
        }}</HeadlessListboxLabel>
        <HeadlessListboxButton type="template">
          <a class="text-gray-600">
            <span class="flex justify-center items-center">
              <icon-flag-vietnam v-if="locale === 'vi'" class="w-6 h-6" />
              <icon-flag-england v-else-if="locale === 'en'" class="w-6 h-6" />
              <icon-flag-japan v-else-if="locale === 'ja'" class="w-6 h-6" />
            </span>
          </a>
        </HeadlessListboxButton>
        <HeadlessListboxOptions
          class="p-1 absolute z-50 origin-top-right top-full right-0 outline-none bg-white rounded-lg ring-1 ring-gray-900/10 shadow-lg overflow-hidden w-36 py-1 text-sm text-gray-700 font-semibold"
        >
          <HeadlessListboxOption
            v-for="lang in locales"
            :key="typeof lang === 'object' ? lang.code : lang"
            :value="typeof lang === 'object' ? lang.code : lang"
            class="py-2 px-2 flex items-center cursor-pointer hover:bg-gray-100"
          >
            <span class="text-sm mr-2 flex items-center">
              <icon-flag-vietnam
                v-if="(typeof lang === 'object' ? lang.code : lang) === 'vi'"
              />
              <icon-flag-england
                v-else-if="
                  (typeof lang === 'object' ? lang.code : lang) === 'en'
                "
              />

              <icon-flag-japan
                v-else-if="
                  (typeof lang === 'object' ? lang.code : lang) === 'ja'
                "
              />
            </span>
            {{ typeof lang === 'object' ? lang.name : lang }}
          </HeadlessListboxOption>
        </HeadlessListboxOptions>
      </HeadlessListbox>
    </client-only>
  </div>
</template>
