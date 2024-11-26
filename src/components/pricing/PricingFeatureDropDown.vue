<template>
  <div
    class="rounded-[16px] mb-[20px]"
    :class="list.length ? 'bg-[#f8f8f8]' : 'bg-[#fff]'"
  >
    <div
      class="flex px-[16px] cursor-pointer items-center justify-between py-[20px]"
      :class="isDropDown && ' text-primary'"
      @click="isDropDown = !isDropDown"
    >
      <h3 class="text-[20px] font-bold mb-0">{{ feature.title || title }}</h3>
      <Icon
        :name="isDropDown ? 'icon-park-outline:down' : 'icon-park-outline:up'"
        class="text-[36px]"
      />
    </div>

    <div
      class="border-t border-solid border-[#cccccca6]"
      :class="isDropDown ? 'block' : 'hidden'"
    >
      <client-only>
        <!-- show list -->
        <div v-if="list.length" class="py-[20px]">
          <div
            v-for="item in list"
            :key="item.id"
            class="flex items-center text-[14px] px-[20px] mb-[8px]"
          >
            <Icon name="mdi:check-bold" class="mr-[10px]" />
            <p>{{ item.name }}</p>
          </div>
        </div>

        <!-- table -->
        <div v-else>
          <h4
            v-if="feature.description"
            class="text-[18px] px-[16px] font-bold py-[20px] mb-[0px] border-b border-solid border-[#cccccca6]"
          >
            {{ feature.description }}
          </h4>

          <table class="w-full text-[14px]">
            <tr
              v-for="item in feature.table"
              :key="item.id"
              class="flex justify-between py-[16px] items-center odd:bg-[#F1F5F8] px-[16px]"
            >
              <td class="w-[40%] pr-[35px]">{{ item.name }}</td>
              <td class="w-[20%] text-center">
                <template v-if="item.basic">
                  {{ item.basic }}
                </template>
                <template v-else>
                  <Icon
                    class="w-[18px] h-[18px] text-primary"
                    name="material-symbols:check-circle"
                  />
                </template>
              </td>

              <td class="w-[20%] text-center">
                <template v-if="item.premium">
                  {{ item.premium }}
                </template>
                <template v-else>
                  <Icon
                    class="w-[18px] h-[18px] text-primary"
                    name="material-symbols:check-circle"
                  />
                </template>
              </td>

              <td class="w-[20%] text-center">
                <template v-if="item.enterprise">
                  {{ item.enterprise }}
                </template>
                <template v-else>
                  <Icon
                    class="w-[18px] h-[18px] text-primary"
                    name="material-symbols:check-circle"
                  />
                </template>
              </td>
            </tr>
          </table>
        </div>
      </client-only>
    </div>
  </div>
</template>

<script setup lang="ts">
const isDropDown = ref(false)

interface IFeature {
  id: number
  title: string
  description: string
  table: {
    id: number
    name: string
    basic: string
    premium: string
    enterprise: string
  }[]
}

interface IItem {
  id: number
  name: string
}

const props = defineProps({
  feature: {
    type: Object as () => IFeature,
    default: () => ({}) as IFeature,
  },
  title: {
    type: String,
    default: '',
  },
  list: {
    type: Array as () => IItem[],
    default: () => [],
  },
})
</script>

<style></style>
