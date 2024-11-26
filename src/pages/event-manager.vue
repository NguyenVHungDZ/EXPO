<script lang="ts" setup>
// done
import IconCheckFill from '~icons/mingcute/check-fill'
import IconPlay from '~icons/octicon/play-16'

definePageMeta({ layout: 'page' })
useHead({ titleTemplate: '', title: 'Event manager' })
const { t } = useI18n() // Multiple language
const activeNames = ref(['1'])
const handleChange = (val: string[]) => {}
</script>

<template>
  <div class="bg-white">
    <div class="w-full bg-gradient-to-r from-primary to-blue-300 relative">
      <div class="background-template absolute w-full h-full"></div>
      <div class="md:grid md:grid-cols-2 p-10 xl:p-24 gap-x-4 z-10">
        <div class="space-y-5 z-10">
          <h5 class="font-semibold text-white">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit.
          </h5>
          <h3 class="text-2xl text-white font-bold">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate
            minima sit vel, sed corporis distinctio voluptatibus dicta
            voluptatem iure temporibus, ipsum deleniti ipsam obcaecati
            laudantium debitis doloremque amet architecto assumenda!
          </h3>
          <p class="text-white">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid,
            ut.
          </p>
          <hr />
          <p class="text-center font-bold text-white">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit.
          </p>
          <div class="grid grid-cols-5 gap-4">
            <img src="https://dummyimage.com/150x150/828282/ffffff" />
            <img src="https://dummyimage.com/150x150/828282/ffffff" />
            <img src="https://dummyimage.com/150x150/828282/ffffff" />
            <img src="https://dummyimage.com/150x150/828282/ffffff" />
            <img src="https://dummyimage.com/150x150/828282/ffffff" />
          </div>
        </div>
        <div class="py-5">
          <div class="bg-white p-10 shadow-md rounded xl:w-[70%] mx-auto">
            <p class="pb-3">{{ t('register_comminication') }}</p>
            <el-form label-position="top">
              <div class="grid grid-cols-2 gap-x-4">
                <el-form-item :label="t('form.first_name')">
                  <el-input />
                </el-form-item>
                <el-form-item :label="t('form.last_name')">
                  <el-input />
                </el-form-item>

                <el-form-item :label="t('form.email')">
                  <el-input />
                </el-form-item>
                <el-form-item :label="t('form.phone')">
                  <el-input />
                </el-form-item>
              </div>
              <el-form-item :label="t('form.company_name')">
                <el-input />
              </el-form-item>
              <el-form-item
                ><el-checkbox
                  label="I agree to receive communications from Expo"
                  name="type"
              /></el-form-item>
              <el-form-item>
                <button
                  class="px-3 bg-primary hover:bg-secondary text-white rounded-[10px]"
                >
                  Submit
                </button>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </div>
    </div>
    <div class="py-20 container mx-auto space-y-10">
      <div class="flex flex-col md:flex-row justify-center gap-2 items-center">
        <img width="100" src="https://dummyimage.com/100x100/828282/ffffff" />
        <img width="100" src="https://dummyimage.com/100x100/828282/ffffff" />
        <img width="100" src="https://dummyimage.com/100x100/828282/ffffff" />
        <img width="100" src="https://dummyimage.com/100x100/828282/ffffff" />
        <img width="100" src="https://dummyimage.com/100x100/828282/ffffff" />
        <img width="100" src="https://dummyimage.com/100x100/828282/ffffff" />
      </div>
      <h4 class="font-bold text-4xl text-center w-[60%] mx-auto">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Soluta
        doloribus architecto, quaerat nam doloremque illo?
      </h4>
      <div class="grid md:grid-cols-2 px-10 space-y-10 xl:p-20">
        <div>
          <h4 class="text-xl font-semibold pb-8">
            Lorem ipsum dolor sit amet.
          </h4>
          <ul class="space-y-5">
            <li class="flex items-center gap-2">
              <p class="bg-primary text-white text-[10px] p-1 rounded-full">
                <IconCheckFill />
              </p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </li>
            <li class="flex items-center gap-2">
              <p class="bg-primary text-white text-[10px] p-1 rounded-full">
                <IconCheckFill />
              </p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </li>
            <li class="flex items-center gap-2">
              <p class="bg-primary text-white text-[10px] p-1 rounded-full">
                <IconCheckFill />
              </p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </li>
            <li class="flex items-center gap-2">
              <p class="bg-primary text-white text-[10px] p-1 rounded-full">
                <IconCheckFill />
              </p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </li>
            <li class="flex items-center gap-2">
              <p class="bg-primary text-white text-[10px] p-1 rounded-full">
                <IconCheckFill />
              </p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </li>
            <li class="flex items-center gap-2">
              <p class="bg-primary text-white text-[10px] p-1 rounded-full">
                <IconCheckFill />
              </p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </li>
          </ul>
        </div>
        <iframe
          class="w-full xl:w-[90%] aspect-video rounded-lg"
          src="https://www.youtube.com/embed/P54QwJt4dC8?si=Ac8sIv2uPs916BP2"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen
        ></iframe>
      </div>
    </div>
    <div>
      <h4 class="text-2xl font-bold text-center">
        Virtual Job Fair Feature Set
      </h4>
      <p class="text-center">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis,
        alias.
      </p>
      <div
        class="text-sm font-medium text-center text-gray-500 border-b border-gray-200 mt-10"
      >
        <ul class="flex flex-wrap -mb-px justify-center">
          <li class="me-2">
            <a
              href="#"
              class="inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300"
              >Profile</a
            >
          </li>
          <li class="me-2">
            <a
              href="#"
              class="inline-block p-4 text-primary border-b-2 border-primary rounded-t-lg active"
              aria-current="page"
              >Dashboard</a
            >
          </li>
          <li class="me-2">
            <a
              href="#"
              class="inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300"
              >Settings</a
            >
          </li>
          <li class="me-2">
            <a
              href="#"
              class="inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300"
              >Contacts</a
            >
          </li>
          <li>
            <a
              class="inline-block p-4 text-gray-400 rounded-t-lg cursor-not-allowed"
              >Disabled</a
            >
          </li>
        </ul>
      </div>
      <div class="grid md:grid-cols-2 space-y-5 xl:p-20 p-10">
        <div>
          <h4 class="text-xl font-semibold pb-8">
            Lorem ipsum dolor sit amet.
          </h4>
          <ul class="space-y-5">
            <li class="flex items-center gap-2">
              <p class="bg-primary text-white text-[10px] p-1 rounded-full">
                <IconCheckFill />
              </p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </li>
            <li class="flex items-center gap-2">
              <p class="bg-primary text-white text-[10px] p-1 rounded-full">
                <IconCheckFill />
              </p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </li>
            <li class="flex items-center gap-2">
              <p class="bg-primary text-white text-[10px] p-1 rounded-full">
                <IconCheckFill />
              </p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </li>
            <li class="flex items-center gap-2">
              <p class="bg-primary text-white text-[10px] p-1 rounded-full">
                <IconCheckFill />
              </p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </li>
            <li class="flex items-center gap-2">
              <p class="bg-primary text-white text-[10px] p-1 rounded-full">
                <IconCheckFill />
              </p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </li>
            <li class="flex items-center gap-2">
              <p class="bg-primary text-white text-[10px] p-1 rounded-full">
                <IconCheckFill />
              </p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </li>
          </ul>
        </div>
        <img
          class="w-full xl:w-[90%] aspect-video rounded-lg"
          src="https://dummyimage.com/829x466/828282/ffffff"
        />
      </div>
      <hr class="mx-10 md:hidden" />
      <div class="grid md:grid-cols-2 py-10 px-10 xl:px-20 gap-10">
        <img
          class="w-full xl:w-[90%] aspect-video rounded-lg"
          src="https://dummyimage.com/829x466/828282/ffffff"
        />
        <div class="flex flex-col justify-center">
          <h1 class="text-2xl font-bold">Why Host a Virtual Job Fair?</h1>
          <p class="text-lg py-5 leading-normal">
            VExpo.vn offers employers access to a larger candidate pool.
            Recruiters can search and filter resumes and conduct screening
            interviews right from within the platform.
          </p>
          <a class="text-primary">Host Virtual Job Fair ></a>
        </div>
      </div>
      <hr class="mx-10 md:hidden" />
      <div class="grid md:grid-cols-2 py-10 px-10 xl:px-20 gap-10">
        <div class="flex flex-col justify-center">
          <h1 class="text-2xl font-bold">Why Host a Virtual Job Fair?</h1>
          <p class="text-lg py-5 leading-normal">
            VExpo.vn offers employers access to a larger candidate pool.
            Recruiters can search and filter resumes and conduct screening
            interviews right from within the platform.
          </p>
          <a class="text-primary">Host Virtual Job Fair ></a>
        </div>
        <img
          class="w-full xl:w-[90%] aspect-video rounded-lg"
          src="https://dummyimage.com/829x466/828282/ffffff"
        />
      </div>
    </div>
    <div class="p-10 space-y-10">
      <h1 class="text-center font-extrabold text-4xl">
        Benefits of Hosting a Virtual Job Fair with VExpo.vn
      </h1>
      <div
        class="flex flex-row col-span-3 xl:w-[80%] mx-auto flex-wrap justify-center items-center gap-4"
      >
        <div
          class="basis-1/4 rounded-lg flex flex-col justify-center items-center space-y-4 shadow-lg p-10"
        >
          <img width="100" src="https://dummyimage.com/100x100/828282/ffffff" />
          <p class="font-bold">Lorem, ipsum.</p>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. A odio
            est, sint deleniti nemo aspernatur?
          </p>
        </div>
        <div
          class="basis-1/4 rounded-lg flex flex-col justify-center items-center space-y-4 shadow-lg p-10"
        >
          <img width="100" src="https://dummyimage.com/100x100/828282/ffffff" />
          <p class="font-bold">Lorem, ipsum.</p>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. A odio
            est, sint deleniti nemo aspernatur?
          </p>
        </div>
        <div
          class="basis-1/4 rounded-lg flex flex-col justify-center items-center space-y-4 shadow-lg p-10"
        >
          <img width="100" src="https://dummyimage.com/100x100/828282/ffffff" />
          <p class="font-bold">Lorem, ipsum.</p>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. A odio
            est, sint deleniti nemo aspernatur?
          </p>
        </div>
        <div
          class="basis-1/4 rounded-lg flex flex-col justify-center items-center space-y-4 shadow-lg p-10"
        >
          <img width="100" src="https://dummyimage.com/100x100/828282/ffffff" />
          <p class="font-bold">Lorem, ipsum.</p>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. A odio
            est, sint deleniti nemo aspernatur?
          </p>
        </div>
        <div
          class="basis-1/4 rounded-lg flex flex-col justify-center items-center space-y-4 shadow-lg p-10"
        >
          <img width="100" src="https://dummyimage.com/100x100/828282/ffffff" />
          <p class="font-bold">Lorem, ipsum.</p>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. A odio
            est, sint deleniti nemo aspernatur?
          </p>
        </div>
      </div>
    </div>
    <div class="bg-primary relative">
      <div class="background-template absolute w-full h-full"></div>
      <div class="p-10 text-center space-y-5">
        <h4 class="text-white text-xl font-bold">
          Are You Interested In a Single Employer Virtual Job Fair?
        </h4>
        <p class="text-white">Checkout our virtual career fair platform.</p>
      </div>
    </div>
    <div class="grid md:grid-cols-3 gap-5 p-10 xl:p-24 bg-gray-50">
      <div
        class="bg-gradient-to-t to-primary from-blue-300 w-full rounded flex justify-center items-center py-36"
      >
        <img width="150" src="https://dummyimage.com/150x150/828282/ffffff" />
      </div>
      <div class="md:col-span-2 space-y-10 flex flex-col justify-center">
        <h3 class="text-4xl text-center font-bold">
          Host A Virtual Job Fair With The Leading Provider On G2
        </h3>
        <div class="flex justify-center gap-3">
          <img
            width="100"
            src="https://dummyimage.com/100x100/828282/ffffff"
          /><img
            width="100"
            src="https://dummyimage.com/100x100/828282/ffffff"
          /><img
            width="100"
            src="https://dummyimage.com/100x100/828282/ffffff"
          /><img
            width="100"
            src="https://dummyimage.com/100x100/828282/ffffff"
          /><img
            width="100"
            src="https://dummyimage.com/100x100/828282/ffffff"
          />
        </div>
        <div class="flex justify-center">
          <button
            class="bg-gradient-to-t to-primary from-blue-300 hover:text-secondary text-xl text-white px-5 py-2 rounded-[10px]"
          >
            Request
          </button>
        </div>
      </div>
    </div>
    <div
      class="p-10 xl:p-24 flex flex-col justify-center items-center space-y-5"
    >
      <h2 class="text-3xl font-bold">What Our Customers Are Saying</h2>
      <h4>See how VExpo.vn customers love hosting events with us!</h4>
      <div class="grid grid-cols-3 gap-5">
        <div class="relative h-auto">
          <img class="w-full" src="/images/demo1.png" />
          <div
            class="absolute w-full h-full flex justify-center items-center top-0"
          >
            <IconPlay
              class="text-4xl text-primary hover:text-secondary cursor-pointer"
            />
          </div>
        </div>
        <div class="relative h-auto">
          <img class="w-full" src="/images/demo2.png" />
          <div
            class="absolute w-full h-full flex justify-center items-center top-0"
          >
            <IconPlay
              class="text-4xl text-primary hover:text-secondary cursor-pointer"
            />
          </div>
        </div>
        <div class="relative h-auto">
          <img class="w-full" src="/images/demo3.png" />
          <div
            class="absolute w-full h-full flex justify-center items-center top-0"
          >
            <IconPlay
              class="text-4xl text-primary hover:text-secondary cursor-pointer"
            />
          </div>
        </div>
      </div>
      <a
        class="text-lg font-bold text-primary hover:text-secondary cursor-pointer"
        >See All Customer Videos ></a
      >
    </div>
    <div class="p-10 xl:p-24 flex flex-col items-center gap-10">
      <h2 class="text-4xl text-center font-bold">Related Content</h2>
      <div class="mx-auto flex gap-5 max-w-2xl">
        <div class="space-y-3">
          <img class="rounded-lg" src="/images/demo4.png" />
          <p class="font-bold text-lg">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </p>
          <p class="line-clamp-2">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Distinctio
            placeat voluptatem voluptates enim consectetur voluptas, velit
            tempore veritatis dolores officiis consequatur minima eligendi optio
            vel, fugiat officia et qui ex!
          </p>
        </div>
        <div class="space-y-3">
          <img class="rounded-lg" src="/images/demo4.png" />
          <p class="font-bold text-lg">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </p>
          <p class="line-clamp-2">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Distinctio
            placeat voluptatem voluptates enim consectetur voluptas, velit
            tempore veritatis dolores officiis consequatur minima eligendi optio
            vel, fugiat officia et qui ex!
          </p>
        </div>
      </div>
      <a
        class="text-lg font-bold text-primary hover:text-secondary cursor-pointer"
        >See All Customer Videos ></a
      >
    </div>
    <div class="p-10 xl:p-24 bg-gray-50">
      <h2 class="text-4xl text-center font-bold pb-10">
        Frequently Asked Questions
      </h2>
      <div class="xl:w-[70%] mx-auto p-5 bg-white rounded-lg">
        <el-collapse v-model="activeNames" @change="handleChange">
          <el-collapse-item title="Consistency" name="1">
            <div>
              Consistent with real life: in line with the process and logic of
              real life, and comply with languages and habits that the users are
              used to;
            </div>
            <div>
              Consistent within interface: all elements should be consistent,
              such as: design style, icons and texts, position of elements, etc.
            </div>
          </el-collapse-item>
          <el-collapse-item title="Feedback" name="2">
            <div>
              Operation feedback: enable the users to clearly perceive their
              operations by style updates and interactive effects;
            </div>
            <div>
              Visual feedback: reflect current state by updating or rearranging
              elements of the page.
            </div>
          </el-collapse-item>
          <el-collapse-item title="Efficiency" name="3">
            <div>
              Simplify the process: keep operating process simple and intuitive;
            </div>
            <div>
              Definite and clear: enunciate your intentions clearly so that the
              users can quickly understand and make decisions;
            </div>
            <div>
              Easy to identify: the interface should be straightforward, which
              helps the users to identify and frees them from memorizing and
              recalling.
            </div>
          </el-collapse-item>
          <el-collapse-item title="Controllability" name="4">
            <div>
              Decision making: giving advices about operations is acceptable,
              but do not make decisions for the users;
            </div>
            <div>
              Controlled consequences: users should be granted the freedom to
              operate, including canceling, aborting or terminating current
              operation.
            </div>
          </el-collapse-item>
        </el-collapse>
      </div>
    </div>
    <div class="p-20 space-y-10">
      <h5 class="text-center">
        Revolutionize Your Events with the Top-Rated Hybrid, In-Person and
        Virtual Events Platform
      </h5>
      <div class="flex justify-center gap-4">
        <img width="100" src="https://dummyimage.com/100x100/828282/ffffff" />
        <img width="100" src="https://dummyimage.com/100x100/828282/ffffff" />
        <img width="100" src="https://dummyimage.com/100x100/828282/ffffff" />
        <img width="100" src="https://dummyimage.com/100x100/828282/ffffff" />
        <img width="100" src="https://dummyimage.com/100x100/828282/ffffff" />
        <img width="100" src="https://dummyimage.com/100x100/828282/ffffff" />
        <img width="100" src="https://dummyimage.com/100x100/828282/ffffff" />
      </div>
      <div class="flex justify-center">
        <button
          class="bg-gradient-to-t to-primary from-blue-300 hover:bg-gradient-to-t hover:to-blue-300 hover:from-primary text-xl text-white px-5 py-2 rounded-[10px]"
        >
          {{ t('request') }}
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.background-template {
  background-image: url('/images/bg-line-about.png');
  background-position: left;
  background-repeat: no-repeat;
  background-size: cover;
  opacity: 0.2;
  transition:
    background 0.3s,
    border-radius 0.3s,
    opacity 0.3s;
}
:deep(.el-tabs__nav) {
  justify-content: center;
  float: right;
  clear: right;
  widows: 100%;
}
:deep(.el-collapse-item__header) {
  font-weight: 600;
  font-size: large;
}
:deep(.el-collapse-item__header.is-active) {
  color: theme('colors.primary.DEFAULT');
}
:deep(.el-collapse-item__content) {
  font-size: medium;
}
</style>
