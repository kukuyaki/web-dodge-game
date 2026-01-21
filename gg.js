console.log(game)
const BACKGROUND = "#101010"
let PLAYERCOLOR = "rgb(18 230 216)"

game.width = document.documentElement.scrollWidth
game.height = document.documentElement.scrollHeight
const FPS = 60
const ctx = game.getContext("2d")
console.log(ctx)

function clear() {
    ctx.fillStyle = BACKGROUND
    ctx.fillRect(0, 0, game.width, game.height)
}
function point({x, y,c}) {
    const s = 1
    ctx.fillStyle = c
    ctx.fillRect(x - s/2, y - s/2, s, s)
}

function player({x,y,s}) {
    ctx.fillStyle = PLAYERCOLOR
    ctx.fillRect(x - s/2, y - s/2, s, s)
}


const max_circle = Math.max(game.width,game.height)
let t = max_circle
let a = game.width/2 + t
let b = game.height/2 + t
let ap = game.width/2
let bp = game.height/2
let sv = 20
let lisspace = 0
let down = 0
let touch=1
let conti =1
let rc=80
let gc=230
let bc=216

// keyboard
window.addEventListener("touchstart", (event) => {
    if(conti){
event.preventDefault(); // 防止手機縮放或滾動
    touch = 0
        lisspace = 1
        setTimeout(() => {
            lisspace = 0;
            down = 1
            setTimeout(() => {
            down = 0;
            touch = 1
            PLAYERCOLOR = "rgb(18 260 216)"

        }, 10000 / FPS);
        }, 10000 / FPS);
    }
    else{
        conti = 1
        PLAYERCOLOR = "#12e6d8ff"
        t = max_circle
        setTimeout(frame, 1000/FPS);
        for(let i = 0 ;i<enemy.length;i++){
        enemy[i][1] = enemy[i][0]
    }
    }
    
}, { passive: false });

window.addEventListener("keydown", (event) => {    
    
    if (event.code === "Space") {
        event.preventDefault();
        if (event.repeat) return;
        touch = 0
        lisspace = 1
        setTimeout(() => {
            lisspace = 0;
            down = 1
            setTimeout(() => {
            down = 0;
            touch = 1
            PLAYERCOLOR = "rgb(18 260 216)"

        }, 10000 / FPS);
        }, 10000 / FPS);
            
    }
    if (event.code === "KeyR" && conti == 0) {
        if (event.repeat) return;
        conti = 1
        PLAYERCOLOR = "#12e6d8ff"
        t = max_circle
        setTimeout(frame, 1000/FPS);
        for(let i = 0 ;i<enemy.length;i++){
        enemy[i][1] = enemy[i][0]
    }
            
    }
    });
function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}
function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
// enemy generate
const enemy = [[500,500,"#a8af1eff"],
                [510,510,"#1998beff"],
                [1000,2000,"#4fd167ff"],
                [800,510,"#af7c1eff"]]
for (let i = 0 ;i<3;i++){
    enemy[i]=[getRandomArbitrary(500,1000),getRandomArbitrary(500,1000),getRandomColor()    ]
}

function circle_att(id){
    t = enemy[id][1]

    t-=10
    if(t<-enemy[id][0])(t=enemy[id][0])
    for (let d =0;d<2;d+=0.001){
        a=game.width/2 + t*Math.cos(Math.PI*d);
        b=game.height/2 + t*Math.sin(Math.PI*d);
        point({x:a,y:b,c:enemy[id][2]})
    }
    enemy[id][1] = t
}

function detect_hit(){
    hit = 0
    for(let i = 0 ;i<enemy.length;i++){
        if (Math.abs(enemy[i][1]) <= 10){
            hit = 1
        }
    }
    if(touch ==1 && hit){
        PLAYERCOLOR = "#e00000ff"
        conti =0
        console.log("hit")
    }
}

function frame(){
    clear()
    detect_hit()

    for(let i  = 0 ;i<enemy.length;i++){
        circle_att(i)
        }

    player({x:ap,y:bp,s:sv})
    if(lisspace){
        PLAYERCOLOR = "rgb(18 0 216)"
        sv+=1
    }
    if(down){
        sv-=1
    }
    if (conti){
    setTimeout(frame, 1000/FPS);

    }

}
setTimeout(frame, 1000/FPS);
