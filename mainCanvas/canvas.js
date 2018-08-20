let btn = document.getElementById('spinBtn');
let nameInput = document.getElementById('nameInput');
let text = 'Tab the screen and get to know your colleagues';  // The message displayed
let activated = false;
let nameInputActive = false;

window.addEventListener('click', showNameInput);


function canvasText(){
    
    let chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ&.: -';  // All possible Charactrers
    let scale = 30;  // Font size and overall scale
    let breaks = 0.003;  // Speed loss per frame
    let endSpeed = 0.1;  // Speed at which the letter stops
    let firstLetter = 180;  // Number of frames untill the first letter stopps (60 frames per second)
    let delay = 2;  // Number of seconds between first and last letter stopping

    if(activated){
        delay = 45;
    }

    activated = true;

    let canvas = document.getElementById('mainCanvas');
    canvas.style.marginTop = window.innerHeight * 0.05 + 'px';
    canvas.style.width = window.innerWidth + 'px';
    canvas.style.height = window.innerHeight * 0.2 + 'px';

    let ctx = canvas.getContext('2d');

    text = text.split('');
    chars = chars.split('');
    let charMap = [];
    let offset = [];
    let offsetV = [];

    for(var i=0; i<chars.length; i++){
    charMap[chars[i]] = i;
    }

    for(var i=0; i<text.length; i++){
    var f = firstLetter+delay*i;
    offsetV[i] = endSpeed+breaks*f;
    offset[i] = -(1+f)*(breaks*f+2*endSpeed)/2;
    }

    (onresize = function(){
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
    })();

    requestAnimationFrame(loop = function(){
    ctx.setTransform(1,0,0,1,0,0);
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.globalAlpha = 1;
    ctx.fillStyle = 'rgb(1, 7, 37)';
    ctx.fillRect(0,(canvas.height-scale)/2,canvas.width,scale+1);
    for(var i=0;i<text.length;i++){
        ctx.fillStyle = '#d4004f';
        ctx.textBaseline = 'middle';
        ctx.textAlign = 'center';
        ctx.setTransform(1,0,0,1,Math.floor((canvas.width-scale*(text.length-1))/2),Math.floor(canvas.height/2));
        var o = offset[i];
        while(o<0)o++;
        o %= 1;
        var h = Math.ceil(canvas.height/2/scale)
        for(var j=-h;j<h;j++){
        var c = charMap[text[i]]+j-Math.floor(offset[i]);
        while(c<0)c+=chars.length;
        c %= chars.length;
        var s = 1-Math.abs(j+o)/(canvas.height/5/scale+1)
        ctx.globalAlpha = s
        ctx.font = scale*s + 'px Helvetica'
        ctx.fillText(chars[c],scale*i,(j+o)*scale);
        }
        offset[i] += offsetV[i];
        offsetV[i] -= breaks;
        if(offsetV[i]<endSpeed){
        offset[i] = 0;
        offsetV[i] = 0;
        }
    }
    
    requestAnimationFrame(loop);
    });

}

canvasText();

function showNameInput(){
    if(!nameInputActive){
        nameInput.style.display = "block";
        TweenMax.to(nameInput, 1.5, {opacity: 1});
        nameInput.focus();
        nameInputActive = true;
    }
}