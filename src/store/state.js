const state = {
  money: 0, // 银两
  blood: 0, // 血量
  atBlood: 0, // 当前血量
  harmBlood: 0, // 受到的伤害
  atk: 0, // 攻击力
  tier: 1, // 当前能进入的层级
  tierGuan: 0, // 当前层级的关卡
  energy: 2, // 能量
  energyEnd: 2, // 能量上限
  roleName: 'tongsong', // 角色名
  roleIcon: require('../assets/img/T01.png'),
  skillUrl: [
    {
      id: '1',
      grade: 1,
      isSkill: require('../assets/img/zd/u_01jj(x).png'),
      title: '剑诀',
      msg1: '消耗1点能量，造成5点伤害',
      msg2: '可升级，每级提高5点伤害，消耗100银两',
      activeMoney: 0,
      isActive: false,
      harm: 5,
      harms: 5,
      toUpgradeMoney: 100
    },
    {
      id: '2',
      grade: 1,
      isSkill: require('../assets/img/zd/u_02jj(x).png'),
      title: '惊鸿一击',
      msg1: '消耗4点能量，造成20点伤害',
      msg2: '可升级，每级提高200点伤害，消耗500银两',
      activeMoney: 500,
      isActive: false,
      harm: 20,
      harms: 20,
      toUpgradeMoney: 500
    },
    {
      id: '3',
      isSkill: require('../assets/img/zd/u_03jj(x).png'),
      grade: 1,
      title: '万剑归宗',
      msg1: '消耗20点能量，造成100点伤害',
      msg2: '可升级，每级提高100点伤害，消耗1000银两',
      activeMoney: 1000,
      isActive: false,
      harm: 100,
      harms: 100,
      toUpgradeMoney: 1000
    },
    {
      id: '4',
      isSkill: require('../assets/img/zd/u_04jj(x).png'),
      grade: 1,
      title: '乾坤一掷',
      msg1: '消耗20点能量和1000银两，造成1000点伤害',
      msg2: '可升级，每级提高1000点伤害，消耗1000银两',
      activeMoney: 200,
      isActive: false,
      harm: 1000,
      harms: 1000,
      toUpgradeMoney: 1000
    }
  ],
  checkPoint: [
    {
      tier: 1,
      tierGuan: 0
    },
    {
      tier: 2,
      tierGuan: 0
    },
    {
      tier: 3,
      tierGuan: 0
    },
    {
      tier: 4,
      tierGuan: 0
    },
    {
      tier: 5,
      tierGuan: 0
    }
  ]
}

export default state
