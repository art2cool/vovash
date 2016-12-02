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
        it('should have method concat', () => {
            expect( _.concat ).to.exist;
            expect( _.concat ).to.be.a('function');
        });
        it('should have method compact', () => {
            expect( _.compact ).to.exist;
            expect( _.compact ).to.be.a('function');
        });
        it('should have method chunk', () => {
            expect( _.chunk ).to.exist;
            expect( _.chunk ).to.be.a('function');
        })

    });

    describe('concat method', () => {
        let spy;
        beforeEach( () => {
            spy = chai.spy( _.concat );
        });
        it('should be called', () => {
            spy();
            spy.should.have.been.called();
        });
        it('should trow an Error if it called without two or more arguments', () => {
           expect( spy() ).to.be.an('error');
           expect( spy(1) ).to.be.an('error');
           expect( spy(1,2) ).to.be.not.an('error');
        });
   
        it('should return an array with two numbers of data', () => {
            expect( spy(1,2) ).to.be.an('array');
            expect( spy(1,2) ).to.eql([1,2]);
            expect( spy(1,2)[0] ).to.be.a('number');
            expect( spy(1,2)[1] ).to.be.a('number');                                    
            expect( spy(1,2) ).to.have.length(2);               
        });
         it('should return an array with two strings', () => {
            expect( spy('string1', 'string2') ).to.be.an('array');
            expect( spy('string1', 'string2') ).to.eql(['string1', 'string2']);
            expect( spy('string1','string2')[0] ).to.be.a('string');
            expect( spy('string1','string2')[1] ).to.be.a('string');
            expect( spy('string1','string2') ).to.have.length(2);               
        });
         it('should return an array with two booleans', () => {
            expect( spy(true, false) ).to.be.an('array');
            expect( spy(true, false) ).to.eql([true, false]);
            expect( spy(true, false)[0] ).to.be.a('boolean');
            expect( spy(true, false)[1] ).to.be.a('boolean');
            expect( spy(true, false) ).to.have.length(2);               
        });
         it('should return an array with two objects', () => {
            expect( spy({}, {}) ).to.be.an('array');
            expect( spy({}, {}) ).to.deep.equal([{}, {}]);
            expect( spy({}, {})[0] ).to.be.an('object');
            expect( spy({}, {})[1] ).to.be.an('object');
            expect( spy({}, {}) ).to.have.length(2);               
        });
        it('should return concated array', () => {
            expect( spy([1,2], [1,2]) ).to.be.an('array');
            expect( spy([1,2], [1,2]) ).to.deep.equal([1,2,1,2]);
            expect( spy([1,2], [1,2]) ).to.have.length(4);               
        });
        it('should return an array with array and simple types', () => {
            expect( spy([], 5) ).to.be.an('array');
            expect( spy([], 5) ).to.deep.equal([5]);
            expect( spy([1,2], 5) ).to.deep.equal([1,2,5]);
            expect( spy(0, [1,2], 5) ).to.deep.equal([0,1,2,5]);
            expect( spy([1,[2]], 5) ).to.deep.equal([1,[2],5]);
        });
        it('should return array without argument udefinded or null', () => {
            expect( spy(undefined, null) ).to.be.an('array');
            expect( spy(undefined, null) ).to.deep.equal([]);       
            expect( spy([1,2], null) ).to.be.an('array');
            expect( spy([1,2], null) ).to.deep.equal([1,2]);
            expect( spy(undefined, [1,2]) ).to.be.an('array');
            expect( spy(undefined, [1,2]) ).to.deep.equal([1,2]);
        });
    });
    
    describe('compact method', () => {
        let spy;
        beforeEach( () => {
            spy = chai.spy( _.compact );
        });
        it('should be called', () => {
            spy();
            spy.should.have.been.called();
        });
        it('should return Error if argument not array ', () => {
            expect( spy() ).to.be.an('error');
            expect( spy(1) ).to.be.an('error');
            expect( spy(false) ).to.be.an('error');
            expect( spy('string') ).to.be.an('error');
            expect( spy({}) ).to.be.an('error');
            expect( spy(null) ).to.be.an('error');
            expect( spy([]) ).to.be.not.an('error');            
        });
        it('should return array', () => {
            expect( spy([1,2]) ).to.be.an('array');
        });
        it('should remove all null from array', () => {
            expect( spy([{},[],1,2,null, 4, null]) ).to.deep.equal([{},[],1,2,4])
        });
        it('should remove all undefined from array', () => {
            expect( spy([{},[],1,2, undefined, 4, undefined]) ).to.deep.equal([{},[],1,2,4])
        });
        it('should remove all 0 number from array', () => {
            expect( spy([{},[],1,2, 0, 4, '0']) ).to.deep.equal([{},[],1,2,4,'0'])
        });
         it('should remove all empty strings from array', () => {
            expect( spy([{},[],1,2, "", 4,""]) ).to.deep.equal([{},[],1,2,4]);
            expect( spy([{},[],1,2, " ", 4,"  "]) ).to.deep.equal([{},[],1,2,4])
            expect( spy([{},[],1,'2', " 3 ", 4, " "]) ).to.deep.equal([{},[],1,'2',' 3 ', 4]);
        });
        it('should remove all false from array', () => {
            expect( spy([{},[],1,2, false, 4,'false']) ).to.deep.equal([{},[],1,2,4,'false'])
        });
        it('should remove all NaN numbers from array', () => {
            expect( spy([{},[],1,2, NaN, 4,'NaN']) ).to.deep.equal([{},[],1,2,4,'NaN'])
        });
        it('should remove false, null, 0, "", " ", undefined, and NaN', () => {
            expect( spy([{},[],1,'2', NaN, 4,undefined, null, 0, false]) ).to.deep.equal([{},[],1,'2',4])
        })
    });

    describe('chunk method', () => {
        let spy;
        beforeEach( () => {
            spy = chai.spy( _.chunk );
        });

        it('should be called', () => {
            spy();
            spy.should.have.been.called();
        });
        it('shuuld return an error if first argument not array', () => {
            expect( spy() ).to.be.an('error');
            expect( spy({}) ).to.be.an('error');
            expect( spy(2) ).to.be.an('error');
            expect( spy(true) ).to.be.an('error');
            expect( spy('string') ).to.be.an('error');
            expect( spy(null) ).to.be.an('error');
            expect( spy([],1) ).to.be.not.an('error');          
        });
        it('should return an error if second argument not a Number or equal 0', () => {
            expect( spy([]) ).to.be.an('error');
            expect( spy([],{}) ).to.be.an('error');
            expect( spy([],[]) ).to.be.an('error');
            expect( spy([],true) ).to.be.an('error');
            expect( spy([],'string') ).to.be.an('error');
            expect( spy([],null) ).to.be.an('error');
            expect( spy([],NaN) ).to.be.an('error');
            expect( spy([],0) ).to.be.an('error');  
            expect( spy([],1) ).to.be.not.an('error');  
            
        });
        it('should chunk array', () => {
            expect( spy([1,2,3], 1) ).to.deep.equal([[1],[2],[3]]);
            expect( spy([1,2,3], 2) ).to.deep.equal([[1,2],[3]]);
            expect( spy([1,2,3,4], 2) ).to.deep.equal([[1,2],[3,4]]);
            expect( spy([1,2,3,4,5], 2) ).to.deep.equal([[1,2],[3,4],[5]]);            
            expect( spy([1,2,3], 4) ).to.deep.equal([[1,2,3]]);
            expect( spy(['1','2','3'], 2) ).to.deep.equal([['1','2'],['3']]);            
        });

    });
});
