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

// API calls that will return data that most likely won't be different
// within the user's session
const staticApiCalls = {
    ...categories,
    ...departments,
    ...products,
    ...taxes,
    ...shipping,
};

// Spreading the Static API call first so that the IDE can pick up what functions are
// in this object. This allows autocompletion when looking for an API call.
// Then rewriting them with their memoized version.
const TuringAPI = {
    ...staticApiCalls,
    ...customers,
    ...shoppingCart,
    ...stripe,
    ...orders,
    ...memoizeFunctions(staticApiCalls),
};

export default TuringAPI;
