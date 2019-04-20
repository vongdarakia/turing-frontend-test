import nanomemoize from 'nano-memoize';
import categories from './categories';
import customers from './customers';
import departments from './departments';
import products from './products';
import objectIsSame from '../utils/object-is-same';
import stripe from './stripe';

const memoizeFunctions = (functionsTable, restrictedFunctions) => {
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
    ...customers,
    ...departments,
    ...products,
    ...stripe,
};

// Spreading the API call first so that the IDE can pick up what functions are
// in this object. This allows autocompletion when looking for an API call.
// Then rewriting them with their memoized version.
const TuringAPI = {
    ...apiCalls,
    ...memoizeFunctions(apiCalls, [
        'getCustomer',
        'updateCustomer',
        'updateCustomerAddress',
        'updateCustomerCreditCard',
        'postProductReviews',
        'register',
        'login',
        'stripeCharge',
    ]),
};

export default TuringAPI;
