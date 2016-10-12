import Vector from './vector.js';

const directions = {
	n: new Vector(0, -1),
	ne: new Vector(1, -1),
	e: new Vector(1, 0),
	se: new Vector(1, 1),
	s: new Vector(0, 1),
	sw: new Vector(-1, 1),
	w: new Vector(-1, 0),
	nw: new Vector(-1, -1),
};

const plan = ['############################',
            '#      #    #      o      ##',
            '#                          #',
            '#          #####           #',
            '##         #   #    ##     #',
            '###           ##     #     #',
            '#           ###      #     #',
            '#   ####                   #',
            '#   ##       o             #',
            '# o  #         o       ### #',
            '#    #                     #',
            '############################'];

export default { directions, plan };
export { directions, plan };
