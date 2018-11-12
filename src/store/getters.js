export const roleName = state => state.roleName
export const blood = state => state.blood
export const atk = state => state.atk
export const money = state => state.money
export const harmBlood = state => state.harmBlood
export const atBlood = (state) => {
  return state.blood - state.harmBlood
}
