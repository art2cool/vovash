const chai = require('chai');
const spies = require('chai-spies');

chai.use(spies);
const should = chai.should();
const expect = chai.expect;

const _ = require('../vovash');
const mock = require('./mock');

describe('Vovash test', () => {

    describe('Initialize Vovash', () => {
        it('vovash should be an Object', () => {
            expect( _ ).to.be.an('object')
        });
        it.skip('should have method _isSimpleType', () => {
            expect( _._isSimpleType ).to.exist;
            expect( _._isSimpleType ).to.be.a('function');
        });

    });
    describe.skip('_isSimpleType method', () => {
       let spy;
        beforeEach( () => {
            spy = chai.spy( _._isSimpleType );
        });
        it('should be called', () => {
            spy();
            spy.should.have.been.called();
        });

        it('should return true for numbers, string or boolean', () => {
            expect( spy(1) ).to.be.true;
            expect( spy('string') ).to.be.true;
            expect( spy(false) ).to.be.true;            
            expect( spy(true) ).to.be.true;             
        });
        it('should return false if argument object, array, null, undefined or NaN', () => {
            expect( spy() ).to.be.false;
            expect( spy([]) ).to.be.false;
            expect( spy(NaN) ).to.be.false;            
            expect( spy(null) ).to.be.false;
            expect( spy({}) ).to.be.false;         
        });
    })

    describe('concat method', () => {
        it('should have method concat', () => {
            expect( _.concat ).to.exist;
            expect( _.concat ).to.be.a('function');
        });
         it('should trow an Error if it called without two or more arguments', () => {
           expect( () => _.concat() ).to.throw(Error);
           expect( () => _.concat(1) ).to.throw(Error);
           expect( () => _.concat(1,2) ).to.not.throw(Error);
        });
         it('should return an array with numbers of data', () => {
            expect( _.concat(1,2) ).to.eql([1,2]);                                                
            expect( _.concat(1,2,3,4,5,6,7,8,9) ).to.eql([1,2,3,4,5,6,7,8,9]);                                                
         });
         it('should return an array with strings', () => {
            expect(  _.concat('a', 'b') ).to.eql(['a', 'b']); 
            expect(  _.concat('a', 'b','c','d', 'e','f','g') ).to.eql(['a', 'b','c','d', 'e','f','g']);           
        });
         it('should return an array with two booleans', () => {
            expect(  _.concat(true, false) ).to.eql([true, false]);
            expect(  _.concat(true, false, true, false, true, false) ).to.eql([true, false, true, false, true, false]);
        });
        it('should return an array with objects', () => {
            expect(  _.concat({}, {}) ).to.deep.equal([{}, {}]);             
            expect(  _.concat({},{a: 1}, {b: 2}, {c: 2}, {d: 2}) ).to.deep.equal([{},{a: 1}, {b: 2}, {c: 2}, {d: 2}]);             
        });
        it('should return concated array', () => {
            expect(  _.concat([1,2], [1,2]) ).to.deep.equal([1,2,1,2]);
            expect(  _.concat([1,2], [1,2], [1,2], [1,2]) ).to.deep.equal([1,2,1,2,1,2,1,2]);            
        });
        it('should return an array with array and simple types', () => {
            expect( _.concat([], 5) ).to.deep.equal([5]);
            expect( _.concat([1,2], 5) ).to.deep.equal([1,2,5]);
            expect( _.concat(0, [1,2], 5) ).to.deep.equal([0,1,2,5]);
            expect( _.concat([1,[2]], 5) ).to.deep.equal([1,[2],5]);
        });
        it('should return array without argument udefinded or null', () => {
            expect( _.concat(undefined, null) ).to.deep.equal([]);       
            expect( _.concat([1,2], null) ).to.be.an('array');
            expect( _.concat([1,2], null) ).to.deep.equal([1,2]);
            expect( _.concat(undefined, [1,2]) ).to.be.an('array');
            expect( _.concat(undefined, [1,2]) ).to.deep.equal([1,2]);
        });
    });
    
    describe('compact method', () => {
        it('should have method compact', () => {
            expect( _.compact ).to.exist;
            expect( _.compact ).to.be.a('function');
        });
        it('should return Error if argument not array ', () => {
            expect( () => _.compact() ).to.throw(Error);
            expect( () => _.compact(1) ).to.throw(Error);
            expect( () => _.compact(false) ).to.throw(Error);
            expect( () => _.compact('string') ).to.throw(Error);
            expect( () => _.compact({}) ).to.throw(Error);
            expect( () => _.compact('null') ).to.throw(Error);
            expect( () => _.compact([]) ).to.not.throw(Error);
        });
        it('should return array', () => {
            expect( _.compact([1,2]) ).to.be.an('array');
        });
        it('should remove all null from array', () => {
            expect( _.compact([{},[],1,2,null, 4, null]) ).to.deep.equal([{},[],1,2,4])
        });
        it('should remove all undefined from array', () => {
            expect( _.compact([{},[],1,2, undefined, 4, undefined]) ).to.deep.equal([{},[],1,2,4])
        });
        it('should remove all 0 number from array', () => {
            expect( _.compact([{},[],1,2, 0, 4, '0']) ).to.deep.equal([{},[],1,2,4,'0'])
        });
         it('should remove all empty strings from array', () => {
            expect( _.compact([{},[],1,2, "", 4,""]) ).to.deep.equal([{},[],1,2,4]);
            expect( _.compact([{},[],1,2, " ", 4,"  "]) ).to.deep.equal([{},[],1,2,4])
            expect( _.compact([{},[],1,'2', " 3 ", 4, " "]) ).to.deep.equal([{},[],1,'2',' 3 ', 4]);
        });
        it('should remove all false from array', () => {
            expect( _.compact([{},[],1,2, false, 4,'false']) ).to.deep.equal([{},[],1,2,4,'false'])
        });
        it('should remove all NaN numbers from array', () => {
            expect( _.compact([{},[],1,2, NaN, 4,'NaN']) ).to.deep.equal([{},[],1,2,4,'NaN'])
        });
        it('should remove false, null, 0, "", " ", undefined, and NaN', () => {
            expect( _.compact([{},[],1,'2', NaN, 4,undefined, null, 0, false]) ).to.deep.equal([{},[],1,'2',4])
        })
    });

    describe('chunk method', () => {
         it('should have method difference', () => {
            expect( _.chunk ).to.exist;
            expect( _.chunk ).to.be.a('function');
        });
        it('shuuld return an error if first argument not array', () => {
            expect( () => _.chunk() ).to.throw(Error);
            expect( () => _.chunk(1) ).to.throw(Error);
            expect( () => _.chunk(false) ).to.throw(Error);
            expect( () => _.chunk('string') ).to.throw(Error);
            expect( () => _.chunk({}) ).to.throw(Error);
            expect( () => _.chunk('null') ).to.throw(Error);
            expect( () => _.chunk([], 1)).to.not.throw(Error);        
        });
        it('should return an error if second argument not a Number or equal 0', () => {
            expect( () => _.chunk([]) ).to.throw(Error);
            expect( () => _.chunk([],{}) ).to.throw(Error);
            expect( () => _.chunk([],[]) ).to.throw(Error);
            expect( () => _.chunk([],true) ).to.throw(Error);
            expect( () => _.chunk([],'string') ).to.throw(Error);
            expect( () => _.chunk([],null) ).to.throw(Error);
            expect( () => _.chunk([],NaN) ).to.throw(Error);
            expect( () => _.chunk([],0) ).to.throw(Error);  
            expect( () => _.chunk([],1) ).to.not.throw(Error);  
            
        });
        it('should chunk array', () => {
            expect( _.chunk([1,2,3], 1) ).to.deep.equal([[1],[2],[3]]);
            expect( _.chunk([1,2,3], 2) ).to.deep.equal([[1,2],[3]]);
            expect( _.chunk([1,2,3,4], 2) ).to.deep.equal([[1,2],[3,4]]);
            expect( _.chunk([1,2,3,4,5], 2) ).to.deep.equal([[1,2],[3,4],[5]]);            
            expect( _.chunk([1,2,3,4,5,6,7,8,9,10], 2) ).to.deep.equal([[1,2],[3,4],[5,6],[7,8],[9,10]]);            
            expect( _.chunk([1,2,3], 4) ).to.deep.equal([[1,2,3]]);          
        });
    });
    describe('difference method', () => {
        it('should have method difference', () => {
            expect( _.difference ).to.exist;
            expect( _.difference ).to.be.a('function');
        });
        it('should return an Error if first argument not array', () => {
            expect( () => _.difference() ).to.throw(Error);
            expect( () => _.difference(1) ).to.throw(Error);
            expect( () => _.difference(false) ).to.throw(Error);
            expect( () => _.difference('string') ).to.throw(Error);
            expect( () => _.difference({}) ).to.throw(Error);
            expect( () => _.difference('null') ).to.throw(Error);
            expect( () => _.difference([], 1)).to.not.throw(Error); 
        });
        it('should return difference beetween array and numbers', () => {
            expect( _.difference([1,2,3], 1)).to.deep.equal([2,3]);
            expect( _.difference([1,2,3,4,6,7,8,9,],1,3,5,9)).to.deep.equal([2,4,6,7,8]);
        });
        it('should return difference beetween array and array with numbers', () => {
            expect( _.difference([1,2,3], [1]) ).to.deep.equal([2,3]);
            expect( _.difference([1,2,3,8,9], [1,3,4,5,6,7,9]) ).to.deep.equal([2,8]);
            expect( _.difference([1,2,3], [1], [2]) ).to.deep.equal([3]);
            expect( _.difference([1,2,3], [5]) ).to.deep.equal([1,2,3]);                         
        });
        it('should return difference beetween array and array with strings', () => {
            expect( _.difference(['a','b','c'], ['a']) ).to.deep.equal(['b','c']);
            expect( _.difference(['a','b','c','d','e'], ['a','c','x','y','z','e']) ).to.deep.equal(['b','d']);
            expect( _.difference(['a','b','c'], ['a'], ['b']) ).to.deep.equal(['c']);
            expect( _.difference(['a','b','c'], [5]) ).to.deep.equal(['a','b','c']);                         
        });
        it('should return difference beetween array and array with boolean', () => {
            expect( _.difference([0,2,true,false], [0]) ).to.deep.equal([2, true,false]);
            expect( _.difference([true,false,false], [false,true]) ).to.deep.equal([]);
            expect( _.difference([true,false,3], true, false) ).to.deep.equal([3]);
            expect( _.difference([false, false, true], []) ).to.deep.equal([false,false,true]);                         
        });
        it('should return difference beetween array and array with different types', () => {
            expect( _.difference([1,null, 0], null) ).to.deep.equal([1,0]);
            //TODO expect( _.difference([1,{}, 0], {}) ).to.deep.equal([1,0]);
            //TODO expect( _.difference([1,{}, 0], [{}]) ).to.deep.equal([1,0]);
            expect( _.difference([1,null, 0], [null]) ).to.deep.equal([1,0]);
            expect( _.difference([1,false, 0], false) ).to.deep.equal([1,0]);
            expect( _.difference([1,false, 0], [false]) ).to.deep.equal([1,0]);
            expect( _.difference([1,NaN, 0], [NaN]) ).to.deep.equal([1,0]);
            expect( _.difference(['a',NaN, 'b'], NaN) ).to.deep.equal(['a','b']);
            expect( _.difference([1,'a',undefined, 0], undefined) ).to.deep.equal([1,'a',0]);
            expect( _.difference([1,'a',undefined, 0], [undefined]) ).to.deep.equal([1,'a',0]);
            expect( _.difference([1,'a', null, NaN, false, 0,undefined], NaN,1,'a',null,false, 0,undefined) ).to.deep.equal([]);
            expect( _.difference([1,'a', null, NaN, false, 0,undefined], [NaN,1,'a',null,false, 0,undefined]) ).to.deep.equal([]);
        });
    });
    describe('drop method', () => {
        it('should have method drop', () => {
            expect( _.drop ).to.exist;
            expect( _.drop ).to.be.a('function');
        });
        it('should return an Error if first argument not array', () => {
            expect( () => _.drop() ).to.throw(Error);
            expect( () => _.drop({}) ).to.throw(Error);
            expect( () => _.drop(2) ).to.throw(Error);
            expect( () => _.drop(true) ).to.throw(Error);
            expect( () => _.drop('string') ).to.throw(Error);
            expect( () => _.drop(null) ).to.throw(Error);
            expect( () => _.drop([]) ).to.not.throw(Error);
        });
        it('should return an Error if second parameter is not a number', () => {
            expect( () => _.drop([],1) ).to.not.throw(Error);
            expect( () => _.drop([], null) ).to.throw(Error);
            expect( () => _.drop([], 'string') ).to.throw(Error);
            expect( () => _.drop([], false) ).to.throw(Error);
            expect( () => _.drop([], NaN) ).to.throw(Error);
        });
        it('should return same array if second argument undefined or 0',() => {
            expect( _.drop([1,2,3]) ).to.deep.equal([1,2,3]);
            expect( _.drop([1,2,3], 0) ).to.deep.equal([1,2,3]);
        });
        it('should return [] if second argument bigger or equal array\'s length', () => {
            expect( _.drop([1,2,3], 4) ).to.deep.equal([]);
            expect( _.drop([1,2,3], 3) ).to.deep.equal([]);
        });
        it('should return cutted array from the beggins',() => {
            expect( _.drop([1,2,3], 1) ).to.deep.equal([2,3]);
            expect( _.drop([1,2,3], 2) ).to.deep.equal([3]);
            expect( _.drop(['a','b','c'], 2) ).to.deep.equal(['c']);
            expect( _.drop([true,true,false], 2) ).to.deep.equal([false]);
            expect( _.drop([null,null,3], 2) ).to.deep.equal([3]);
            expect( _.drop([undefined,undefined,2,undefined], 2) ).to.deep.equal([2,undefined]);
        });
    });
    describe('dropRight method', () => {
        it('should be a function', () => {
            expect( _.dropRight ).to.exist;
            expect( _.dropRight ).to.be.a('function');

        });
        it('should return an Error if first argument not array', () => {
            expect( () => _.dropRight() ).to.throw(Error);
            expect( () => _.dropRight({}) ).to.throw(Error);
            expect( () => _.dropRight(2) ).to.throw(Error);
            expect( () => _.dropRight(true) ).to.throw(Error);
            expect( () => _.dropRight('string') ).to.throw(Error);
            expect( () => _.dropRight(null) ).to.throw(Error);
            expect( () => _.dropRight([]) ).to.not.throw(Error);
        });
        it('should return an Error if second parameter is not a number', () => {
            expect( () => _.dropRight([],1) ).to.not.throw(Error);
            expect( () => _.dropRight([], null) ).to.throw(Error);
            expect( () => _.dropRight([], 'string') ).to.throw(Error);
            expect( () => _.dropRight([], false) ).to.throw(Error);
            expect( () => _.dropRight([], NaN) ).to.throw(Error);
        });
        it('should return same array if second argument undefined or 0',() => {
            expect(  _.dropRight([1,2,3]) ).to.deep.equal([1,2,3]);
            expect(  _.dropRight([1,2,3], 0) ).to.deep.equal([1,2,3]);
        });
        it('should return [] if second argument bigger or equal array\'s length', () => {
            expect(  _.dropRight([1,2,3], 4) ).to.deep.equal([]);
            expect(  _.dropRight([1,2,3], 3) ).to.deep.equal([]);
        });
        it('should return cutted array from the end',() => {
            expect( _.dropRight([1,2,3], 1) ).to.deep.equal([1,2]);
            expect( _.dropRight([1,2,3], 2) ).to.deep.equal([1]);
            expect( _.dropRight(['a','b','c'], 2) ).to.deep.equal(['a']);
            expect( _.dropRight([true,false,false], 2) ).to.deep.equal([true]);
            expect( _.dropRight([3,null,null], 2) ).to.deep.equal([3]);
            expect( _.dropRight([undefined,1,undefined,undefined], 2) ).to.deep.equal([undefined,1]);
        });
    });
});
