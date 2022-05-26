'use strict';

/**
 * Returns the lines sequence of "99 Bottles of Beer" song:
 *
 *  '99 bottles of beer on the wall, 99 bottles of beer.'
 *  'Take one down and pass it around, 98 bottles of beer on the wall.'
 *  '98 bottles of beer on the wall, 98 bottles of beer.'
 *  'Take one down and pass it around, 97 bottles of beer on the wall.'
 *  ...
 *  '1 bottle of beer on the wall, 1 bottle of beer.'
 *  'Take one down and pass it around, no more bottles of beer on the wall.'
 *  'No more bottles of beer on the wall, no more bottles of beer.'
 *  'Go to the store and buy some more, 99 bottles of beer on the wall.'
 *
 *
 *
 * @return {Iterable.<string>}
 *
 */
function* get99BottlesOfBeer() {
    let count = 99;
    while (count > 1) {
        yield `${count} bottles of beer on the wall, ${count} bottles of beer.`
        yield `Take one down and pass it around, ${count -= 1} bottles of beer on the wall.`
        yield `${count} bottles of beer on the wall, ${count} bottles of beer.`
        yield `Take one down and pass it around, ${count -= 1} bottle${count > 1 ? 's' : ''} of beer on the wall.`
    }
    yield* [
     '1 bottle of beer on the wall, 1 bottle of beer.',
     'Take one down and pass it around, no more bottles of beer on the wall.',
     'No more bottles of beer on the wall, no more bottles of beer.',
     'Go to the store and buy some more, 99 bottles of beer on the wall.'];
}


/**
 * Returns the Fibonacci sequence:
 *   0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, ...
 *
 * @return {Iterable.<number>}
 *
 */
function* getFibonacciSequence() {
    let a = 0, b = 1;
    while (true) {
        yield a;
        let temp = b;
        b += a;
        a = temp;
    }
}


/**
 * Traverses a tree using the depth-first strategy
 *
 * Each node have child nodes in node.children array.
 * The leaf nodes do not have 'children' property.
 *
 * @params {object} root the tree root
 * @return {Iterable.<object>} the sequence of all tree nodes in depth-first order
 * @example
 *
 *   let node1 = { n:1 }, node2 = { n:2 }, node3 = { n:3 }, node4 = { n:4 },
 *       node5 = { n:5 }, node6 = { n:6 }, node7 = { n:7 }, node8 = { n:8 };
 *   node1.children = [ node2, node6, node7 ];
 *   node2.children = [ node3, node4 ];
 *   node4.children = [ node5 ];
 *   node7.children = [ node8 ];
 *
 *     source tree (root = 1):
 *            1
 *          / | \
 *         2  6  7
 *        / \     \            =>    { 1, 2, 3, 4, 5, 6, 7, 8 }
 *       3   4     8
 *           |
 *           5
 *
 *  depthTraversalTree(node1) => node1, node2, node3, node4, node5, node6, node7, node8
 *
 */
function* depthTraversalTree(root) {
    let stack = [{node: root, child_i: 0}];
    yield root;
    while (stack.length > 0) {
        let v = stack[stack.length - 1];
        if (!Boolean(v.node.children) || v.child_i >= v.node.children.length) {
            stack.pop();
            continue;
        }
        yield v.node.children[v.child_i];
        stack.push({node: v.node.children[v.child_i++], child_i: 0});
    }
}


/**
 * Traverses a tree using the breadth-first strategy
 *
 * Each node have child nodes in node.children array.
 * The leaf nodes do not have 'children' property.
 *
 * @params {object} root the tree root
 * @return {Iterable.<object>} the sequence of all tree nodes in breadth-first order
 * @example
 *     source tree (root = 1):
 *
 *            1
 *          / | \
 *         2  3  4
 *        / \     \            =>    { 1, 2, 3, 4, 5, 6, 7, 8 }
 *       5   6     7
 *           |
 *           8
 *
 */
function* breadthTraversalTree(root) {
    let queue = [[root]];
    while (queue.length > 0) {
        for (let node of queue.shift()) {
            yield node;
            if (node.children) queue.push(node.children);
        }
}
}


/**
 * Merges two yield-style sorted sequences into the one sorted sequence.
 * The result sequence consists of sorted items from source iterators.
 *
 * @params {Iterable.<number>} source1
 * @params {Iterable.<number>} source2
 * @return {Iterable.<number>} the merged sorted sequence
 *
 * @example
 *   [ 1, 3, 5, ... ], [2, 4, 6, ... ]  => [ 1, 2, 3, 4, 5, 6, ... ]
 *   [ 0 ], [ 2, 4, 6, ... ]  => [ 0, 2, 4, 6, ... ]
 *   [ 1, 3, 5, ... ], [ -1 ] => [ -1, 1, 3, 5, ...]
 */
function* mergeSortedSequences(source1, source2) {
    let curr1 = source1(), curr2 = source2();
    let next1 = curr1.next(), next2 = curr2.next();
    while (!next1.done || !next2.done) {
        if (next1.value < next2.value || next2.done) {
            yield next1.value;
            next1 = curr1.next();
        } else {
            yield next2.value;
            next2 = curr2.next();
        }
}
}


module.exports = {
    get99BottlesOfBeer: get99BottlesOfBeer,
    getFibonacciSequence: getFibonacciSequence,
    depthTraversalTree: depthTraversalTree,
    breadthTraversalTree: breadthTraversalTree,
    mergeSortedSequences: mergeSortedSequences
};
