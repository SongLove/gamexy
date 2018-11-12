<template>
   <div>
    <!-- 内容 -->
    <div>
      <!-- <input type="text" v-check.right="{type:'phone',val:currentPhone}" placeholder="请输入手机号码" v-model="currentPhone" />
      <input type="text" v-check.left="{type:'date',val:currentDate}" placeholder="请输入日期" v-model="currentDate" />
      <input type="text" v-check.top="{type:'identification_card',val:currentIdentificationCard}" placeholder="请输入身份证" v-model="currentIdentificationCard" />
      <input type="text" v-check.bottom="{type:'email',val:currentEmail}" placeholder="请输入邮箱" v-model="currentEmail" />
      <input type="text" v-check="{type:'zip_code',val:currentZipCode}" placeholder="请输入邮编" v-model="currentZipCode" /> -->
      <button v-to-tab>点击</button>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Check',
  data () {
    return {
      currentPhone: '',
      currentDate: '',
      currentIdentificationCard: '',
      currentEmail: '',
      currentZipCode: ''
    }
  }
}
</script>
<style lang="stylus" scoped>
 input[type="text"]
    display block
    width 90%
    height 40px
    line-height 40px
    font-size 16px
    text-indent 1em
    margin 5px auto
    outline none // 清除input默认样式
    border 1px solid #ccc
  // 按钮
  input[type="button"]
    display block
    width 70%
    height 40px
    margin 10px auto

</style>
