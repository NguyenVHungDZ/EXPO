<template>
  <div class="statistic-card">
    <el-statistic :value="countAccessMonthly">
      <template #title>
        <div style="display: inline-flex; align-items: center">
          {{ t('dashboard.monthly') }}
          <el-tooltip
            effect="dark"
            :content="t('dashboard.monthly_tooltip')"
            placement="top"
          >
            <el-icon style="margin-left: 4px" :size="12">
              <Warning />
            </el-icon>
          </el-tooltip>
        </div>
      </template>
    </el-statistic>
    <div class="statistic-footer">
      <div class="footer-item">
        <span>{{ t('dashboard.than_month') }}</span>
        <span class="red">
          12%
          <el-icon>
            <CaretBottom />
          </el-icon>
        </span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue'
import { CaretBottom, Warning } from '@element-plus/icons-vue'
const { t } = useI18n()

defineProps({
  countAccessMonthly: {
    type: Number,
    default: 0,
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
