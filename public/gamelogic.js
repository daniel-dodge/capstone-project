
let c = document.getElementById("Canvas");
const start = document.querySelector("#start")
let ctx = c.getContext("2d");
let size=25
let deaths=0
let numcoins=0
let spawn = null
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
        	alert('nice')
            blocks = []
            enemies = []
            coins = []
            
            // location.reload() cover canvas with try again screen and put this on
            
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



let spawnpoints = [[0,0],[size*2,size*2],[size*2,size*4],[size*1.5,size*2.5],[0,0]]

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


function addcoin(x,y) {
	coins.push({'x':x,'y':y,'collected':0})
}

let coins = []



function tick() {
    draw()
    movePlayer()
    moveEnemies()
}

const startGame = ()=>{
    let x = 0
    addBlocks(1,0,0,4,0)
    addBlocks(1,0,1,0,9)
    addBlocks(1,1,9,8,9)
    addBlocks(1,4,1,4,7)
    addBlock(1,8,8)
    addBlocks(1,8,7,17,7)
    addBlock(1,5,7)
    addBlocks(1,6,2,6,7)
    addBlocks(1,7,2,15,2)
    addBlocks(1,17,2,17,6)
    addBlock(1,15,1)
    addBlocks(1,15,0,23,0)
    addBlocks(1,23,1,23,9)
    addBlocks(1,19,9,22,9)
    addBlocks(1,19,2,19,8)
    addBlock(1,18,2)
    addBlocks(2,1,1,3,8)
    addBlocks(3,20,1,22,8)
    addBlocks(0,4,8,7,8)
    addBlocks(0,7,3,7,7)
    addBlocks(0,7,3,15,6)
    addBlocks(0,16,1,16,6)
    addBlocks(0,17,1,19,1)
    findSpawn(blocks)
    addenemy(7,3,2,0)
    addenemy(16,4,-2,0)
    addenemy(7,5,2,0)
    addenemy(16,6,0,0)
    addcoin(9.5,3.5)
    
    player = {'x':spawn[0]*size,'y':spawn[1]*size}
    if (x === 0){
    setInterval(tick,10)
    x++
    console.log(x)
    }
}
start.addEventListener("click",startGame)