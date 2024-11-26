<template>
  <div class="w-full">
    <!-- Side -->
    <div class="bg-gradient-to-r from-green-50 to-blue-300 p-16 text-center">
      <div>
        <h1 class="text-[43px] mb-[10px] font-bold">
          <span>{{ t('index.pricing_title1') }}</span>
          <br />
          {{ t('index.pricing_title2') }}
        </h1>

        <p class="text-[24px] max-w-[1100px] m-auto">
          {{ t('index.pricing_detail') }}
        </p>
      </div>
    </div>

    <!-- content -->
    <div class="py-[84px] w-[95%] lg:w-[85%] mx-auto">
      <ul
        class="flex justify-center bg-white px-4 py-3 shadow-md rounded-full max-w-550 w-full lg:w-[70%] mx-auto mb-16"
      >
        <li
          v-for="tab in TABS_PRICING"
          :key="tab.id"
          class="w-full text-accent text-[24px] text-center cursor-pointer py-[15px]"
          :class="tabCurrent === tab.id ? 'active' : ''"
          @click="handleTabCurrent(tab.id)"
        >
          <span> {{ tab.name }}</span>
        </li>
      </ul>

      <div v-if="tabCurrent === 1" class="w-[95%] mx-auto xl:w-[75%]">
        <PricingAnnualPlan />
        <PricingFeature />
      </div>

      <span v-else>
        <PricingEventProduct />
      </span>
    </div>

    <!-- slide -->
    <div class="bg-[#FBF4FF] py-[80px]">
      <div class="flex flex-col lg:flex-row max-w-[1440px] mx-auto lg:mx-[5%]">
        <div
          class="w-[90%] mx-auto lg:w-[45%] text-[#000] mb-[40px] lg:mb-[0px]"
        >
          <h2 class="text-[47px] font-bold mb-[30px]">
            {{ t('pricings.slide-title') }}
          </h2>
          <p class="text-[24px] text-[#000] line-[34px]">
            {{ t('pricings.slide-detail') }}
          </p>
          <button
            class="mt-[40px] px-[30px] py-[15px] rounded-[25px] text-[#fff] text-[18px] font-bold bg-gradient-to-r from-blue-500 to-purple-600 hover:bg-[black]"
          >
            {{ t('pricings.slide-button') }}
          </button>
        </div>
        <div class="lg:ml-[8%] mx-auto">
          <img
            src="https://www.vexpo.vn/wp-content/uploads/2023/04/Rectangle-242.png"
          />
        </div>
      </div>
    </div>
    \\\

    <!-- logo -->
    <div class="pt-[80px] pb-[60px] bg-[#fff]">
      <div class="max-w-[1440px] mx-auto text-center">
        <p class="text-[24px] font-bold">
          {{ t('pricings.logo-title') }}
        </p>

        <div class="pt-[30px] flex flex-wrap items-center justify-center">
          <div
            v-for="logo in URL_LOGO"
            :key="logo.id"
            class="px-[15px] w-full md:w-[50%] lg:w-[25%] xl:w-auto flex justify-center mb-[50px] lg:mb-[20px]"
          >
            <img
              class="mx-[10px] w-[40%] md:w-[60%] lg:w-[80%]"
              :src="logo.url"
            />
          </div>
        </div>

        <div class="mt-[50px]">
          <p class="text-center text-[24px]">
            {{ t('pricings.affirmations-part1') }}
            <span class="text-primary">
              {{ t('pricings.affirmations-part2') }}
            </span>
            &
            <span class="text-primary">
              {{ t('pricings.affirmations-part3') }}
            </span>
            {{ t('pricings.affirmations-part4') }}
          </p>

          <div class="flex items-center justify-center my-[30px]">
            <div>
              <img
                src="https://www.vexpo.vn/wp-content/uploads/2023/03/capterra-4.8.svg"
              />
            </div>

            <div>
              <img
                src="https://www.vexpo.vn/wp-content/uploads/2023/03/capterra-4.8.svg"
              />
            </div>

            <div>
              <img
                src="https://www.vexpo.vn/wp-content/uploads/2023/03/capterra-4.8.svg"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <div class="w-[95%] mx-auto py-[100px] bg-[#e5e5e58]">
      <div class="max-w-[1100px] text-center mx-auto">
        <h2 class="font-bold text-[48px] mb-[50px]">VExpo.vn Pricing FAQs</h2>
      </div>
      <div class="max-w-[1440px] mx-auto">
        <PricingFooterDropDown
          v-for="item in FOOTER_DROPDOWN"
          :key="item.id"
          :item="item"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { TABS_PRICING, URL_LOGO, FOOTER_DROPDOWN } from '~/assets/pricing'

// Current tab
const tabCurrent = ref<number>(1)
const { t } = useI18n()

// handle pick tab
const handleTabCurrent = (id: number) => {
  tabCurrent.value = id
}

definePageMeta({
  layout: 'page',
})
</script>

<style scoped>
.active {
  background: #356df1;
  border-radius: 100px;
  color: #fff;
  transition: all 1s cubic-bezier(0, 0.6, 0.01, 1);
}
</style>
