import nanomemoize from 'nano-memoize';
import objectIsSame from '../utils/object-is-same';
import categories from './categories';
import customers from './customers';
import departments from './departments';
import orders from './orders';
import products from './products';
import shoppingCart from './shopping-cart';
import stripe from './stripe';
import taxes from './taxes';
import shipping from './shipping';

const memoizeFunctions = (functionsTable, restrictedFunctions = []) => {
    const memoizedFunctionsTable = {};

    Object.keys(functionsTable).forEach((key) => {
        const func = functionsTable[key];

        if (restrictedFunctions.includes(key)) {
            memoizedFunctionsTable[key] = func;
        } else {
            memoizedFunctionsTable[key] = nanomemoize(func, {
                equals: objectIsSame,
            });
        }
    });
    return memoizedFunctionsTable;
};

const apiCalls = {
    ...categories,
    ...departments,
    ...products,
    ...taxes,
    ...shipping,
};

// Spreading the API call first so that the IDE can pick up what functions are
// in this object. This allows autocompletion when looking for an API call.
// Then rewriting them with their memoized version.
const TuringAPI = {
    ...apiCalls,
    ...customers,
    ...shoppingCart,
    ...stripe,
    ...orders,
    ...memoizeFunctions(apiCalls),
};

export default TuringAPI;
