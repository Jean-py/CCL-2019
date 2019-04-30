class Skeleton {
  joints = {
    "RootMotion": 1,
    "Hips": 1,
    "Spine": 1,
    "Spine1": 1,
    "Spine2": 1,
    "Spine3": 1,
    "Spine4": 1,
    "Neck": 1,
    "Head": 1,
    "Head_ENDSITE": 1,
    "LeftShoulder": 1,
    "LeftArm": 1,
    "LeftForeArm": 1,
    "LeftHand": 1,
    "LeftHand_ENDSITE": 1,
    "RightShoulder": 1,
    "RightArm": 1,
    "RightForeArm": 1,
    "RightHand": 1,
    "RightHand_ENDSITE": 1,
    "LeftUpLeg": 1,
    "LeftLeg": 1,
    "LeftFoot": 1,
    "LeftToeBase": 1,
    "LeftToeBase_ENDSITE": 1,
    "RightUpLeg": 1,
    "RightLeg": 1,
    "RightFoot": 1,
    "RightToeBase": 1,
    "RightToeBase_ENDSITE": 1
  }

  set(joint, value) {
    if (joint in this.joints && value) {
      this.joints[joint] = value
    }
  }

  get(joint) {
    if (joint in this.joints) return this.joints[joint]
  }

  getAll() {
    const jointValues = Object.keys(joints).map(k => {
      return this.joints[k]
    })
    return jointValues
  }

  getAllLimbs() {
    let connections = [
      ['Hips', 'Spine'],
      ['Spine', 'Spine1'],
      ['Spine1', 'Spine2'],
      ['Spine2', 'Spine3'],
      ['Spine3', 'Spine4'],
      ['Spine4', 'Neck'],
      ['Neck', 'Head'],
      ['Head', 'Head_ENDSITE'],
      ['Hips', 'LeftUpLeg'],
      ['LeftUpLeg', 'LeftLeg'],
      ['LeftLeg', 'LeftFoot'],
      ['LeftFoot', 'LeftToeBase'],
      ['LeftToeBase', 'LeftToeBase_ENDSITE'],
      ['Hips', 'RightUpLeg'],
      ['RightUpLeg', 'RightLeg'],
      ['RightLeg', 'RightFoot'],
      ['RightFoot', 'RightToeBase'],
      ['RightToeBase', 'RightToeBase_ENDSITE'],
      ['Spine4', 'LeftShoulder'],
      ['LeftShoulder', 'LeftArm'],
      ['LeftArm', 'LeftForeArm'],
      ['LeftForeArm', 'LeftHand'],
      ['LeftHand', 'LeftHand_ENDSITE'],
      ['Spine4', 'RightShoulder'],
      ['RightShoulder', 'RightArm'],
      ['RightArm', 'RightForeArm'],
      ['RightForeArm', 'RightHand'],
      ['RightHand', 'RightHand_ENDSITE']
    ]

    const limbs = connections.map(c => {
      return [this.joints[c[0]], this.joints[c[1]]]
    })

    return limbs
  }
}
