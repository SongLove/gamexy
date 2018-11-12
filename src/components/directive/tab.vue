<template>
  <div v-show="show" :style="style" class="tab">{{content}}</div>
</template>

<script>
export default {
  name: 'Tab',
  props: {
    content: {
      type: String,
      required: true
    }
  },
  computed: {
    style () {
      return {}
    },
    show () {
      return {}
    }
  }
}
</script>

<style>
.tab{
  position: absolute;
  top: 0;
  left: 0;
}
</style>
