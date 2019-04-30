
let skeleton = new Skeleton()

let joints = {}


let position = {
  x: 0,
  y: 0
}
let old_position = {
  x: position.x,
  y: position.y
}

var arrayPosition = [];

function setup() {
  createCanvas(800, 800)
}
var drawIteration = 0;

function draw() {
 
  background(235)
  //noStroke()
  //random gray
  
  //fill(0)
  translate(width / 2, height / 2)
 // ellipse(position.x, position.y, 10, 10)
  stroke(89)
  
 
  
  if(drawIteration>2){
    //console.log(drawIteration);
    for (let j = 2; j < arrayPosition.length-1 ; j++) {
      //console.log(j)
      line(arrayPosition[j].x, arrayPosition[j].y, arrayPosition[j-1].x, arrayPosition[j-1].y );
    }
    
  }
  drawIteration++;



  const limbs = skeleton.getAllLimbs()
  //console.log(limbs)
  limbs.forEach(limb => {
    line(limb[0][0] / 10, limb[0][2] / 10, limb[1][0] / 10, limb[1][2] / 10)
  })

  noStroke()
  randomColor = color(random(255),random(255),random(255));
      
  fill(randomColor);
  //fill(0)

  const joints = skeleton.getAll()
  joints.forEach(joint => {
    if (joint) ellipse(joint[0] / 10, joint[2] / 10, 3, 3)
  })


}

const oscPort = new osc.WebSocketPort({
  url: "ws://127.0.0.1:8888",
  metadata: true
})

const onWebSocketMessage = function (message) {
  
   const [_, perfomer2, joint2] = message.address.split('/')
   //console.log(perfomer2, joint2)
  
  const x = message.args[0].value / 10
  const y = message.args[2].value / 10
  
  
  old_position = position
   position = {
     x, y
   }
  
  if(drawIteration > 100 ){
    //arrayPosition[drawIteration % 98] = old_position
    arrayPosition.push(old_position);
    arrayPosition.shift() ;
  } else {
    arrayPosition.push(old_position);
  }
  
  //console.log(arrayPosition)


  const [__, performer, joint] = message.address.split('/')
  const values = message.args.map(e => {
    return e.value
  })

  if (joint && (joint in joints === false)) {
    joints[joint] = 1
  }

  skeleton.set(joint, values)
 
}

oscPort.on('message', onWebSocketMessage)

oscPort.open()
