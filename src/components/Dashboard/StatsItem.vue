<template>
  <div class="statistic-card">
    <ClientOnly>
      <el-statistic :value="data.count">
        <template #title>
          <div style="display: inline-flex; align-items: center">
            {{ t(data.title) }}
            <el-tooltip
              v-if="data.tooltip"
              effect="dark"
              :content="t(data.tooltip)"
              placement="top"
            >
              <el-icon style="margin-left: 4px" :size="12">
                <Warning />
              </el-icon>
            </el-tooltip>
          </div>
        </template>
      </el-statistic>
      <div v-show="data.growthNumber" class="statistic-footer">
        <div class="footer-item">
          <span>{{ t('dashboard.than_yesterday') }}</span>
          <span :class="data.grouthColor">
            {{ data.growthNumber }}
            <el-icon>
              <CaretTop />
            </el-icon>
          </span>
        </div>
      </div>
    </ClientOnly>
  </div>
</template>
<script lang="ts" setup>
import { defineProps } from 'vue'
import { CaretTop, Warning } from '@element-plus/icons-vue'
import type { IStatsType } from '~/interfaces/stats_type'

const { t } = useI18n()

defineProps({
  data: {
    type: Object,
    default: {} as IStatsType,
  },
})
</script>
<style scoped>
:global(h2#card-usage ~ .example .example-showcase) {
  background-color: var(--el-fill-color) !important;
}

.el-statistic {
  --el-statistic-content-font-size: 28px;
}

.statistic-card {
  height: 100%;
  padding: 20px;
  border-radius: 4px;
  background-color: var(--el-bg-color-overlay);
}

.statistic-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  font-size: 12px;
  color: var(--el-text-color-regular);
  margin-top: 16px;
}

.statistic-footer .footer-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.statistic-footer .footer-item span:last-child {
  display: inline-flex;
  align-items: center;
  margin-left: 4px;
}

.green {
  color: var(--el-color-success);
}
.red {
  color: var(--el-color-error);
}
</style>
