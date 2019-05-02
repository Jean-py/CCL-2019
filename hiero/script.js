let skeleton = new Skeleton()

let joints = {}

let angle = 0.0;
let jitter = 0.0;


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
  createCanvas(1000 , 1000)

}
var drawIteration = 0;


const randomColor = () => '#' + Math.random().toString(16).substr(-6)
var randomColorBis = "#00ff00";

var r = 0 ;
var g = 0 ;
var b = 0 ;

var stringColor = 'rgba('+r+','+g+','+b+',1)';

// var start = 0x000000,
//     end = 0xFFFFFF, temp;
//     var intervalId = setInterval(function(){
//        if(start== end){clearInterval(intervalId )};
//        temp = (start).toString(16);                  
//              if(temp.length < 8){

//                  temp = "0000000".substring(0, 8-temp.length)+temp; 
//              } 
//                        start++;
//             console.log(temp ); 
//      }, 10);   


var start = 0x0000ff;
var end = 0xFFFFFF, temp;

function draw() {





  temp = (start).toString(16);                  
             if(temp.length < 8){

                 temp = "#"+"000".substring(0, 10-temp.length)+temp; 
             } 
                       start++;


  stringColor = 'rgba('+r+','+g+','+b+',1)';
 
  const randomColor = () => '#' + Math.random().toString(16).substr(-6)


  if(drawIteration %100  === 1 ){
      randomColorBis = temp;
      //background(235)
  }
  //noStroke()
  //random gray
  
  fill(0)
  translate(width / 2, height / 2)
 // ellipse(position.x, position.y, 10, 10)
  
  if (second() % 2 === 0) {
    jitter = random(-0.1, 0.1);
  }
  //increase the angle value using the most recent jitter value
  angle = 0.2;
  let c = cos(angle);

  rotate(c)
  //translate(200,200)

  

  if(drawIteration>2){
    //console.log(drawIteration);
    noStroke()
    for (let j = 2; j < arrayPosition.length-1 ; j++) {
      //stroke(color((255-j),(0+j),(255+j)));
      var tempcolor = hexToRgb(randomColorBis);
      stroke(rgb2hex(currentColor));


      //console.log(j)
      //line(arrayPosition[j].x, arrayPosition[j].y, arrayPosition[j-1].x, arrayPosition[j-1].y );
    }
    
  }

  drawIteration++;



  const limbs = skeleton.getAllLimbs()
  var tempcolor = hexToRgb(randomColorBis);
  //console.log(limbs)
  limbs.forEach(limb => {
      
      stroke(rgb2hex(currentColor));
      //console.log(limb[0][0] / 10);
      line(limb[0][0] / 10, limb[0][2] / 10, limb[1][0] / 10, limb[1][2] / 10)
  })

  noStroke()
  
      
  fill(90);
  //fill(0)

  // const joints = skeleton.getAll()
  // joints.forEach(joint => {
  //   if (joint) ellipse(joint[0] / 10, joint[2] / 10, 3, 3)
  // })


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
  
  if(drawIteration > 10 ){
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

  if (joint && (joint in joints === false) ) {
    joints[joint] = 1
  }

  skeleton.set(joint, values)
 
}

oscPort.on('message', onWebSocketMessage)

oscPort.open()


var rgbToHex = function (rgb) { 
  var hex = Number(rgb).toString(16);
  if (hex.length < 2) {
       hex = "0" + hex;
  }
  return hex;
};



function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}