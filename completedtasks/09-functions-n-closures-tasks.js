'use strict';

/**
 * Returns the functions composition of two specified functions f(x) and g(x).
 * The result of compose is to be a function of one argument, (lets call the argument x),
 * which works like applying function f to the result of applying function g to x, i.e.
 *  getComposition(f,g)(x) = f(g(x))
 *
 *
 * @param {Function} f
 * @param {Function} g
 * @return {Function}
 *
 * @example
 *   getComposition(Math.sin, Math.asin)(x) => Math.sin(Math.acos(x))
 *
 */
function getComposition(f,g) {
    return function(x) {
        return f(g(x));
    }
}


/**
 * Returns the math power function with the specified exponent
 *
 * @param {number} exponent
 * @return {Function}
 *
 * @example
 *   let power2 = getPowerFunction(2); // => x^2
 *   power2(2) => 4
 *   power2(4) => 16
 *
 *   let power05 = getPowerFunction(0.5); // => x^0.5
 *   power05(4) => 2
 *   power05(16) => 4
 *
 */
function getPowerFunction(exponent) {
    return function(x) {
        return Math.pow(x, exponent);
    }
}


/**
 * Returns the polynom function of one argument based on specified coefficients.
 *
 * @params {integer}
 * @return {Function}
 *
 * @example
 *   getPolynom(2,3,5) => y = 2*x^2 + 3*x + 5
 *   getPolynom(1,-3)  => y = x - 3
 *   getPolynom(8)     => y = 8
 *   getPolynom()      => null
 */
function getPolynom() {
    if (arguments.length == 0) {
        return null;
    } else {
        return (x) => Array.from(arguments).reduce(
            (sum, elem, index) => sum + elem * Math.pow(x, arguments.length - 1 - index), 0);
    }
}


/**
 * Memoizes passed function and returns function
 * which invoked first time calls the passed function and then always returns cached result.
 *
 * @params {Function} func - function to memoize
 * @return {Function} memoized function
 *
 * @example
 *   var memoizer = memoize(() => Math.random());
 *   memoizer() => some random number  (first run, evaluates the result of Math.random())
 *   memoizer() => the same random number  (second run, returns the previous cached result)
 *   ...
 *   memoizer() => the same random number  (next run, returns the previous cached result)
 */
function memoize(func) {
    let memo = null;

    return function() {
        if (memo)
            return memo;
        else
            return (memo = func.apply(this));
    }
}


/**
 * Returns the function trying to call the passed function and if it throws,
 * retrying it specified number of attempts.
 * 
 * @param {Function} функция
 * @param {number} количество попыток
 * @return {Function}
 *
 * @example
 * let attempt = 0, retryer = retry(() => {
 *      if (++attempt % 2) throw new Error('test');
 *      else return attempt;
 * }, 2);
 * retryer() => 2
 */
function retry(func, attempts) {
    return function() {
        while(attempts >= 0) {
            try {
                return func();
            } catch (err) {
                attempts--;
            }
        } 
    }
}


/**
 * Returns the logging wrapper for the specified method,
 * Logger has to log the start and end of calling the specified function.
 * Logger has to log the arguments of invoked function.
 * The fromat of output log is:
 * <function name>(<arg1>, <arg2>,...,<argN>) starts
 * <function name>(<arg1>, <arg2>,...,<argN>) ends
 * 
 * @param {Function} func
 * @param {Function} logFunc - function to output log with single string argument
 * @return {Function}
 *
 * @example
 *
 * var cosLogger = logger(Math.cos, console.log);
 * var result = cosLogger(Math.PI));     // -1
 *
 * log from console.log:
 * cos(3.141592653589793) starts
 * cos(3.141592653589793) ends
 *
 */
function logger(func, logFunc) {
    return function() {
        let funcName = `${func.name}(${JSON.stringify(Array.from(arguments)).slice(1, -1)})`;

        logFunc(`${funcName} starts`);
        let result = func.apply(this, arguments);
        logFunc(`${funcName} ends`);

        return result;
}
}


/**
 * Return the function with partial applied arguments
 * @param {Function} fn
 * @return {Function}
 *
 * @example
 *   let fn = function(x1,x2,x3,x4) { return  x1 + x2 + x3 + x4; };
 *   partialUsingArguments(fn, 'a')('b','c','d') => 'abcd'
 *   partialUsingArguments(fn, 'a','b')('c','d') => 'abcd'
 *   partialUsingArguments(fn, 'a','b','c')('d') => 'abcd'
 *   partialUsingArguments(fn, 'a','b','c','d')() => 'abcd'
 */
function partialUsingArguments(fn) {
    let args = Array.from(arguments).slice(1);

    return function () {
        return fn.apply(this, args.concat(Array.from(arguments)));
}
}


/**
 * Returns the id generator function that returns next integer starting from specified number every time when invoking.
 *
 * @param {Number} startFrom
 * @return {Function}
 *
 * @example
 *   let getId4 = getIdGenerator(4);
 *   let getId10 = gerIdGenerator(10);
 *   getId4() => 4
 *   getId10() => 10
 *   getId4() => 5
 *   getId4() => 6
 *   getId4() => 7
 *   getId10() => 11
 */
function getIdGeneratorFunction(startFrom) {
    let x = startFrom;
    return () => x++;
}


module.exports = {
    getComposition: getComposition,
    getPowerFunction: getPowerFunction,
    getPolynom: getPolynom,
    memoize: memoize,
    retry: retry,
    logger: logger,
    partialUsingArguments: partialUsingArguments,
    getIdGeneratorFunction: getIdGeneratorFunction,
};
