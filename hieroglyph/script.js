let skeleton = new Skeleton()

let joints = {}

let angle = 0.0;
let jitter = 0.0;


//let nmMaxIt = 2500;
let nmMaxIt = 1000;

let nmMaxItCurrent = 0;

//Temps tampon entre deux itération
let tamponTime = 50;
let tamponTimeCurrent = 0;


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
  createCanvas(1000 , 1000);

}


var drawIteration = 0;

//Create an HTML image
    var link = document.createElement('a');
    link.innerHTML = 'download image';
    link.addEventListener('mousedown', function(ev) {
      link.href = canvas.toDataURL();
      link.download = "mypainting.png";
    }, false);
    document.body.appendChild(link);


var iconcycle = [
  drawSkeleton,drawSkeleton2,drawSkeleton3,drawSkeleton4,drawSkeleton5,drawSkeleton6,drawSkeleton7,,drawSkeleton8,drawSkeleton9,drawSkeleton10,drawSkeleton11

];
var nbalgo = Math.floor(Math.random() * iconcycle.length)


function draw() {

   fill(0)
  translate(width / 2, height / 2)
    

  if(nmMaxItCurrent <= nmMaxIt ){
    if(iconcycle[nbalgo]){
          iconcycle[nbalgo]();

    }
    //drawSkeleton11()


    nmMaxItCurrent++;
  } else if( tamponTimeCurrent <=  tamponTime ) {

    tamponTimeCurrent ++;
  } else {

    randomIt =   Math.floor(Math.random() * (+5000 - +1000)) + +1000; 
    nbalgo = Math.floor(Math.random() * iconcycle.length)
    console.log("nbalgo : " + nbalgo );


    link.href = canvas.toDataURL();
    //console.log(link, link.href)
    link.download = "mypainting"+Math.random+".png";
     link.click();

    //debugBase64(link.href);

    window.location.assign(link.href);


    //var x = window.open();
    // x.document.open();
    // x.document.write(link.href);
    // x.document.close();
   // window.location.href=link.href;

    nmMaxIt = randomIt;
    nmMaxItCurrent = 0;
    tamponTimeCurrent = 0;
    background(235)
  }
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

function drawSkeleton(){


  //console.log(" ** drawSkeleton **")

  randomIt =   Math.floor(Math.random() * (+5000 - +1000)) + +1000; 

  
  if (second() % 2 === 0) {
    jitter = random(-0.1, 0.1);
  }
  //increase the angle value using the most recent jitter value
  angle = 0.2;
  let c = cos(angle);
  rotate(c)

  if(drawIteration>2){
    //console.log(drawIteration);
    noStroke()
  
    for (let j = 2; j < arrayPosition.length-1 ; j++) {
      //stroke(color((255-j),(0+j),(255+j)));
      
      stroke(rgb2hex(currentColor));
      //console.log(j)
      //line(arrayPosition[j].x, arrayPosition[j].y, arrayPosition[j-1].x, arrayPosition[j-1].y );
    }
    
  }

  drawIteration++;
  //const limbs = skeleton.getAllLimbs()
  const limbs = skeleton.getRandomLimbs()

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

function drawSkeleton2(){

  //console.log(" ** drawSkeleton2 **")
    randomIt =   Math.floor(Math.random() * (+1500 - +200)) + +200; 


  if(drawIteration>2){
    //console.log(drawIteration);
    noStroke()
    for (let j = 2; j < arrayPosition.length-1 ; j++) {
      //stroke(color((255-j),(0+j),(255+j)));
      stroke(rgb2hex(currentColor));
      line(arrayPosition[j].x, arrayPosition[j].y, arrayPosition[j-1].x, arrayPosition[j-1].y );
    }
    
  }
  drawIteration++;
  const limbs = skeleton.getRandomLimbs()
  //console.log(limbs)
  limbs.forEach(limb => {
      stroke(rgb2hex(currentColor));
      //console.log(limb[0][0] / 10);
      line(limb[0][0] / 10, limb[0][2] / 10, limb[1][0] / 10, limb[1][2] / 10)
  })
  noStroke()
  fill(90);
}

function drawSkeleton3(){

  //console.log(" ** drawSkeleton 3 **")
  randomIt =   Math.floor(Math.random() * (+1500 - +200)) + +200

  //nmMaxIt =  Math.floor(Math.random() * (+1000 - +500)) + +500; 

 
 // ellipse(position.x, position.y, 10, 10)
  
  if (second() % 2 === 0) {
    jitter = random(-0.1, 0.1);
  }
  //increase the angle value using the most recent jitter value
  angle = 0.8;
  let c = cos(angle);

  rotate(c)
  //translate(200,200)

  

  if(drawIteration>2){
    //console.log(drawIteration);
    noStroke()
    for (let j = 2; j < arrayPosition.length-1 ; j++) {
      //stroke(color((255-j),(0+j),(255+j)));
      stroke(rgb2hex(currentColor));


      //console.log(j)
      line(arrayPosition[j].x, arrayPosition[j].y, arrayPosition[j-1].x, arrayPosition[j-1].y );
    }
    
  }

  drawIteration++;
  const limbs = skeleton.getAllLimbs()
 
  //console.log(limbs)
  limbs.forEach(limb => {
      
      stroke(rgb2hex(currentColor));
      //console.log(limb[0][0] / 10);
      line(limb[0][0] / 10, limb[0][2] / 10, limb[1][0] / 10, limb[1][2] / 10)
  })
  noStroke()
      
  fill(90);
 }



 function drawSkeleton4(){

  //console.log(" ** drawSkeleton 4 **")
  randomIt =   Math.floor(Math.random() * (+1500 - +200)) + +200;

  const limbs = skeleton.getAllLimbs()

  limbs.forEach(limb => {
      
      stroke(rgb2hex(currentColor));
      //console.log(limb[0][0] / 10);
      line(limb[0][0]/6 , limb[0][2] /6, limb[0][0]/6 , limb[1][2] /6)
  })
  noStroke()
  fill(90);
 }


 function drawSkeleton5(){

  //console.log(" ** drawSkeleton 5 **")
  randomIt =   Math.floor(Math.random() * (+1500 - +200)) + +200;

  const limbs = skeleton.getAllLimbs()

  limbs.forEach(limb => {
      stroke(rgb2hex(currentColor));
      //console.log(limb[0][0] / 10);
      line(limb[0][16] / 10, limb[0][2] / 10, limb[1][0] / 10, limb[1][2] / 10)
  })
 
 }



 function drawSkeleton5(){

  //console.log(" ** drawSkeleton 5 **")
  randomIt =   Math.floor(Math.random() * (+1500 - +200)) + +200;

  const limbs = skeleton.getAllLimbs()

  limbs.forEach(limb => {
      stroke(rgb2hex(currentColor));
      //console.log(limb[0][0] / 10);
      line(limb[0][16] / 10, limb[0][2] / 10, limb[1][0] / 10, limb[1][2] / 10)
  })
 
 }


 function drawSkeleton6(){

  //console.log(" ** drawSkeleton 6 **")
  randomIt =   Math.floor(Math.random() * (+1500 - +200)) + +200;

  const limbs = skeleton.getAllLimbs()

  limbs.forEach(limb => {
      stroke(rgb2hex(currentColor));
      //console.log(limb[0][0] / 10);
      line(limb[0][Math.floor(Math.random() * 100) + 1  ]/6 , limb[0][Math.floor(Math.random() * 100) + 1 ] /6, limb[0][Math.floor(Math.random() * 100) + 1 ]/6 , limb[1][0] /6)
  })

 }



 function drawSkeleton7(){

  //console.log(" ** drawSkeleton 7 **")
  randomIt =   Math.floor(Math.random() * (+1500 - +200)) + +200;

  const limbs = skeleton.getAllLimbs()

  limbs.forEach(limb => {
      stroke(rgb2hex(currentColor));
      //console.log(limb[0][0] / 10);
      line(limb[0][0] / 10, limb[0][2] / 10, limb[1][0] / 10, limb[1][2] / 10)
      bezier(limb[0][0] / 10, limb[0][2] / 10, limb[1][0] / 10, limb[1][2] / 10, 90, 90, 15, 80);
  })
 }

  function drawSkeleton8(){

  //console.log(" ** drawSkeleton 8 **")
  randomIt =   Math.floor(Math.random() * (+1500 - +200)) + +200;

  const limbs = skeleton.getAllLimbs()

  limbs.forEach(limb => {
      stroke(rgb2hex(currentColor));
      //console.log(limb[0][0] / 10);
      //line(limb[0][0] / 10, limb[0][2] / 10, limb[1][0] / 10, limb[1][2] / 10)
      bezier(limb[0][0] / 5, limb[0][2] / 10, limb[1][0] / 10, limb[1][2] / 10, limb[0][0] / 5, limb[0][2] / 10, limb[1][0] / 10, 90);

      //line(limb[1][2] / 10, limb[1][0] / 10, limb[0][2] / 10, limb[0][0] / 10)
  })
 }



  function drawSkeleton9(){

  //console.log(" ** drawSkeleton 9 **")
  randomIt =   Math.floor(Math.random() * (+3000 - +200)) + +200;

  const limbs = skeleton.getAllLimbs()

  limbs.forEach(limb => {
      stroke(rgb2hex(currentColor));
      //console.log(limb[0][0] / 10);
           bezier(limb[0][0] / 5, 20, limb[1][0] / 10, limb[1][2] / 10, limb[0][0] / 5, limb[0][2] / 10, limb[1][0] / 10, 90);

      
  })
 }

  function drawSkeleton10(){

  //console.log(" ** drawSkeleton 10 **")
  randomIt =   Math.floor(Math.random() * (+1500 - +200)) + +200;

  const limbs = skeleton.getAllLimbs()

  limbs.forEach(limb => {
      stroke(rgb2hex(currentColor));
      //console.log(limb[0][0] / 10);
     //bezier(limb[0][0] / 5, limb[0][2] / 10, limb[1][0] / 10, limb[1][2] / 10, limb[0][0] / 5, limb[0][2] / 10, limb[1][0] / 10, 90);
     //bezier(limb[0][0] / 5, limb[0][2] / 10, limb[1][0] / 10, limb[1][2] / 10, limb[0][0] / 5, limb[0][2] / 10, limb[1][0] / 10,limb[0][0] / 5, limb[0][2] / 10, limb[1][0] / 10, limb[1][2] / 10, limb[0][0] / 5, limb[0][2] / 10, limb[1][0] / 10,limb[0][0] / 5, limb[0][2] / 10, limb[1][0] / 10, limb[1][2] / 10, limb[0][0] / 5, limb[0][2] / 10, limb[1][0] / 10, 90);

    

      stroke(rgb2hex(currentColor));
      //console.log(limb[0][0] / 10);
      if (second() % 2 === 0) {
    jitter = random(-0.1, 0.1);
  }
  //increase the angle value using the most recent jitter value
  angle = 0.8;
  let c = cos(angle);

  rotate(c)
      line(limb[0][0] / 10, limb[0][2] / 10, limb[1][0] / 10, limb[1][2] / 10)
      bezier(limb[0][0] / 5, 20, limb[1][0] / 10, limb[1][2] / 10, limb[0][0] / 5, limb[0][2] / 10, limb[1][0] / 10, 90);
      bezier(limb[0][0] / 5, 20, limb[1][0] / 10, limb[1][2] / 10,Math.random()*100, limb[0][0] / 5, limb[0][2] / 10, limb[1][0] / 10, Math.random()*100);
      bezier(limb[0][0] / 5, 20, Math.random()*100,limb[1][0] / 10, limb[1][2] / 10, limb[0][0] / 5, limb[0][2] / 10, limb[1][0] / 10, Math.random()*100);



  })


 }

var itt= 0;
 function drawSkeleton11(){

  //console.log(" ** drawSkeleton 10 **")
  randomIt =   Math.floor(Math.random() * (+1500 - +200)) + +200;

  const limbs = skeleton.getAllLimbs()
  
  limbs.forEach(limb => {
      //console.log(limb[0][0] / 10);
     //bezier(limb[0][0] / 5, limb[0][2] / 10, limb[1][0] / 10, limb[1][2] / 10, limb[0][0] / 5, limb[0][2] / 10, limb[1][0] / 10, 90);
     //bezier(limb[0][0] / 5, limb[0][2] / 10, limb[1][0] / 10, limb[1][2] / 10, limb[0][0] / 5, limb[0][2] / 10, limb[1][0] / 10,limb[0][0] / 5, limb[0][2] / 10, limb[1][0] / 10, limb[1][2] / 10, limb[0][0] / 5, limb[0][2] / 10, limb[1][0] / 10,limb[0][0] / 5, limb[0][2] / 10, limb[1][0] / 10, limb[1][2] / 10, limb[0][0] / 5, limb[0][2] / 10, limb[1][0] / 10, 90);

    
      
      console.log((currentColor))


     // currentColor.push(Math.random());
      stroke(currentColor);

      //console.log(limb[0][0] / 10);
      if (second() % 2 === 0) {
    jitter = random(-0.1, 0.1);
  }
  //increase the angle value using the most recent jitter value
  angle = 0.06;
  let c = angle

      var u = limb[1][0] / 8 ;
      var i = limb[0][2] / 16;
      var o = limb[0][0] / 14 ;
      var p = limb[1][2] / 10
     
      rotate(c)
      translate(c)
     
      //bezier(200,limb[0][0] / 5, 20, limb[1][0] / 10, limb[1][2] / 10, limb[0][0] / 5, limb[0][2] / 10, limb[1][0] / 10, 90);
      //     bezier(800,limb[0][0] / 5, 20, limb[1][0] / 10, limb[1][2] / 10, limb[0][0] / 5, limb[0][2] / 10, limb[1][0] / 10, 900);

     // bezier(limb[0][0] / 5, 20, limb[1][0] / 10, limb[1][2] / 10,Math.random()*100, limb[0][0] / 5, limb[0][2] / 10, limb[1][0] / 10, Math.random()*100);
      //bezier(0,limb[0][0] / 5, 20, itt,limb[1][0] / 10, limb[1][2] / 10,itt, limb[0][0] / 5, limb[0][2] / 10, limb[1][0] / 10, Math.random()*100);

      itt+= 0.001;
      bezier(0, u,u,i,p,o,o,100);

       //line(limb[0][0] / 10, limb[0][2] / 10, Math.random()*100,limb[1][0] / 10, Math.random()*100 ,limb[1][2] / 10,Math.random()*100)
  })


 }

function debugBase64(base64URL){
    var win = window.open();
    win.document.write('<iframe src="' + base64URL  + '" frameborder="0" style="border:0; top:0px; left:0px; bottom:0px; right:0px; width:100%; height:100%;" allowfullscreen></iframe>');
}