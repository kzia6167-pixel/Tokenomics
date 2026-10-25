document.addEventListener('DOMContentLoaded', function() {
    const overlay = document.getElementById('overlay');
  
    // overlay.addEventListener('click', function() {
    //   overlay.classList.remove('active');
    // });
  
    setTimeout(function() {
      overlay.classList.add('active');
    },500); // Adjust the delay as needed
  });
  function sliceSize(dataNum, dataTotal) {
    return (dataNum / dataTotal) * 360;
  }
  function addSlice(sliceSize, pieElement, offset, sliceID, color) {
    $(pieElement).append("<div class='slice "+sliceID+"'><span></span></div>");
    var offset = offset - 1;
    var sizeRotation = -179 + sliceSize;
    $("."+sliceID).css({
      "transform": "rotate("+offset+"deg) translate3d(0,0,0)"
    });
    $("."+sliceID+" span").css({
      "transform"       : "rotate("+sizeRotation+"deg) translate3d(0,0,0)",
      "background-color": color
    });
  }
  function iterateSlices(sliceSize, pieElement, offset, dataCount, sliceCount, color) {
    var sliceID = "s"+dataCount+"-"+sliceCount;
    var maxSize = 179;
    if(sliceSize<=maxSize) {
      addSlice(sliceSize, pieElement, offset, sliceID, color);
    } else {
      addSlice(maxSize, pieElement, offset, sliceID, color);
      iterateSlices(sliceSize-maxSize, pieElement, offset+maxSize, dataCount, sliceCount+1, color);
    }
  }
  function createPie(dataElement, pieElement) {
    var listData = [];
    $(dataElement+" span").each(function() {
      listData.push(Number($(this).html()));
    });
    var listTotal = 0;
    for(var i=0; i<listData.length; i++) {
      listTotal += listData[i];
    }
    var offset = 0;
    var color = [
      "cornflowerblue", 
      "olivedrab", 
      "orange", 
      "tomato", 
      "crimson", 
      "purple", 
      "turquoise", 
      "forestgreen", 
      "navy", 
      "gray"
    ];
    for(var i=0; i<listData.length; i++) {
      var size = sliceSize(listData[i], listTotal);
      iterateSlices(size, pieElement, offset, i, 0, color[i]);
      $(dataElement+" li:nth-child("+(i+1)+")").css("border-color", color[i]);
      offset += size;
    }
  }
  createPie(".pieID.legend", ".pieID.pie");
// script.js
document.addEventListener('DOMContentLoaded', function() {
  const scrollLink = document.getElementById('scroll-link');
  
  scrollLink.addEventListener('click', function(event) {
    event.preventDefault(); // Prevent default link behavior
    
    // Add a class to trigger the animation
    scrollLink.classList.add('clicked');
    
    // Wait for 1 second
    setTimeout(function() {
      // Scroll to the target section smoothly
      const targetSection = document.querySelector(scrollLink.getAttribute('href'));
      targetSection.scrollIntoView({ behavior: 'smooth' });
    }, 500); // 1000 milliseconds = 1 second
  });
});
// script.js
document.addEventListener('DOMContentLoaded', function() {
  const scrollLinked = document.getElementById('scroll-linked');
  
  scrollLinked.addEventListener('click', function(event) {
    event.preventDefault(); // Prevent default link behavior
    
    // Add a class to trigger the animation
    scrollLinked.classList.add('clicked');
    
    // Wait for 1 second
    setTimeout(function() {
      // Scroll to the target section smoothly
      const targetSection = document.querySelector(scrollLinked.getAttribute('href'));
      targetSection.scrollIntoView({ behavior: 'smooth' });
    }, 500); // 1000 milliseconds = 1 second
  });
});
// script.js
document.addEventListener('DOMContentLoaded', function() {
  const scrollLinkhome = document.getElementById('scroll-linkhome');
  
  scrollLinkhome.addEventListener('click', function(event) {
    event.preventDefault(); // Prevent default link behavior
    
    // Add a class to trigger the animation
    scrollLinkhome.classList.add('clicked');
    
    // Wait for 1 second
    setTimeout(function() {
      // Scroll to the target section smoothly
      const targetSection = document.querySelector(scrollLinkhome.getAttribute('href'));
      targetSection.scrollIntoView({ behavior: 'smooth' });
    }, 500); // 1000 milliseconds = 1 second
  });
});


var w = c.width = window.innerWidth,
    h = c.height = window.innerHeight,
    ctx = c.getContext( '2d' ),
    
    minDist = 10,
    maxDist = 30,
    initialWidth = 10,
    maxLines = 100,
    initialLines = 4,
    speed = 5,
    
    lines = [],
    frame = 0,
    timeSinceLast = 0,
    
    dirs = [
   // straight x, y velocity
      [ 0, 1 ],
      [ 1, 0 ],
      [ 0, -1 ],
    	[ -1, 0 ],
   // diagonals, 0.7 = sin(PI/4) = cos(PI/4)
      [ .7, .7 ],
      [ .7, -.7 ],
      [ -.7, .7 ],
      [ -.7, -.7]
    ],
    starter = { // starting parent line, just a pseudo line
      
      x: w / 2,
      y: h / 2,
      vx: 0,
      vy: 0,
      width: initialWidth
    };

function init() {
  
  lines.length = 0;
  
  for( var i = 0; i < initialLines; ++i )
    lines.push( new Line( starter ) );
  
  ctx.fillStyle = '#222';
  ctx.fillRect( 0, 0, w, h );
  
  // if you want a cookie ;)
  // ctx.lineCap = 'round';
}
function getColor( x ) {
  
  return 'hsl( hue, 80%, 50% )'.replace(
  	'hue', x / w * 360 + frame
  );
}
function anim() {
  
  window.requestAnimationFrame( anim );
  
  ++frame;
  
  ctx.shadowBlur = 0;
  ctx.fillStyle = 'rgba(0,0,0,.02)';
  ctx.fillRect( 0, 0, w, h );
  ctx.shadowBlur = .5;
  
  for( var i = 0; i < lines.length; ++i ) 
    
    if( lines[ i ].step() ) { // if true it's dead
      
      lines.splice( i, 1 );
      --i;
      
    }
  
  // spawn new
  
  ++timeSinceLast
  
  if( lines.length < maxLines && timeSinceLast > 10 && Math.random() < .5 ) {
    
    timeSinceLast = 0;
    
    lines.push( new Line( starter ) );
    
    // cover the middle;
    ctx.fillStyle = ctx.shadowColor = getColor( starter.x );
    ctx.beginPath();
    ctx.arc( starter.x, starter.y, initialWidth, 0, Math.PI * 2 );
    ctx.fill();
  }
}

function Line( parent ) {
  
  this.x = parent.x | 0;
  this.y = parent.y | 0;
  this.width = parent.width / 1.25;
  
  do {
    
    var dir = dirs[ ( Math.random() * dirs.length ) |0 ];
    this.vx = dir[ 0 ];
    this.vy = dir[ 1 ];
    
  } while ( 
    ( this.vx === -parent.vx && this.vy === -parent.vy ) || ( this.vx === parent.vx && this.vy === parent.vy) );
  
  this.vx *= speed;
  this.vy *= speed;
  
  this.dist = ( Math.random() * ( maxDist - minDist ) + minDist );
  
}
Line.prototype.step = function() {
  
  var dead = false;
  
  var prevX = this.x,
      prevY = this.y;
  
  this.x += this.vx;
  this.y += this.vy;
  
  --this.dist;
  
  // kill if out of screen
  if( this.x < 0 || this.x > w || this.y < 0 || this.y > h )
    dead = true;
  
  // make children :D
  if( this.dist <= 0 && this.width > 1 ) {
    
    // keep yo self, sometimes
    this.dist = Math.random() * ( maxDist - minDist ) + minDist;
    
    // add 2 children
    if( lines.length < maxLines ) lines.push( new Line( this ) );
    if( lines.length < maxLines && Math.random() < .5 ) lines.push( new Line( this ) );
    
    // kill the poor thing
    if( Math.random() < .2 ) dead = true;
  }
  
  ctx.strokeStyle = ctx.shadowColor = getColor( this.x );
  ctx.beginPath();
  ctx.lineWidth = this.width;
  ctx.moveTo( this.x, this.y );
  ctx.lineTo( prevX, prevY );
  ctx.stroke();
  
  if( dead ) return true
}

init();
anim();

window.addEventListener( 'resize', function() {
  
  w = c.width = window.innerWidth;
  h = c.height = window.innerHeight;
  starter.x = w / 2;
  starter.y = h / 2;
  
  init();
} )
  
function sliceSize(dataNum, dataTotal) {
  return (dataNum / dataTotal) * 360;
}
function addSlice(sliceSize, pieElement, offset, sliceID, color) {
  $(pieElement).append("<div class='slice "+sliceID+"'><span></span></div>");
  var offset = offset - 1;
  var sizeRotation = -179 + sliceSize;
  $("."+sliceID).css({
    "transform": "rotate("+offset+"deg) translate3d(0,0,0)"
  });
  $("."+sliceID+" span").css({
    "transform"       : "rotate("+sizeRotation+"deg) translate3d(0,0,0)",
    "background-color": color
  });
}
function iterateSlices(sliceSize, pieElement, offset, dataCount, sliceCount, color) {
  var sliceID = "s"+dataCount+"-"+sliceCount;
  var maxSize = 179;
  if(sliceSize<=maxSize) {
    addSlice(sliceSize, pieElement, offset, sliceID, color);
  } else {
    addSlice(maxSize, pieElement, offset, sliceID, color);
    iterateSlices(sliceSize-maxSize, pieElement, offset+maxSize, dataCount, sliceCount+1, color);
  }
}
function createPie(dataElement, pieElement) {
  var listData = [];
  $(dataElement+" span").each(function() {
    listData.push(Number($(this).html()));
  });
  var listTotal = 0;
  for(var i=0; i<listData.length; i++) {
    listTotal += listData[i];
  }
  var offset = 0;
  var color = [
    "cornflowerblue", 
    "olivedrab", 
    "orange", 
    "tomato", 
    "crimson", 
    "purple", 
    "turquoise", 
    "forestgreen", 
    "navy", 
    "gray"
  ];
  for(var i=0; i<listData.length; i++) {
    var size = sliceSize(listData[i], listTotal);
    iterateSlices(size, pieElement, offset, i, 0, color[i]);
    $(dataElement+" li:nth-child("+(i+1)+")").css("border-color", color[i]);
    offset += size;
  }
}
createPie(".pieID.legend", ".pieID.pie");



