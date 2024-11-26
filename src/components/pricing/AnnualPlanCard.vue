<template>
  <div class="rounded-[12px] bg-white w-full p-5 box-border mr-4 mb-[30px]">
    <!-- header -->
    <div>
      <Icon :name="icon" color="#356df1" class="w-[45px] h-[45px]" />
      <h3
        class="mt-[10px] mb-[16px] text-[22px] text-center text-[#000] font-bold lg:min-h-[80px] xl:min-h-auto"
      >
        <span class="py-[10px]">{{ title }} </span>
      </h3>
      <p
        class="text-[14px] text-center text-[#606970] min-h-[150px] xl:min-h-[100px]"
      >
        {{ detail }}
      </p>
    </div>

    <!-- button contact -->
    <el-button> Contact For Pricing </el-button>

    <!-- List -->
    <ul class="bg-[#F8F8F8] rounded-[16px] mt-[26px] p-4 m-h-[450px]">
      <li
        v-for="item in list"
        :key="item.id"
        class="list-none mb-4 flex items-baseline text-gray-700 w-full"
        :class="item.isActive && 'text-primary'"
      >
        <Icon name="ep:check" class="" />
        <span class="text-[@272A2C] ml-[6px] text-[18px]">{{ item.name }}</span>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
interface IItem {
  id: number
  name: string
  isActive: boolean
}

const props = defineProps({
  icon: {
    type: String,
    default: '',
  },
  title: {
    type: String,
    default: '',
  },
  detail: {
    type: String,
    default: '',
  },
  list: {
    type: Array as () => IItem[],
    default: () => [],
  },
})
</script>

<style scoped>
:deep(.el-button) {
  width: 100%;
  height: 55px;
  color: #fff;
  background: linear-gradient(to right, #0b99f7 0%, #a967d5 100%);
  font-size: 22px;
  font-weight: bold;
  text-align: center;
  border-color: #356df1;
  border-radius: 30px;
}
</style>
