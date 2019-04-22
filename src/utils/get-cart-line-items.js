const getCartLineItemsFromTable = (cartTable) => {
    return Object.keys(cartTable)
        .map((key) => cartTable[key])
        .filter(({ quantity }) => quantity > 0);
};

export default getCartLineItemsFromTable;
