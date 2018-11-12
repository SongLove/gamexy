<template>
  <div class="wrapper">
    <swiper id="swiper" :options="swiperOption" ref="mySwiper">
      <swiper-slide>
        <div class="img-box"></div>
      </swiper-slide>
      <swiper-slide>
        <div class="img-box"></div>
      </swiper-slide>
      <swiper-slide>
        <div class="img-box"></div>
      </swiper-slide>
      <div class="swiper-pagination swiper-click" slot="pagination"></div>
    </swiper>
  </div>
</template>

<script>
import Bus from './bug.js'
export default {
  name: 'RoleSwiper',
  data () {
    return {
      swiperOption: {
        pagination: {
          el: '.swiper-click',
          clickable: true
        },
        on: {
          progress (b) {
            Bus.$emit('progress', b)
          }
        }
      }
    }
  }
}
</script>

<style lang="stylus" scopend>
@import '../../assets/styles/publicImg.styl'
#swiper
  height 9rem
  @media screen and (min-height: 812px)
    height 12rem
  @media screen and (min-width: 768px)
    height 8.5rem
  .swiper-slide
    .img-box
      width 60%
      height 6rem
      margin 0 auto
      margin-top 0.5rem
      background-size 100% 100%
      @media screen and (min-height: 812px)
        margin-top 1.2rem
      @media screen and (min-width: 768px)
        margin-top 0.5rem
    &:nth-child(1) .img-box
      width 6.5rem
      background-url('r01.png')
    &:nth-child(2) .img-box
      width 5rem
      background-url('r02.png')
    &:nth-child(3) .img-box
      width 5rem
      background-url('r03.png')
  .swiper-click
      position absolute
      top 7rem
      @media screen and (min-height: 812px)
        top 9rem
      @media screen and (min-width: 768px)
        top 6.5rem
    .swiper-pagination-bullet-active
      background none
      border none
      outline none
      transform scale(1.1)
    .swiper-pagination-bullet
      position relative
      display inline-block
      width 1.5rem
      height 1.5rem
      padding 0.17rem
      margin 0 0.5rem
      text-align center
      background none
      background-url('u_bg2.png')
      background-size 100% 100%
      box-sizing border-box
      opacity 1
      &:after
        position absolute
        top 50%
        left 50%
        content ''
        width 80%
        height 80%
        transform translate(-50%, -50%)
        background-size 100% 100%
        border-radius 50%
      &:nth-child(1):after
          background-url('u01.png')
      &:nth-child(2):after
          background-url('u02.png')
      &:nth-child(3):after
          background-url('u03.png')
</style>
