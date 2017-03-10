function spamClusterization(requests, IDs, threshold) {
    if(requests.length !== IDs.length){
        return [];
    }
    var normalize = function( _r ){
	       	for(var i = 0, l = _r.length; i < l; i++){
	           _r[i] = _r[i]
	               .toLowerCase()
	               .replace(/[^a-z\s]/g, "")
	               .split(/\s+/)
	               .filter(function(value,index,self){
	                   return self.indexOf(value) === index; 
	               });
	        }
	        return _r;
	    },
	    intersection = function( a, b ){
	        return a.filter(function(value,index,self){ 
	            return b.indexOf(value) >= 0; 
	        });
	    },
	    union = function( a, b ){
	        return a.concat(b).filter(function(value,index,self){ 
	            return self.indexOf(value) === index; 
	        });
	    },
	    jaccard = function( a, b ){
	        if(typeof a === "undefined" || typeof b === "undefined"){
	            return 0;
	        }
	        var _intersection = intersection(a,b).length, _union = union(a,b).length;
	        return _union === 0 ? 0 : _intersection / _union;
	    },
	    indexOfIntersection = function( neddle, stack ){
	        for(var i = 0, l = stack.length; i < l; i++){
	            if(intersection(stack[i],neddle).length){
	                return i;
	            }
	        }
	        return -1;
	    };
    var sets = [], aux;
    for(var i = 0, r = normalize(requests), l = r.length; i < l; i++){
        aux = [];
        for(var j = i+1; j < l; j++){
            if(jaccard(r[i],r[j]) >= threshold){
                aux.push(IDs[j]);
            }
        }
        if(aux.length){
            aux.push(IDs[i]);
            var index = indexOfIntersection(aux, sets);
            if(index >= 0){
                aux = union(sets[index],aux);
            } else {
                index = sets.length;
            }
            sets[index] = aux.sort( function(a,b){ return a - b; } );
        }
    }
    return sets.sort( function(a,b){ return a[0] - b[0]; } );
}