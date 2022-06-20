//import App from "./classes/App.js";

//const app = new App();

/*
import {
    hyruleMap,
    powerDungeonMap,
    courageDungeonMap,
    wisdomDungeonMap,
  } from "./consts.js";

*/

const hyruleTerrains = new Map([
  ["g", { cost: 10, label: "Grama", color: "#92d050" }],
  ["s", { cost: 20, label: "Areia", color: "#c4bc96" }],
  ["f", { cost: 100, label: "Floresta", color: "#00b050" }],
  ["m", { cost: 150, label: "Montanha", color: "#948a54" }],
  ["w", { cost: 180, label: "Água", color: "#548dd4" }],
]);

const hyruleMap = [
  "fffffffffffffffmmmmmmmmmmmmmmmmmmmmmmmmmmm",
  "fggfgfgfgggggggmmmmmmmsssssmmmmmmssssmmmmm",
  "fggfgggfgfggggggmmmmmsssssssmmmmssssssmmmm",
  "fgffgfgfgfggfggggmssssssssssssssssssssssmm",
  "fggggfgfgfggfggggmsmmsssssssmmmmssssssmmmm",
  "fgffgfgfgfgfffgggmsmmmsssssmmmmwmssssmwmmm",
  "fgffgfgggfgggggggmsmmmmmmmmmmmmwmmmmmmwmmm",
  "fgffffgfffgggggggmsmmmmmmmmmmmmwmmmmmmwmgm",
  "fggfgggggfggwggggmsssssssssssmmwmmmmmmwmgm",
  "ffffgfffgggwwwgggmsmmmmmsmmmsmmwmmmmmmwmgm",
  "fggfggggggwwwwwggmmmfffmmmfffffwggmmggwggm",
  "fggfggfggggwwwggggggggggggggggwwwwwwwwwggm",
  "fggfggfgggggwgggggggggggggggggwggfgggggfgm",
  "fggfggfggggggggggfffgggffffgggwggggggfgfgm",
  "fgggggggggggggggggggggggggggggwgfgfgffgfgm",
  "fgfffffgfffgggggggggggggggggggwggggggggggm",
  "fggggggggggggggggwwwwwwwwwwgggggmmmmmmmmmm",
  "fggggggggwggfgfggwggggggggwgggwgmssssssssm",
  "fgfggfgggwgggggggwgfggggfgwwwwwgmsmssmsssm",
  "fgfggfgggwggfgfgggggggggggwgggggmsmmmmmmmm",
  "fgfggfgggwgggggggwggggggggwgggmgmssssssssm",
  "fgfggfgggwgffffggwgfggggfgggggmgmsmmmmsmmm",
  "fggggggggwgggggggwggggggggwgmgmgmssssssssm",
  "fggggggggggffffggwwwwggwwwwgmgmgmmmssmmmmm",
  "fffffffggfffffffffggggggggwgmgmggggggggggm",
  "ffffffggfffffgfffffgfffgggwgmggggggggggggm",
  "fgfgfgggffffgggffffgfffgggwgmgggmmmmmmmmmm",
  "mgggfgggfffgggggfffgggggggwggggggggmgggggm",
  "mgggfgggffffgggffffgfgggggwggggggggmgggggm",
  "mggggggggffffgffffggfgggggwwwgwwwwgmgmmmmm",
  "mggggggggggggggggggggggggggggggggwgggggggm",
  "mmmmmmmmmggggmmmmmmmggmmmmgggggggwmmmmmmgm",
  "msssssssmggggmgggggggggggmgggggggwmmmmmmmm",
  "msmmssssmggggmggggggggfggmggwwwwwwwwmmwwmm",
  "msmmssssmggggmgfggwwggfggmggwwmwwwwwmmwwmm",
  "msssssssmggmgmggggwwggfggmggwwwwmmwwmmwwmm",
  "msssssssmggmgggggggggggggmggwwwwmmwwmmwwmm",
  "mssssssmmmmmggfgggggfffggmggwwwwwwwwmmwwmm",
  "mssssssssmmmggfgwwwggfgggmggwwwwwwwwmmwwmm",
  "mssssssssmmmggfggggggfgggmggwwwwwwwwwwwwmm",
  "msssssssssgggggggggggggggmmmwwwwwwwwwwwwmm",
  "mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm",
];

var dirX = [-1, 0, 1, 0];
var dirY = [0, -1, 0, 1];

var parent = [], queue, cost, key, newCost;

function h(linkX, linkY, objX, objY){
    return Math.abs(linkX - objX) + Math.abs(linkY - objY);
}

//currentMap = matrix map; currentTerrains = path description
function search(linkX, linkY, objtX, objtY, cMap, cTerrains, uBoundX, uBoundY){
    //setup
    currentMap = cMap;
    currentTerrains = cTerrains;
    /*
    lBoundX = lBX;
    lBoundY = lBY;
    uBoundX = uBX;
    uBoundY = uBY;
    objX = objtX;
    objY = objtY;
    */
    for(var i=0; i<(uBoundX); i++) {
        parent[i] = new Array(uBoundY);
    }
    queue = [{
        Cost: 0,
        X: linkX,
        Y: linkY
    }];
    cost = 0;
    var position;
    //search to objective
    while(1){
        position = queue.shift();//first element of priority queue
        if(position.X == objtX && position.Y == objtY)
            break;
        key = currentMap[position.X][position.Y];
        newCost = currentTerrains.get(key).cost;
        for(let i = 0; 4 > i; i++){
            var auxX = position.X + dirX;
            var auxY = position.Y + dirY;
            key = currentMap[auxX][auxY];
            if(position.X + dirX[i] >= 0 && position.X + dirX[i] <= uBoundX && position.Y + dirY[i] >= 0 && position.Y + dirY[i] <= uBoundY && currentTerrains.get(key).cost != null){
                //ordered insert
                var flag = true;
                var next = {
                    Cost: newCost + cost + h(position.X, position.Y, objX, objY),
                    X: position.X + dirX[i],
                    Y: position.Y + dirY[i],
                }
                parent[next.X][next.Y] = position;
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
            //else ignore
        }
    }
    //retrace route
    while(1){
        if(parent[position.X][position.Y].X == linkX && parent[position.X][position.Y].Y == linkY){
            console.log("Fim");
            break;
        }
        console.log(position.X, position.Y);
        position = parent[position.X][position.Y];
    }
}

search(24, 27, 39, 17, hyruleMap, hyruleTerrains, 42, 42);
