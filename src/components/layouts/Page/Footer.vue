<script lang="ts" setup>
import IconExpo from '~icons/file-icons/expo'
import IconInsta from '~icons/fa/instagram'
import IconYoutube from '~icons/fa/youtube-play'
import IconFacebook from '~icons/fa/facebook-square'
import { FOOTER_DATA } from '~/assets/footerData'
const { t } = useI18n()
</script>

<template>
  <footer class="my-10 bg-white">
    <hr />
    <section class="my-5 py-5 px-10 max-w-screen-2xl mx-auto">
      <div
        class="grid md:grid-cols-3 lg:grid-cols-6 justify-items-start px-5 gap-y-10"
      >
        <div
          class="w-full md:col-span-2 lg:w-auto px-10 pb-5 lg:px-5 flex justify-center md:justify-start"
        >
          <div>
            <div class="mb-2">
              <NuxtLink to="/" class="font-bold text-3xl text-primary-500 flex">
                <IconExpo
                  class="font-black text-3xl font-mono mr-2 inline-block text-primary"
                />
                <span class="capitalize text-primary">VEXPO</span>
              </NuxtLink>
            </div>
            <el-button type="primary" plain color="#356DF1" class="w-full">
              <NuxtLink to="/contact">{{ t('page.menu.contact') }} </NuxtLink>
            </el-button>
          </div>
        </div>
        <div
          v-for="items in FOOTER_DATA"
          :key="items.id"
          class="w-full flex flex-col items-center md:items-start px-5"
        >
          <div class="font-bold mb-5 text-lg">
            <h4 class="title">
              {{ t(`footer.${items.parent}`) }}
            </h4>
            <div class="flex justify-center lg:justify-start">
              <hr class="w-10 border-b-2" />
            </div>
          </div>

          <ul class="flex flex-col items-center md:items-start md:w-auto">
            <li v-for="item in items.child" :key="item.id" class="pb-2.5">
              <a
                :href="`${item.link}`"
                target="_blank"
                rel="noopener"
                class="hover:text-primary"
              >
                {{ t(`footer.child.${item.name}`) }}
              </a>
            </li>
          </ul>
        </div>
      </div>
    </section>
    <section class="mt-10 px-5 bg-[#f5f7f8]">
      <div
        class="grid justify-items-center lg:flex lg:justify-between lg:flex-nowrap"
      >
        <div class="w-full lg:w-auto text-center p-4">
          @ 2023 <a href="/" class="text-primary">VExpo</a>. All rights reserved
        </div>

        <div class="flex items-center p-4">
          <p>{{ t('footer.connect_with_us') }}</p>

          <ul class="flex mx-5">
            <li class="ms-2">
              <a
                href="https://www.facebook.com/1fimo"
                target="_blank"
                aria-label="Facebook"
                class="hover:text-primary"
              >
                <IconFacebook width="24" />
              </a>
            </li>
            <li class="ms-2">
              <a
                href="https://www.youtube.com/@1fimo"
                target="_blank"
                aria-label="Youtube"
                class="hover:text-red"
              >
                <IconYoutube width="24" />
              </a>
            </li>
            <li class="ms-2">
              <a
                href="https://instargram.com"
                target="_blank"
                aria-label="Instargram"
                class="hover:text-red"
              >
                <IconInsta width="24" />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </section>
  </footer>
</template>
