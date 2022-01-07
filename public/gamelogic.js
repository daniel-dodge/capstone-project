

const c = document.getElementById("Canvas");
const start = document.querySelector("#start");
const hiddenDiv = document.querySelector(".hidden-div")
let ctx = c.getContext("2d");
const gameDiv = document.querySelector('#game-data');
const textSec = document.querySelector("#game-text")
const firstText = document.querySelector("#first-text")
const secondText = document.querySelector("#second-text")
const size=25;
let deaths=0;
let numcoins=0;
let spawn = null;
let computeSeconds = null;
let nTervId;
let minute = 0;
let second = 00;
let millisecond = 0;
let cron;
let count = 0;
let totalDeaths
let completions
let userStuff = JSON.parse(window.localStorage.getItem('user'));
const getData = () => {
    axios.get('/gamedata')
    .then(res => {
        res.data.forEach(game => {
            console.log(game);
            let gameElem = 
            `
            <h1>${game.game_name}
            </h1>
            <h1>Made by ${game.game_username}</h1>
            <h3>Total deaths:${game.total_deaths}</h3>
            <h3>Average pass rate:${((game.total_completions/game.total_deaths) * 100).toFixed(2)}%</h3>
            <h3>Fastest Time:${game.game_record} by ${game.record_user}</h3>    
            `;
        gameDiv.innerHTML = gameElem;
        computeSeconds = game.game_record;
        totalDeaths = game.total_deaths
        completions = game.total_completions
        console.log(computeSeconds);
    })})
}
function startTimer() {
    if (count === 0){
    cron = setInterval(() => { timer(); }, 10);
    count++
    }
  };
  function timer() {
    if ((millisecond += 10) == 1000) {
      millisecond = 0;
      second++;
    }
    if (second == 60) {
      second = 0;
      minute++;
    }
    if (minute == 9) {
      alert("you have lost fastest time privileges because going any higher than 10 will break some code that i dont feel like fixing so sorry about that")
      clearInterval(cron)

    }
    document.getElementById('minute').innerText = returnData(minute);
    document.getElementById('second').innerText = returnData(second);
    document.getElementById('millisecond').innerText = returnData(millisecond);
  }
  
  function returnData(input) {
    return input > 10 ? input : `0${input}`
}
function move(x) {
    if(x.keyCode == 39) {
        moveright=1
    }
    else if(x.keyCode == 37) {
        moveleft=1
    } else if(x.keyCode == 38) {
        moveup=1
        // console.log(enemies[0]['xv'])
    } else if(x.keyCode == 40) {
        movedown=1
        
    }
}

function noMove(x) {
	if(x.keyCode == 39) {
        moveright=0
    } else if(x.keyCode == 37) {
        moveleft=0
    } else if(x.keyCode == 38) {
        moveup=0
    } else if(x.keyCode == 40) {
        movedown=0
    }
}

function movePlayer() {
	var oldx=player['x']
    var oldy=player['y']
	if (moveright==1) {player['x']+=speed}
    if (moveleft==1) {player['x']-=speed}
    collide(oldx,oldy)
    var oldx=player['x']
    var oldy=player['y']
    if (moveup==1) {player['y']-=speed

    }
// console.log(numcoins)
    if (movedown==1) {player['y']+=speed}
    collide(oldx,oldy)
}

function moveEnemies() {
	var i=0
    while (enemies.length>i) {
        enemies[i]['x']+=enemies[i]['xv']
        if (collideEnemy(enemies[i])) {
        	enemies[i]['xv']=0-enemies[i]['xv'] 
            // enemies[i]['x']+=enemies[i]['xv']
        }
        if (enemies[i]['minx']>=enemies[i]['x']) {enemies[i]['xv']=Math.abs(enemies[i]['xv'])}
        if (enemies[i]['x']>=enemies[i]['maxx']) {enemies[i]['xv']=0-Math.abs(enemies[i]['xv'])}
        enemies[i]['y']+=enemies[i]['yv']
        if (collideEnemy(enemies[i]) || enemies[i]['miny']>=enemies[i]['y'] || enemies[i]['y']>=enemies[i]['maxy']) {
        	enemies[i]['yv']=0-enemies[i]['yv']
            // enemies[i]['y']+=enemies[i]['yv']
        }
        i++
	}
}

function collide(x,y) {
	var i=0
    var player_rect={x:player['x'],y:player['y'],width:size*0.6,height:size*0.6}
    while (blocks.length>i) {
    	var block_rect={x:blocks[i]['x']*size,y:blocks[i]['y']*size,width:size,height:size}
			if (colliding(player_rect,block_rect) && blocks[i]['type']===1) {
            player['x']=x
        	player['y']=y
        }
        if (colliding(player_rect,block_rect) && blocks[i]['type']===3 && numcoins>=coins.length) {
            clearInterval(cron)
            stopInterval()
            c.setAttribute("id","byebye")
            let newSec = computeSeconds.replaceAll(':','')
            console.log(newSec)
            let compareNum = 0
            let userNum = (minute * 60) + (second) + (millisecond /1000)
            if (newSec.length === 6){
                compareNum += +(newSec[0])*60
                compareNum += +(newSec[1]+newSec[2])
                compareNum += +(newSec[3]+newSec[4]+newSec[5]) / 1000
                console.log(compareNum)
            } else if(newSec.length === 5){
                compareNum += +(newSec[1])
                compareNum += +(newSec[2]+newSec[3]+newSec[4]) / 1000
            }
            console.log(totalDeaths+deaths)
            console.log(completions + 1)
            let dataBody ={
                deaths : totalDeaths+deaths,
                completions: completions + 1
            }
            axios.put('/total',dataBody)
            .then(res => console.log(1, res))
            .catch(err => console.log(err))
            textSec.setAttribute('id','redisplay')
            if(userNum > compareNum){
                firstText.textContent = "You won!"
                secondText.textContent = "Can you beat the record?"
            } else if (userNum < compareNum){
                firstText.textContent ="You won!"
                if (userStuff !== null){
                    secondText.textContent = "You also beat the record!"
                    let num = `${minute}:${second}:${millisecond}`
                    console.log(num)
                let body = {
                    time :num,
                    user :userStuff[0]
                }
                axios.put('/game',body)
                .then(res => console.log(1, res))
                .catch(err => console.log(err))
            } else {
                secondText.textContent = "You also beat the record! If only you had an account."
            }
        }
        enemies = []
        coins = []
        blocks = []
            
        }
        i++
	}
    i=0
    while (enemies.length>i) {
    	enemy=enemies[i]
    	var enemy_rect={x:enemy['x']*size+(size*0.2),y:enemy['y']*size+(size*0.2),width:size*0.6,height:size*0.6}
        if (colliding(player_rect,enemy_rect)) {
        	player['x']=spawn[0]*size
        	player['y']=spawn[1]*size
            deaths+=1
            numcoins=0
            j=0
    		while (coins.length>j) {
    			coins[j]['collected']=0
                j++
			}
        }
    i++
    }
    i=0
    while (coins.length>i) {
    	coin=coins[i]
    	var coin_rect={x:coin['x']*size+(size*0.25),y:coin['y']*size+(size*0.25),width:size*0.5,height:size*0.5}
        if (colliding(player_rect,coin_rect) && coin['collected']===0) {
        	coin['collected']=1
            numcoins+=1
        }
    i++
    }
}

function skip(lv) {
    numcoins=0
    findSpawn(blocks)
    console.log(spawn)
    player['x']=spawn[0]*size
    player['y']=spawn[1]*size
    j=0
    while (coins.length>j) {
        coins[j]['collected']=0
        j++
    }
}

function collideEnemy(enemy) {
	let i=0
    var enemy_rect={x:enemy['x']*size,y:enemy['y']*size,width:size,height:size}
    while (blocks.length>i) {
    	var block_rect={x:blocks[i]['x']*size,y:blocks[i]['y']*size,width:size,height:size}
    	if (colliding(enemy_rect,block_rect) && (blocks[i]['type']===1 || blocks[i]['type']===4)) {
        	return true
        }
        i++
	}
    return false
}

function colliding(rect1,rect2) {
if (rect1.x < rect2.x + rect2.width &&
   rect1.x + rect1.width > rect2.x &&
   rect1.y < rect2.y + rect2.height &&
   rect1.y + rect1.height > rect2.y) {return true}
   return false
}

function draw() {
	document.getElementById('level').innerHTML='Deaths: '+deaths
	ctx.fillStyle = "#989898"
	ctx.fillRect(0, 0, c.width, c.height)
    var i=0
    while (blocks.length>i) {
    	let color= null
        if (blocks[i]['type']===0) {
        	if (blocks[i]['x']%2===0 && blocks[i]['y']%2===0) {color='white'}
        	if (blocks[i]['x']%2===0 && blocks[i]['y']%2===1) {color='lightgrey'}
        	if (blocks[i]['x']%2===1 && blocks[i]['y']%2===0) {color='lightgrey'}
        	if (blocks[i]['x']%2===1 && blocks[i]['y']%2===1) {color='white'}
        }
    	if (blocks[i]['type']===1) {color='black'}
        if (blocks[i]['type']===2) {color='lightgreen'}
        if (blocks[i]['type']===3) {color='green'}
        ctx.fillStyle = color+""
		if (!(blocks[i]['type']===4)) {ctx.fillRect(blocks[i]['x']*size, blocks[i]['y']*size, size, size)}
        
        i++
	}
    ctx.fillStyle = "red"
	ctx.fillRect(player['x'], player['y'], size*0.6, size*0.6)
    ctx.strokeStyle="black"
	ctx.strokeRect(player['x'], player['y'], size*0.6, size*0.6)
    var i=0
    while (enemies.length>i) {
        ctx.beginPath()
		ctx.arc(enemies[i]['x']*size+size/2,enemies[i]['y']*size+size/2,(size*0.6)/2,0,4*Math.PI)
		ctx.fillStyle = 'blue'
        ctx.strokeStyle = 'black'
		ctx.fill()
        ctx.stroke()
		ctx.closePath()
        i++
	}
     i=0
    while (coins.length>i) {
        if (coins[i]['collected']===0) {
        	ctx.beginPath()
			ctx.arc(coins[i]['x']*size+size/2,coins[i]['y']*size+size/2,(size*0.5)/2,0,2*Math.PI)
			ctx.fillStyle = 'yellow'
	        ctx.strokeStyle = 'black'
			ctx.fill()
        	ctx.stroke()
			ctx.closePath()
        }
        i++
	}
}

function addBlock(type,x,y) {
	blocks.push({'type':type,'x':x,'y':y})

    
}
const findSpawn = (blocks) => {
let arr = []
for (let i = 0; i < blocks.length; i++){
if (blocks[i]['type'] === 2){
    arr.push([blocks[i]['x'],blocks[i]['y']])
    }
}
let x = (arr[arr.length-1][0] + arr[0][0]) / 2
let y = (arr[arr.length-1][1] + arr[0][1]) / 2
spawn=[x,y]
}

const addBlocks = (type,x1,y1,x2,y2) => {
	let i=x1*1
    while (x2+1>i) {
    	let j=y1*1
        while (y2+1>j) {
        	addBlock(type,i,j)
            j++
        }
    	i++
    }
}

let blocks=[]




let moveright=0
let moveleft=0
let moveup=0
let movedown=0
let speed=1
let player = null
document.addEventListener("keydown", move, false);
document.addEventListener("keyup", noMove, false);

function addenemy(x,y,xv,yv,minx=0,maxx=100,miny=0,maxy=100) {
	enemies.push({'x':x,'y':y,'xv':xv/size,'yv':yv/size,'minx':minx,'maxx':maxx,'miny':miny,'maxy':maxy})
}

let enemies = []


function addCoin(x,y) {
	coins.push({'x':x,'y':y,'collected':0})
}

let coins = []



function tick() {
    draw()
    movePlayer()
    moveEnemies()
    startTimer()
}
const interval = ()=>{
    if (!nTervId){
    nIntervId = setInterval(tick,10)
    }
}
const stopInterval = () => {
    clearInterval(nIntervId);
    nIntervId = null;
}
const startGame = ()=>{
    c.setAttribute("class","redisplay")
    textSec.setAttribute('id','dissapear')
    start.setAttribute('id','dissapear')
    axios.get('/game')
        .then(res => {
            res.data.forEach(a => {
                if(a.bigblock_id){
                    addBlocks(a.bigblock_type,a.x1,a.y1,a.x2,a.y2)
                } else if( a.enemy_id){
                    addenemy(a.enemy_x,a.enemy_y,a.enemy_xv,a.enemy_yv)
                } else if (a.coin_id){
                    addCoin(a.coin_x,a.coin_y)
                } else if(a.block_id){
                    addBlock(a.block_type,a.block_x,a.block_y)
                } else if (a.gamedata_id){
                    speed = a.speed
                }
            })
            findSpawn(blocks)
            interval()
            
            player = {'x':spawn[0]*size,'y':spawn[1]*size}
        })
        

}
getData()
start.addEventListener("click",startGame)