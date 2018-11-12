<template>
  <div class="mypet">
    <ul>
      <li @click="showPetMsg($event)" class="pet-li">1</li>
      <li @click="showPetMsg($event)" class="pet-li">2</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'MyPet',
  methods: {
    showPetMsg (ev) {
      var target = ev.target.getBoundingClientRect() || ev.srcElement.getBoundingClientRect()
      console.log(target.top, target.left, target)
      this.$todoMsg({
        content: '宠物信息',
        top: target.top,
        left: target.left
      })
    }
  }
}
</script>

<style lang="stylus" scopend>
#view
  .mypet
    .pet-li
      width 1rem
      height 1rem
      background #fff
</style>
