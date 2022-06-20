import App from "./classes/App.js";

const app = new App();

import {
    hyruleMap,
    powerDungeonMap,
    courageDungeonMap,
    wisdomDungeonMap,
  } from "./consts.js";

var dirX = [-1, 0, 1, 0];
var dirY = [0, -1, 0, 1];

var currentMap, currentTerrains, visited = [], lBoundX, lBoundY, uBoundX, uBoundY, queue, objX, objY, cost;

function h(linkX, linkY, objX, objY){
    return Math.abs(linkX - objX) + Math.abs(linkY - objY);
}
//currentMap = matrix map; currentTerrains = path description
function search(linkX, linkY, objtX, objtY, cMap, cTerrains, lBX, lBY, uBX, uBY){
    //setup
    currentMap = cMap;
    currentTerrains = cTerrains;
    lBoundX = lBX;
    lBoundY = lBY;
    uBoundX = uBX;
    uBoundY = uBY;
    queue = [{
        Cost: 0,
        X: linkX,
        Y: linkY,
        parentX: linkX,
        parentY: linkY
    }];
    objX = objtX;
    objY = objtY;
    cost = 0;
    var position;
    //search to objective
    while(1){
        position = queue.shift();
        if(position.X == objX && position.Y == objY)
            break;
        const key = currentMap[linkX][linkY];
        const newCost = currentTerrains.get(key).cost;
        for(let i = 0; 4 > i; i++){
            if(position.X + dirX[i] >= lBoundX && position.X + dirX[i] <= uBoundX && linkY + dirY[i] >= lBoundY && linkY + dirY[i] <= uBoundY && currentTerrains.get(currentMap[position.X + dirX][linkY + dirY]) != null){
                //ordered insert
                var flag = true;
                var next = {
                    Cost: newCost + cost + h(position.X, linkY, objX, objY),
                    X: position.X + dirX[i],
                    Y: linkY + dirY[i],
                    parentX: position.X,
                    parentY: linkY
                }
                for(var j in queue){
                    if(queue[j].Cost < next.Cost){
                        flag = false;
                        queue.splice(j, 0, next);
                    }
                }
                if(flag){
                    queue.splice(queue.length, 0, next);
                }
            }
        }
        //remove used element

        //check cheapest tile

    }
    
    //retrace route

}
function searchTo(linkX, linkY, cost){
    if(linkX == objX && linkY == objY)
        break;
    const key = currentMap[linkX][linkY];
    const newCost = currentTerrains.get(key).cost;
    for(let i = 0; 4 > i; i++){
        if(linkX + dirX[i] >= lBoundX && linkX + dirX[i] <= uBoundX && linkY + dirY[i] >= lBoundY && linkY + dirY[i] <= uBoundY && currentTerrains.get(currentMap[linkX + dirX][linkY + dirY]) != null){
            //visited[linkX + dirX[i]][linkY + dirY[i]] = 1;
            //ordered insert
            var flag = true;
            var next = {
                Cost: newCost + cost + h(linkX, linkY, objX, objY),
                X: linkX + dirX[i],
                Y: linkY + dirY[i]
            }
            for(var j in queue){
                if(queue[j].Cost < next.Cost){
                    flag = false;
                    queue.splice(j, 0, next);
                }
            }
            if(flag){
                queue.splice(queue.length, 0, next);
            }
        }
        //call next tile
    }

}