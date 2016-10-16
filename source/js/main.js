// import { plan } from './world-constants';
import { LifeLikeWorld, Wall } from './world';
// import BouncingCritter from './critters/bouncing-criters';
import Plant from './critters/plant';
import { SmartPlantEater } from './critters/plant-eater';

const world = new LifeLikeWorld(
	['############################',
   '#####                 ######',
   '##   ***                **##',
   '#   *##**         **  O  *##',
   '#    ***     O    ##**    *#',
   '#       O         ##***    #',
   '#                 ##**     #',
   '#   O       #*             #',
   '#*          #**       O    #',
   '#***        ##**    O    **#',
   '##****     ###***       *###',
   '############################'],
  { '#': Wall,
   O: SmartPlantEater,
   '*': Plant }
);

const container = document.querySelector('.container');
const text = container.appendChild(document.createTextNode(world.toString()));
setInterval(() => {
	world.turn();
	text.textContent = world.toString();
}, 300);
