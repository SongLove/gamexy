<template>
  <div class='skill'>
    <div class='selector'>
      <ul class='selector-ul'>
        <li class='selector-li'>
          <label class='selector-lab' for='1'>Option 1</label>
        </li>
        <li class='selector-li'>
          <label class='selector-lab' for='2'>Option 2</label>
        </li>
        <li class='selector-li'>
          <label class='selector-lab' for='3'>Option 3</label>
        </li>
        <li class='selector-li'>
          <label class='selector-lab' for='4'>Option 4</label>
        </li>
        <li class='selector-li'>
          <label class='selector-lab' for='5'>Option 5</label>
        </li>
      </ul>
      <div class="skill-msg">Click here</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Skill',
  data () {
    return {
      angleStart: -360
    }
  },
  methods: {
    rotate (li, d) {
      $({ d: this.angleStart }).animate(
        { d: d },
        {
          step: function (now) {
            $(li)
              .css({ transform: 'rotate(' + now + 'deg)' })
              .find('label')
              .css({ transform: 'rotate(' + -now + 'deg)' })
          },
          duration: 0
        }
      )
    },
    toggleOptions (s) {
      $(s).toggleClass('open')
      var li = $(s).find('li')
      var deg = $(s).hasClass('half') ? 180 / (li.length - 1) : 360 / li.length
      for (var i = 0; i < li.length; i++) {
        var d = $(s).hasClass('half') ? i * deg - 90 : i * deg
        $(s).hasClass('open') ? this.rotate(li[i], d) : this.rotate(li[i], this.angleStart)
      }
    }
  },
  mounted () {
    setTimeout(() => {
      this.toggleOptions('.selector')
    }, 100)
  }
}
</script>

<style lang='stylus' scopend>

.skill
  .selector
    position: absolute;
    left: 50%;
    top: 50%;
    width: 2rem;
    height: 2rem;
    margin-top: -1rem;
    margin-left: -1rem;
    &.open
      .selector-lab
        width: 1.5rem;
        height: 1.5rem;
        line-height: 1.5rem;
        margin-left: -0.75rem;
        box-shadow: 0 3px 3px rgba(0, 0, 0, 0.1);
        font-size: 0.25rem;
    .skill-msg
      position: relative;
      width: 100%;
      height: 100%;
      padding: 0.25rem;
      background: #428bca;
      border: 0;
      color: white;
      font-size: 0.25rem
      cursor: pointer;
      box-shadow: 0 3px 3px rgba(0, 0, 0, 0.1);
      transition: all 0.1s;
      box-sizing border-box
      &:focus
        outline: none;
    .selector-ul
      position: absolute;
      list-style: none;
      padding: 0;
      margin: 0;
      top: -20px;
      right: -20px;
      bottom: -20px;
      left: -20px;
      .selector-li
        position absolute;
        width 0;
        height 100%;
        margin 0 50%;
        -webkit-transform rotate(-360deg);
        transition all 0.8s ease-in-out;
    .selector-lab
      position absolute;
      left 50%;
      bottom 110%;
      width 0;
      height 0;
      line-height 1px;
      margin-left 0;
      background #fff;
      border-radius 50%;
      text-align center;
      font-size 1px;
      overflow hidden;
      cursor pointer;
      box-shadow none;
      transition all 0.8s ease-in-out, color 0.1s, background 0.1s;
      @media screen and (min-width 768px)
        bottom 120%
</style>
