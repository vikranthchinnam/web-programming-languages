"use strict";
function MakeMultiFilterHelper(originalArray){
    function arrayFiltererWrapper(filterCriteria, callback){
        const oldArray = this.array;
        if(typeof(filterCriteria) === 'function'){
            this.array = this.array.filter((elem) => filterCriteria(elem));
        }
        if(typeof(callback) === 'function'){
            const boundedCallback = callback.bind(oldArray, this.array);
            boundedCallback();
        }
        if(typeof(filterCriteria) === 'function'){
            return this.arrayFilterer;
        }
        else{
            return this.array;
        }
    }
    this.array = originalArray;
    this.arrayFilterer = arrayFiltererWrapper.bind(this);
    return this.arrayFilterer;
}
function MakeMultiFilter(originalArray){
    return MakeMultiFilterHelper.call({}, originalArray, true);
}