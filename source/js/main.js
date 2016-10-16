// import { plan } from './world-constants';
import { LifeLikeWorld, Wall } from './world';
// import BouncingCritter from './critters/bouncing-criters';
import Plant from './critters/plant';
import { SmartEater } from './critters/plant-eater';

const world = new LifeLikeWorld(
	['####################################################',
   '#                 ####         ****              ###',
   '#   *  @  ##                 ########       OO    ##',
   '#   *    ##        O O                 ****       *#',
   '#       ##*                        ##########     *#',
   '#      ##***  *         ****                     **#',
   '#* **  #  *  ***      #########                  **#',
   '#* **  #      *               #   *              **#',
   '#     ##              #   O   #  ***          ######',
   '#*            @       #       #   *        O  #    #',
   '#*                    #  ######                 ** #',
   '###          ****          ***                  ** #',
   '#       O                        @         O       #',
   '#   *     ##  ##  ##  ##               ###      *  #',
   '#   **         #              *       #####  O     #',
   '##  **  O   O  #  #    ***  ***        ###      ** #',
   '###               #   *****                    ****#',
   '####################################################'],
	{
		'#': {
			constructor: Wall,
		},
		O: {
			constructor: SmartEater,
			props: {
				eat: '*',
			},
		},
		'@': {
			constructor: SmartEater,
			props: {
				eat: 'O',
			},
		},
		'*': {
			constructor: Plant,
		},
	}
);

const container = document.querySelector('.container');
const text = container.appendChild(document.createTextNode(world.toString()));
setInterval(() => {
	world.turn();
	text.textContent = world.toString();
}, 300);
