class vovash {
    
    fill(array, data, start, end) {

        if(!array || !(typeof(array)  === 'object' && array instanceof Array)) {
            throw new Error('First argument should be an array');
        } else {
            let i = start || 0;
            let len = end || array.length - 1;
            if(data !== undefined) {
                for(i; i<=len; i++ ){
                    array[i] = data;
                }
                return array;
            } else {
                return array;
            }
        }  
    }

    dropRight(array, count) {
        let reversedArray = array.reverse();
        return this.drop(array,count).reverse();
    }

    drop(array, count){
        let newArray = [];
        if(!array || !(typeof(array)  === 'object' && array instanceof Array)) {
            throw new Error('First argument should be an array')
        } else {
            if(count === null || (count !== undefined && typeof(count) !== 'number') || (typeof(count) === 'number' && isNaN(count))){
                throw new Error('Second argument should be a Number');
            } else {
                array.splice(0, count);                
                return array;
            }
        }
    }

    difference(array, ...argum) {
        let newArray = array;
         if(!array || !(typeof(array)  === 'object' && array instanceof Array)) {
            throw new Error('First argument should be an array')
        } else {
            argum.forEach( arg => {
                if (typeof(arg) === 'undefined' || arg === null || typeof(arg) === 'string' || typeof(arg) === 'number' || typeof(arg) === 'boolean') {
                    newArray = newArray.filter( arr => {
                        if(typeof(arg) === 'number' && typeof(arr) === 'number' && isNaN(arr) && isNaN(arg)){
                                return false;
                        } else {
                            return arr !== arg; 
                        }
                    })
                } else if(typeof(arg)  === 'object' && arg instanceof Array) {
                    newArray = newArray.filter( arr => {
                        if(typeof(arr) === 'number' && isNaN(arr)){
                            for(let i = 0, len = arg.length; i < len; i++){
                                if(isNaN(arg[i])){
                                    return false;
                                }
                            }
                        } else {
                            return !(arg.indexOf(arr) + 1);
                        }
                    })
                } else {
                    console.log('--------------unsuported argument-------------------')
                    console.log(arg)
                }

            })
            
            return newArray;
        }
    }

    chunk(array, size) {
        let newArray = [];
        if(!array || !(typeof(array)  === 'object' && array instanceof Array)) {
            throw new Error('First argument should be an array')
        } else {
            if(!size || isNaN(size) || !(typeof(size) === 'number')) {
                throw new Error('Second argument should be a Number');
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
            throw new Error('argument should be array')
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
                       throw new Error('unknown problems')
                    }
                } else {
                    return;
                }
            });
         
        } else {
            throw new Error('Method concat should containe arrays arguments')
        }
        return concatinatedArray;    
    }
}

module.exports = new vovash();
