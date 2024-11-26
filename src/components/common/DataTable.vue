<template>
  <div>
    <ClientOnly>
      <el-config-provider :locale="lang">
        <div v-if="!!title" class="flex justify-between mb-4 items-center">
          <h1 class="text-black font-bold text-[24px]">
            {{ title }}
          </h1>

          <div>
            <!-- button create / edit -->
            <NuxtLink
              v-if="isShowCreate && isAdmin"
              :to="fullPath + '/new'"
              class="text-white py-2 px-4 text-sm rounded bg-primary hover:bg-secondary mr-[8px]"
              >{{ t('button.create') }}
            </NuxtLink>

            <!-- Button Trash -->
            <NuxtLink
              v-if="isShowTrash && isAdmin"
              class="text-white py-2 px-4 text-sm rounded bg-red-500 hover:bg-red-600"
              :to="`${route.path}/trash`"
              >{{ t('button.trash') }}</NuxtLink
            >
          </div>
        </div>
        <CommonFilterActivityFilter
          v-show="showFilterActivity"
          :remove-list="removeList"
          :remove="onDelete"
          @update-date-filter="updateDateFilterActivity"
          @update-sort="updateSortActivity"
        />
        <div v-show="showSearch" class="my-3 p-5 bg-white rounded-[4px]">
          <CommonSearchBar
            :is-loading="isLoading"
            :columns="columns"
            :list-ignored="listIgnored"
            @search-key="handleSearch"
          />
        </div>
        <div :class="tableContentClass" class="rounded-[4px]">
          <el-table
            v-loading="isLoading"
            class="w-full text-[14px] rounded-[4px]"
            :class="
              isAdmin
                ? 'min-h-[calc(100vh-300px)]'
                : 'min-h-[calc(100vh-400px)]'
            "
            :data="tableData"
            @selection-change="handleSelectionChange"
          >
            <el-table-column v-if="isSelected" type="selection" width="50" />

            <el-table-column
              v-if="showNumber"
              width="80"
              align="center"
              label="#"
            >
              <template #default="scope">
                {{ scope.$index + 1 + pageSize * (currentPage - 1) }}
              </template>
            </el-table-column>

            <el-table-column
              v-for="(item, index) in columns"
              :key="index"
              :prop="item.key"
              :label="t(item.label)"
              :width="item.width ?? ''"
            >
              <template #default="scope">
                <div style="display: flex; align-items: center">
                  <span v-if="item.index === 'date'">{{
                    renderDate(scope.row[item.key])
                  }}</span>

                  <!-- file name -->
                  <span
                    v-else-if="item.index === 'file_name'"
                    class="underline cursor-pointer"
                    @click="handleShowPreviewFile(scope.row)"
                    >{{ scope.row[item.key] }}
                  </span>

                  <!-- html -->
                  <div
                    v-else-if="item.index === 'html'"
                    v-dompurify-html="scope.row[item.key] || ''"
                    class="tiptap-content max-h-[130px]"
                  ></div>
                  <!--eslint-enable-->

                  <!-- form event -->
                  <div v-else-if="item.key === 'event_id'">
                    {{ scope.row[item.constraint]?.name }}
                  </div>

                  <!-- date time -->
                  <span v-else-if="item.index === 'dateTime'">{{
                    renderDateTime(scope.row[item.key])
                  }}</span>

                  <!-- activity -->
                  <div
                    v-else-if="item.index === 'activity'"
                    class="space-x-1 text-[14px]"
                  >
                    <span
                      class="font-semibold"
                      :class="renderColorActivity(scope.row.request_method)"
                      >{{ scope.row.request_method }}</span
                    >
                    <span v-if="scope.row.request_summary" class="text-[12px]"
                      >- {{ scope.row.request_summary }}</span
                    >
                  </div>

                  <!-- request time -->
                  <span v-else-if="item.index === 'requestTime'">{{
                    renderDateTime(
                      scope.row.request_time || scope.row.created_at,
                    )
                  }}</span>

                  <!-- user -->
                  <span v-else-if="item.index === 'user'"
                    >{{ scope.row.user ? scope.row.user[item.key] : '' }}
                    <el-tag
                      v-if="scope.row.user"
                      :type="
                        scope.row.user.role === 'admin' ? 'warning' : 'success'
                      "
                      >{{ scope.row.user.role }}</el-tag
                    >
                  </span>

                  <!-- status item -->
                  <span v-else-if="item.index === 'status_item'">
                    <el-tag
                      :type="scope.row.status === 0 ? 'error' : 'success'"
                      >{{
                        scope.row.status === 0
                          ? t('datatable.disabled')
                          : t('datatable.active')
                      }}</el-tag
                    >
                  </span>
                  <!-- status  -->
                  <el-tag
                    v-else-if="item.index === 'tag'"
                    :type="getTagColor(scope.row[item.key], item.options)"
                    >{{
                      t(getTagTitle(scope.row[item.key], item.options))
                    }}</el-tag
                  >
                  <!-- Role -->
                  <div v-else-if="item.index === 'role'">
                    <el-tag :type="getRole(scope.row[item.key])?.type || ''">{{
                      t(`role.${getRole(scope.row[item.key])?.value || ''}`)
                    }}</el-tag>
                  </div>

                  <!-- file name -->
                  <div v-else-if="item.index === 'public_file'">
                    <CommonSwitchPublic
                      :item="scope.row"
                      :is-public="scope.row[item.key]"
                    />
                  </div>

                  <p v-else-if="item.index === 'size'">
                    {{ Number(scope.row[item.key]).toLocaleString('en-US') }}
                  </p>

                  <!-- Translate content -->
                  <CommonTableTemplateTranslateContent
                    v-else-if="item.index === 'translate'"
                    :model="scope.row.model"
                    :field="scope.row.field"
                    :object-id="scope.row.id"
                  />
                  <!-- testimonial rate -->
                  <div v-else-if="item.index === 'testimonial_rate'">
                    <el-rate
                      v-model="scope.row[item.key]"
                      disabled
                      text-color="#ff9900"
                      :score-template="`${scope.row[item.key]}`"
                      class="flex"
                    />
                  </div>
                  <!-- language -->
                  <div
                    v-else-if="
                      item.key === 'language_id' ||
                      item.key === 'booth_id' ||
                      item.key === 'blockType_id' ||
                      item.key === 'blockGroup_id' ||
                      item.key === 'faqType_id'
                    "
                  >
                    {{
                      scope.row[item.constraint] &&
                      scope.row[item.constraint][item.constraintName]
                        ? scope.row[item.constraint][item.constraintName]
                        : ''
                    }}
                  </div>

                  <!-- file name -->
                  <div v-else-if="item.index === 'constraint'">
                    {{
                      scope.row[item.constraint] &&
                      scope.row[item.constraint][item.key]
                        ? scope.row[item.constraint][item.key]
                        : ''
                    }}
                  </div>
                  <a
                    v-else-if="item.index === 'link'"
                    :href="scope.row[item.key]"
                    class="hover:text-secondary underline"
                    target="_blank"
                    >{{ scope.row[item.key] }}</a
                  >
                  <div v-else-if="item.index === 'image'" class="w-full">
                    <CommonTableTemplateImage :url="scope.row[item.key]" />
                  </div>

                  <span v-else>
                    {{ scope.row[item.key] }}
                  </span>
                </div>

                <!-- Public -->
              </template></el-table-column
            >
            <el-table-column v-if="operation" align="right" width="200">
              <template #default="scope">
                <div class="flex justify-center gap-2">
                  <!-- icon show detail page -->
                  <el-tooltip
                    v-if="isView"
                    effect="light"
                    placement="top"
                    :content="t('datatable.detail')"
                  >
                    <button
                      class="bg-[#e6a23c] rounded p-2 text-white hover:bg-[#eb9e2b]"
                      @click.prevent="openDetailPage(scope.row._id)"
                    >
                      <icon-show />
                    </button>
                  </el-tooltip>

                  <!-- icon edit page -->
                  <el-tooltip
                    v-if="
                      (user.role === 'admin' ||
                        (user.role === 'content_manager' &&
                          route.path === '/admin/testimonial')) &&
                      isEdit
                    "
                    effect="light"
                    placement="top"
                    :content="t('datatable.edit')"
                  >
                    <button
                      class="bg-primary h-8 p-2 text-sm rounded text-white hover:bg-secondary"
                      @click="openEditPage(scope.row._id)"
                    >
                      <icon-edit />
                    </button>
                  </el-tooltip>

                  <!-- icon reset password -->
                  <el-popconfirm
                    v-if="resetPasswordButton"
                    :title="t('datatable.reset')"
                    width="250"
                    @confirm="onResetPassword(scope.row._id)"
                  >
                    <template #reference>
                      <div>
                        <el-tooltip
                          :visible="scope.row['visibleResetKey']"
                          :content="t('datatable.reset-password-hover')"
                          effect="light"
                          placement="top"
                        >
                          <button
                            class="bg-primary rounded h-8 p-2 text-sm text-white hover:bg-secondary"
                            @click="scope.row['visibleResetKey'] = false"
                            @mouseover="scope.row['visibleResetKey'] = true"
                            @mouseleave="scope.row['visibleResetKey'] = false"
                          >
                            <icon-key-reset />
                          </button>
                        </el-tooltip>
                      </div>
                    </template>
                  </el-popconfirm>

                  <!-- change status -->
                  <el-tooltip
                    v-if="isChangeStatus && user.role == 'admin'"
                    placement="top"
                    :content="t('datatable.change_status')"
                    effect="light"
                  >
                    <button
                      class="bg-primary rounded p-2 text-white hover:bg-secondary"
                      @click="openChangeStatusPage(scope.row._id)"
                    >
                      <FaExchange />
                    </button>
                  </el-tooltip>

                  <!-- upload booth style -->
                  <el-tooltip
                    v-if="isChangeStatus && user.role === 'company'"
                    placement="top"
                    :content="t('datatable.upload_template')"
                    effect="light"
                  >
                    <button
                      class="bg-primary rounded p-2 text-white"
                      :class="
                        !(scope.row.status === 'approved')
                          ? 'opacity-65 cursor-not-allowed'
                          : 'hover:bg-secondary'
                      "
                      :disabled="!(scope.row.status === 'approved')"
                      @click="
                        router.push(
                          `form-list/update-booth-style/${scope.row._id}`,
                        )
                      "
                    >
                      <IconUploadWeb />
                    </button>
                  </el-tooltip>

                  <!-- icon remove -->

                  <el-popconfirm
                    v-if="
                      user.role === 'admin' ||
                      (user.role === 'content_manager' &&
                        route.path === '/admin/testimonial')
                    "
                    :title="t('datatable.delete')"
                    width="250"
                    @confirm="onDelete(scope.row._id)"
                  >
                    <template #reference>
                      <div>
                        <el-tooltip
                          :visible="scope.row['visible']"
                          :content="t('datatable.delete_hover')"
                          effect="light"
                          placement="top"
                          ><button
                            v-if="
                              user.role === 'admin' ||
                              (user.role === 'content_manager' &&
                                route.path === '/admin/testimonial')
                            "
                            class="bg-red-500 rounded h-8 p-2 text-sm text-white hover:bg-red-600"
                            @click="scope.row['visible'] = false"
                            @mouseover="scope.row['visible'] = true"
                            @mouseleave="scope.row['visible'] = false"
                          >
                            <icon-delete-outline />
                          </button>
                        </el-tooltip>
                      </div>
                    </template>
                  </el-popconfirm>
                </div>
              </template>
            </el-table-column>
            <el-table-column
              v-if="flashRemove && user.role === 'admin'"
              align="center"
              width="55"
            >
              <template #default="scope">
                <button
                  class="hover:text-primary"
                  @click="onDelete(scope.row._id)"
                >
                  <IconX12 />
                </button>
              </template>
            </el-table-column>

            <!-- File -->
            <el-table-column
              v-if="isFill && user.role === 'admin'"
              align="right"
              width="100"
            >
              <template #default="scope">
                <div class="mr-[15px]">
                  <el-dropdown trigger="click" :hide-on-click="false">
                    <span class="el-dropdown-link text-[20px]">
                      <icon-more-fill />
                    </span>
                    <template #dropdown>
                      <el-dropdown-menu>
                        <el-dropdown-item
                          v-for="action in ACTION_ADMIN_FILE"
                          :key="action.id"
                          :divided="action.name === 'Remove'"
                        >
                          <div
                            v-if="action.name === 'Rename'"
                            class="flex items-center"
                            @click="showPopup(scope.row, action)"
                          >
                            <component :is="action.icon" class="mr-[5px]" />
                            {{ action.name }}
                          </div>

                          <el-popconfirm
                            v-else
                            :title="t('datatable.delete')"
                            width="250"
                            @confirm="onDelete(scope.row._id)"
                          >
                            <template #reference>
                              <div class="flex items-center">
                                <component :is="action.icon" class="mr-[5px]" />
                                {{ action.name }}
                              </div>
                            </template>
                          </el-popconfirm>
                        </el-dropdown-item>
                      </el-dropdown-menu>
                    </template>
                  </el-dropdown>
                </div>
              </template>
            </el-table-column>

            <!-- Restore  file-->
            <el-table-column v-if="isBack" align="right" width="100">
              <template #default="scope">
                <el-popover
                  placement="bottom"
                  trigger="hover"
                  content="t('datatable.back_item')"
                >
                  <template #reference>
                    <IconBack2Fill
                      class="my-[3px] cursor-pointer text-[20px] mr-[20px]"
                      @click="handleBackItem(scope.row._id)"
                    />
                  </template>
                </el-popover>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div v-show="!isLoading" class="flex justify-end mt-3">
          <el-pagination
            v-model:current-page="currentPage"
            v-model:page-size="pageSize"
            :small="false"
            :background="true"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
        </div>

        <PopupRename
          :id="renameFile.id"
          :is-show-popup-file="isShowPopupFile"
          :title="t('rename')"
          :file-current="renameFile.name"
          :fetch-data="fetchData"
          @close-dialog="isShowPopupFile = false"
        />

        <!-- popup pre file -->
        <PopupPreview
          :is-show-preview-file="isShowPreviewFile"
          :url="urlPreviewFile"
          @close-dialog="isShowPreviewFile = false"
        />
      </el-config-provider>
    </ClientOnly>
  </div>
</template>

<script lang="ts" setup>
import { ElMessage } from 'element-plus'
import moment from 'moment'
import en from 'element-plus/es/locale/lang/en'
import vi from 'element-plus/es/locale/lang/vi'
import ja from 'element-plus/es/locale/lang/ja'
import IconEdit from '~icons/uil/edit'
import IconKeyReset from '~icons/fluent/key-reset-20-filled'
import IconDeleteOutline from '~icons/material-symbols/delete-outline'
import IconX12 from '~icons/octicon/x-12'
import IconMoreFill from '~icons/ri/more-fill'
import IconShow from '~icons/mdi/show'
import IconBack2Fill from '~icons/mingcute/back-2-fill'
import IconUploadWeb from '~icons/icon-park-twotone/upload-web'
import { ACTION_ADMIN_FILE, ROLE } from '~/assets/data'
import { useUser } from '~/stores/user'
import FaExchange from '~icons/fa/exchange'
import '~/assets/tiptap.scss'

// Handle reset password
const onResetPassword = async (id: any) => {
  const passwordDefault = reactive({
    password: 'Fimo!54321', // Default password
  })
  try {
    await props.resetPassword(id, passwordDefault)
    ElMessage.success(t('resetpassword'))
    await fetchData()
  } catch (error) {
    ElMessage.error(t('message.errors.error'))
  }
}

const props = defineProps({
  columns: {
    type: Array as any,
    default: () => [],
  },
  operation: {
    type: Boolean,
    default: true,
  },
  resetPasswordButton: {
    type: Boolean,
    default: false,
  },
  resetPassword: {
    type: Function,
    default: () => {},
  },
  getData: {
    type: Function,
    default: () => {},
  },

  update: {
    type: Function,
    default: () => {},
  },
  restore: {
    type: Function,
    default: () => {},
  },
  params: {
    type: Object,
    default: () => {},
  },
  removeData: {
    type: Function,
    default: () => {},
  },
  showSearch: {
    type: Boolean,
    default: true,
  },
  showFilterActivity: {
    type: Boolean,
    default: false,
  },
  isView: {
    type: Boolean,
    default: true,
  },
  showNumber: {
    type: Boolean,
    default: true,
  },
  isSelected: {
    type: Boolean,
    default: false,
  },
  flashRemove: {
    type: Boolean,
    default: false,
  },
  tableContentClass: {
    type: String,
    default: '',
  },
  isFill: {
    type: Boolean,
    default: false,
  },
  isBack: {
    type: Boolean,
    default: false,
  },
  isAdd: {
    type: Boolean,
    default: true,
  },
  isEdit: {
    type: Boolean,
    default: true,
  },
  isChangeStatus: {
    type: Boolean,
    default: false,
  },
  isTranslate: {
    type: Boolean,
    default: true,
  },
  keywordSearch: {
    type: String,
    default: '',
  },
  title: {
    type: String,
    default: '',
  },
  filterLabelFile: {
    type: String,
    default: '',
  },
  listIgnored: {
    type: Array<String>,
    default: () => [
      'website',
      'featured_image',
      'image',
      'created_at',
      'detail',
      'description',
      'descriptions',
      'rate',
      'quote',
      'link',
      'width',
      'length',
      'answer',
      'translate',
    ],
  },
})

// variable
const userStore = useUser()

const route = useRoute()
const router = useRouter()
const isLoading = ref(false)
const tableData = ref([])
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(0)
const dateFilter = ref('')
const sortActivity = ref('')
const { t, locale } = useI18n()
const removeList = ref([])
const fullPath = computed(() => route.fullPath)
const isAdmin = computed(() => fullPath.value.includes('admin'))
const isShowPopupFile = ref(false)
const isShowPreviewFile = ref(false)
const urlPreviewFile = ref('')
const renameFile = ref<any>({ id: '', name: '', url: '' })

const user = computed(() => userStore.getInformation)

// Get language
const lang = computed(() =>
  locale.value === 'en' ? en : locale.value === 'vi' ? vi : ja,
)
// Date
const renderDate = (date: string) => {
  return moment(date).format('DD/MM/YYYY')
}
// Time
const renderDateTime = (date: string) => {
  return moment(date).format('hh:mm:ss DD/MM/YYYY')
}
// Change text color according to function
const renderColorActivity = (method: string) => {
  if (method === 'OPTIONS') return 'text-yellow-500'
  else if (method === 'GET') return 'text-primary'
  else if (method === 'POST') return 'text-green-500'
  else if (method === 'PUT') return 'text-orange-500'
  else if (method === 'DELETE') return 'text-red-500'
}
const searchKeyword = ref('')

// call api get data
const fetchData = async () => {
  isLoading.value = true

  const requestData: any = {
    limit: pageSize.value,
    offset: pageSize.value * (currentPage.value - 1),
    withCount: true,
    ...props.params,
  }

  if (props.isTranslate) {
    requestData.language = locale.value
  }
  try {
    const res: any = await props.getData(
      requestData,
      props.keywordSearch
        ? `&filter[originalname][$stringContains]=${props.keywordSearch}&sort[created_at]=desc`
        : searchKeyword.value
          ? searchKeyword.value + '&sort[created_at]=desc'
          : '' + dateFilter.value + sortActivity.value,
    )

    // handle data
    const newData = res.data.map((item: any) => {
      if (props.isTranslate) {
        const newObject = {} as any
        for (const key in item.translate) {
          if (item.translate[key] !== '') newObject[key] = item.translate[key]
        }

        return { ...item, ...newObject }
      }
      return item
    })

    tableData.value = newData
    total.value = res.count
  } catch (error) {
    ElMessage.error(t('message.errors.error'))
  } finally {
    isLoading.value = false
  }
}

// watch filter label file and locale value
watch(
  () => [props.filterLabelFile, locale.value],
  async () => {
    await fetchData()
  },
  { immediate: true },
)

// Handle selection change
const handleSelectionChange = (val: any) => {
  removeList.value = val
}

// Change size
const handleSizeChange = async (val: number) => {
  await fetchData()
}

// Change current page
const handleCurrentChange = async (val: number) => {
  await fetchData()
}

// Search
const handleSearch = async (val: any) => {
  searchKeyword.value = val
  await fetchData()
}

// Update date filter activity
const updateDateFilterActivity = async (val: any) => {
  if (typeof val === 'string') {
    dateFilter.value = val ? `&filter[created_at][$gte]=${val}` : ''
  } else {
    dateFilter.value = val
      ? `&filter[created_at][$gte]=${moment(
          val[0],
        ).toISOString()}&filter[created_at][$lte]=${moment(val[1]).toISOString()}`
      : ''
  }
  await fetchData()
}

// Update sort activity
const updateSortActivity = async (val: any) => {
  sortActivity.value = `&sort[created_at]=${val}`
  await fetchData()
}

// Open edit page
const openEditPage = (id: any) => {
  router.push(`${fullPath.value}/${id}`)
}

// Open detail page
const openDetailPage = (id: any) => {
  router.push(`${route.fullPath}/${id}/detail`)
}

// Open change status page
const openChangeStatusPage = (id: string) => {
  router.push(`${route.fullPath}/${id}/change-status`)
}

// Handle delete
const onDelete = async (id: any) => {
  try {
    await props.removeData(id)
    ElMessage.success(t('message.success.delete_success'))
    await fetchData()
  } catch (error) {
    ElMessage.error(t('message.errors.error'))
  }
}
onMounted(async () => {
  await fetchData()
})

// Handle show popup file
const showPopup = (item: any, action: any) => {
  if (action.name === 'Rename') {
    isShowPopupFile.value = !isShowPopupFile.value
    renameFile.value = {
      ...renameFile.value,
      id: item._id,
      name: item.originalname,
    }
  }
}

// Handle show preview file
const handleShowPreviewFile = (file: any) => {
  urlPreviewFile.value = file.url
  isShowPreviewFile.value = !isShowPreviewFile.value
}

// Restore item
const handleBackItem = async (id: string) => {
  try {
    await props.restore(id)
    ElMessage.success('Restore file thành công!')
    await fetchData()
  } catch (error) {
    ElMessage.error('Restore file thất bại!')
  }
}

// check role
const getRole = (role: string) => ROLE.find((item) => item.value === role)

// get tag color
const getTagColor = (value: String, options: any) =>
  value ? options.find((x: any) => x.value === value).color || '' : 'primary'

// get tag title
const getTagTitle = (value: String, options: any) =>
  value ? options.find((x: any) => x.value === value).label || '' : ''

// handle show button create
const isShowCreate =
  (props.isAdd &&
    (user.value.role === 'admin' ||
      (user.value.role === 'organizer' &&
        (route.path === '/admin/event' || route.path === '/admin/form')) ||
      (user.value.role === 'company' && route.path === '/admin/form'))) ||
  (user.value.role === 'content_manager' && route.path === '/admin/testimonial')

// handle show button trash
const isShowTrash =
  user.value.role === 'admin' && !route.path.includes('/trash')
</script>

<style scoped lang="scss">
:deep(.el-table--enable-row-hover.el-table--enable-row-transition) {
  height: calc(100vh - 500px);
}

:deep(.el-table--fit) {
  padding-bottom: 8px;
}

:deep(.el-dialog) {
  --el-dialog-width: 40%;
}

:deep(
    .el-table--border .el-table__inner-wrapper::after,
    .el-table--border::after,
    .el-table--border::before,
    .el-table__inner-wrapper::before
  ) {
  display: none;
}

:deep(.is-active.number) {
  background-color: theme('colors.primary.DEFAULT') !important;
}

:deep(.el-button) {
  .el-button--primary {
    .el-button--small {
      background-color: theme('colors.primary.DEFAULT') !important;
    }
  }
}
</style>
