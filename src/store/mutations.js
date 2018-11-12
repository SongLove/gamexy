import * as types from './mutations-type'

const mutations = {
  [types.SET_MONEY] (state, money) {
    state.money = money
  },
  [types.SET_BLOOD] (state, blood) {
    state.blood = blood
  },
  [types.SET_ATK] (state, atk) {
    state.atk = atk
  },
  [types.SET_ROLENAME] (state, roleName) {
    state.roleName = roleName
  },
  [types.SET_ROLEICON] (state, roleIcon) {
    state.roleIcon = roleIcon
  },
  [types.SET_ENERGY] (state, energy) {
    state.energy = energy
  },
  [types.SET_ATBLOOD] (state, atBlood) {
    state.atBlood = state.atBlood - atBlood
    if (state.atBlood <= 0) {
      state.atBlood = 0
    }
    if (state.atBlood > state.blood) {
      state.atBlood = state.blood
    }
  },
  [types.SET_HARMBLOOD] (state, harmBlood) {
    state.harmBlood = harmBlood
  },
  [types.SET_TIER] (state, tier) {
    state.tier = tier
  },
  [types.SET_TIERGUAN] (state, tierGuan) {
    state.tierGuan = tierGuan
  },
  [types.SET_CHECKPOINT] (state, checkPoint) {
    state.checkPoint.forEach((k) => {
      if (k.tier === state.tier) { // 当本层通关进行关卡替换
        k.tierGuan = checkPoint
        state.tierGuan = k.tierGuan
      }
    })
  },
  [types.SET_ENERGYEND] (state, energyEnd) {
    state.energyEnd = energyEnd
  },
  [types.SET_SKILLURLHARM] (state, skillUrl) {
    state.skillUrl.forEach((k) => {
      if (k.id === skillUrl) {
        k.harm = k.grade * k.harms
      }
    })
  },
  [types.SET_SKILLACTIVE] (state, skillUrl) {
    state.skillUrl.forEach((k) => {
      if (k.id === skillUrl) {
        k.isActive = true
      }
    })
  },
  [types.SET_SKILLGRADE] (state, skillUrl) {
    state.skillUrl.forEach((k) => {
      if (k.id === skillUrl) {
        k.grade++
      }
    })
  }
}

export default mutations
