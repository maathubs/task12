import config from './config';

export const ladders = [
	{ id: 'ladder_1',  from: 2,   to: 38 },
	{ id: 'ladder_2',  from: 4,   to: 24 },
	{ id: 'ladder_3',  from: 7,   to: 56 },
	{ id: 'ladder_4',  from: 8,   to: 13 },
	{ id: 'ladder_5',  from: 10,  to: 30 },
	{ id: 'ladder_6',  from: 28,  to: 48 },
	{ id: 'ladder_7',  from: 47,  to: 88 },
	{ id: 'ladder_8',  from: 57,  to: 81 },
	// { id: 'ladder_9',  from: 65,  to: 77 },
	{ id: 'ladder_10',  from: 71,  to: 91 },
	// { id: 'ladder_11',  from: 70,  to: 86 },
	{ id: 'ladder_12',  from: 94,  to: 97 },
	// { id: 'ladder_13',  from: 22,  to: 28 },
];

export const snakes = [
	{ id: 'sn_1',  from: 26,   to: 8 },
	{ id: 'sn_2',  from: 54,   to: 29 },
	{ id: 'sn_3',  from: 93,   to: 75 },
	{ id: 'sn_4',  from: 99,   to: 64 },
	{ id: 'sn_5',  from: 40,   to: 19 },
	{ id: 'sn_6',  from: 76,   to: 55 },
];
let gameboard;
let calculated_snake_styles = [];
let calculated_player_positions = [];
export function generateLadderStyle( data ) {
	// 
	// console.log('@generateLadderStyle : data.index : ', data.index)
	let from_tile = document.getElementById(`tile_${data.from}`).getBoundingClientRect();
	let to_tile = document.getElementById(`tile_${data.to}`).getBoundingClientRect();

	// console.log('from-tile: ', from_tile)
	// console.log('to_tile: ', to_tile)
	// console.log('square container: ', document.getElementsByClassName('squareContainer')[0])
	if( !gameboard ) {
		gameboard = document.getElementsByClassName('squareContainer')[0].getBoundingClientRect();
	}

	let to_tile_top = to_tile.top + window.scrollY;
	let from_tile_top = from_tile.top + window.scrollY;
	let gameboard_top = gameboard.top + window.scrollY;
	let ladder_position = 1;

	let left_tile = {};
	let right_tile = {};
	if( to_tile.left <= from_tile.left ) {
		left_tile = to_tile;
		right_tile = from_tile;
	} else {
		left_tile = from_tile;
		right_tile = to_tile;
	}

	if( to_tile.left < from_tile.left ) { ladder_position = -1; }

	let top = to_tile_top - gameboard_top;
	let height = from_tile_top - to_tile_top + ( config.tile.height - config.tile.margin );
	let left = left_tile.left - gameboard.left;
	let width = right_tile.left - left_tile.left - config.tile.margin + config.tile.width;

	let tile_css_styles = {
		top,
		left,
		height,
		width,
		ladder_position
	}

	tile_css_styles = getLadderTransformStyles( tile_css_styles );
	// calculated_ladder_styles[data.id] = tile_css_styles;  // store this ladders calculated styles
	// console.log('tile css style :', tile_css_styles)
	return tile_css_styles;
}


export function getLadderTransformStyles( div ) {
	// console.log('-------getLadderTransformStyles: arg', div)
	// console.log('-------getLadderTransformStyles: config', config)
	let tile_count = ( div.width + config.tile.margin ) / config.tile.width;
	let tile_row_count = ( div.height + config.tile.margin ) / config.tile.height;

	let rotate_deg = 0;
	if( tile_count <= 1 ) { rotate_deg = 0; }
	else if( tile_count <= 2 ) {
		let number = 7;
		if( div.ladder_position === 1 ) {
			if( tile_row_count <= 4 ) { number = 10; }
		} else {
			if( tile_row_count <= 4 ) { number = 20; }
		}
		rotate_deg = number * tile_count;
	}
	else if( tile_count < 4 ) { rotate_deg = 7 * tile_count; }

	else if( tile_count < 5 ) {
		let number = 8;
		if( tile_row_count >= 4 && div.ladder_position !==1 ) { number = 11; }
		rotate_deg = number * tile_count;
	}

	else if( tile_count < 7 ) {
		rotate_deg = 13 * tile_count;
		div.top = div.top - ( 12 * tile_count );
		div.height = div.height + ( 26 * tile_count );
	}

	else { rotate_deg = 7 * tile_count; }

	if( tile_row_count === 1 ) {
		rotate_deg = 90;
		div.top = div.top - ( (div.width-div.height) / 2 );
		div.height = div.height + ( ( tile_count - 1 ) * config.tile.height );
	}

	let transform = `rotate(${ rotate_deg * div.ladder_position }deg)`;

	let styles = {
		top: `${div.top}px`,
		left: `${div.left}px`,
		height: `${div.height}px`,
		width: `${div.width}px`,
	}
	if( transform ) { styles.transform = transform; }
	// console.log('style: ', styles)
	return styles;

}
export function generateSnakeStyle( data ) {
	// let existing = calculated_snake_styles[data.id];
	// console.log("calculated_snake_styles[data.id]::::::::::::::::::::::",calculated_snake_styles[data.id])
	// if( existing ) {
	// 	return {
	// 		top: existing.top,
	// 		left: existing.left,
	// 		height: existing.height,
	// 		width: existing.width,
	// 	};
	// }

	let from_tile = document.getElementById(`tile_${data.to}`).getBoundingClientRect();
	let to_tile = document.getElementById(`tile_${data.from}`).getBoundingClientRect();
	if( !gameboard ) {
		gameboard = document.getElementById('gameboard').getBoundingClientRect();
	}

	let to_tile_top = to_tile.top + window.scrollY;
	let from_tile_top = from_tile.top + window.scrollY;
	let gameboard_top = gameboard.top + window.scrollY;
	let snake_position = -1;

	let left_tile = {};
	let right_tile = {};
	if( to_tile.left <= from_tile.left ) {
		left_tile = to_tile;
		right_tile = from_tile;
	} else {
		left_tile = from_tile;
		right_tile = to_tile;
	}

	if( to_tile.left < from_tile.left ) { snake_position = 1; }

	let top = to_tile_top - gameboard_top;
	let height = from_tile_top - to_tile_top + ( config.tile.height - config.tile.margin );
	let left = left_tile.left - gameboard.left;
	let width = right_tile.left - left_tile.left - config.tile.margin + config.tile.width;
    
	let tile_css_styles = {
		top: `${top}px`,
		left: `${left}px`,
		height: `${height}px`,
		width: `${width}px`,
	}

	if( snake_position === -1 ) {
		let tile_count = ( width + config.tile.margin ) / config.tile.width;
		tile_css_styles.transform = `rotate(${ tile_count * 30  }deg)`;
	}


	calculated_snake_styles[data.id] = tile_css_styles; // store this snake's calculated styles



	return tile_css_styles;

}

export function getPlayerPositionCSSStyles( data ) {
	if( data.index > 100 ) { data.index = 100; }

	if( ! document.getElementById(`tile_${data.index}`) ) {
		let calculated = calculated_player_positions[data.id];
		return { top: calculated.top, left: calculated.left };
	}

	let tile = document.getElementById(`tile_${data.index}`).getBoundingClientRect();
	let gameboard = document.getElementById('gameboard').getBoundingClientRect();

	let top = tile.top + window.scrollY;
	let left = tile.left;

	top = top - ( gameboard.top + window.scrollY );
	left = left - gameboard.left;

	let padding_left = config.player.width * data.array_index;
	padding_left = padding_left + 8;
	left = left + padding_left + ( data.array_index * 2 );


	let padding_top = ( config.tile.width - config.player.width ) / 2;
	top = top + padding_top;

	let output = {
		top: `${top}px`,
		left: `${left}px`,
	};

	calculated_player_positions[data.id] = output;
	return output;

}


