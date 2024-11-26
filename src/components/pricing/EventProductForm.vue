<template>
  <div
    class="bg-[#f8f8f8] ml-[15px] rounded-[16px] px-[40px] py-[30px] flex-1 mr-[20px] max-h-[850px]"
  >
    <el-form label-position="top" class="w-[100%]" size="large ">
      <el-form-item label="First name*">
        <el-input />
      </el-form-item>

      <el-form-item label="Last name*">
        <el-input />
      </el-form-item>

      <el-form-item label="Email*">
        <el-input />
      </el-form-item>

      <el-form-item label="Company name*">
        <el-input />
      </el-form-item>

      <el-form-item label="Phone name*">
        <el-input />
      </el-form-item>

      <el-form-item label="What product are you interested in?*">
        <el-select placeholder="Please Select">
          <el-option label="check 1" value="check 1" />
          <el-option label="check 2" value="check 2" />
        </el-select>
      </el-form-item>

      <el-form-item label="What kind of event are you planning?*">
        <el-select placeholder="Please Select">
          <el-option label="Pick 1" value="check 1" />
          <el-option label="Pick 2" value="check 2" />
        </el-select>
      </el-form-item>
    </el-form>

    <el-checkbox
      >I agree to receive communications from VExpo.vn LLC.</el-checkbox
    >

    <div class="w-full mt-[20px]">
      <button
        class="px-[30px] py-[15px] rounded-[25px] text-[#fff] text-[18px] font-bold bg-gradient-to-r from-orange-500 via-red-600 to-pink-800 hover:bg-[black]"
      >
        Request a Demo
      </button>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style></style>
