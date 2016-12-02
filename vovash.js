class vovash {
    
    chunk(array, size) {
        let newArray = [];
        if(!array || !(typeof(array)  === 'object' && array instanceof Array)) {
            return new Error('First argument should be an array')
        } else {
            if(!size || isNaN(size) || !(typeof(size) === 'number')) {
                return new Error('Second argument should be a Number')
            } else {
                while (array.length >= size) {
                    newArray.push(array.splice(0,size))
                }
                if(array.length) {
                    newArray.push(array);
                }
                return newArray
            }
        }

    }

    compact(array) {
        let newArray = [];
        if(!array || !(typeof(array)  === 'object' && array instanceof Array)) {
            return new Error('argument should be array')
        } else {
            newArray = array.filter( arr => {
                return arr !== null &&
                arr !== 0 &&
                arr !== undefined &&
                !(typeof(arr) === 'number' && isNaN(arr)) &&                
                !(typeof(arr) === 'boolean' && arr === false) &&
                !(typeof(arr) === 'string' && arr.trim() === "");
            });
            return newArray;
        }
    }

    concat(...arrays) {
        let concatinatedArray = [];

        if(arrays && arrays.length >= 2) {
            arrays.forEach( arr => {
                if(arr !== undefined && arr !== null) {
                    if(typeof(arr)  === 'object' && arr instanceof Array) {
                        concatinatedArray.push(...arr);                    
                    } else if (typeof(arr) === 'string' || typeof(arr) === 'number' || typeof(arr) === 'boolean' || typeof(arr) === 'object') {                       
                        concatinatedArray.push(arr);
                    } else {
                       return new Error('unknown problems')
                    }
                } else {
                    return;
                }
            });
         
        } else {
            return new Error('Method concat should containe arrays arguments')
        }
        return concatinatedArray;    
    }
}


module.exports = new vovash();
