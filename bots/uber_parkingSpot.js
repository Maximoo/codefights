function parkingSpot(carDimensions, parkingLot, luckySpot) {
    var o = {size:carDimensions, spot:luckySpot, matrix:parkingLot},
    	matrix_rotate = function( matrix ){
            var new_matrix = [], row;
            for(y = matrix[0].length - 1; y >= 0; y--){
                row = [];
                for(x = 0; x <= matrix.length - 1; x++){
                    row.push(matrix[x][y]);
                }
                new_matrix.push(row);
            }
            return new_matrix;
        }, coords_rotate = function( coords, matrix ){
            var au, ly = matrix[0].length, x1 = coords[0], y1 = coords[1], x2 = coords[2], y2 = coords[3];
            au = ly - y1 - 1; y1 = x1; x1 = au;
            au = ly - y2 - 1; y2 = x2; x2 = au;
            if(x1 > x2){ au = x2; x2 = x1; x1 = au; }
            return [x1,y1,x2,y2];
        }, can_pass = function( spot, matrix ){
            for(var x = spot[0]; x <= spot[2]; x++){
                for(var y = 0; y <= spot[3]; y++){
                    if(matrix[x][y] != 0){
                        return false;
                    }
                }
            }
            return true; 
        }, can_fit = function( size, spot ){
            return size[1] <= spot[2] - spot[0] + 1 && size[0] <= spot[3] - spot[1] + 1;
        }, can_fit_n_pass = function( o, rotate ){
        	if(rotate){
				o.spot = coords_rotate(o.spot, o.matrix);
				o.matrix = matrix_rotate(o.matrix);
        	}
            return can_fit(o.size, o.spot) && can_pass(o.spot, o.matrix);
        };
    return can_fit_n_pass(o, false) || can_fit_n_pass(o, true) || can_fit_n_pass(o, true) || can_fit_n_pass(o, true);
}