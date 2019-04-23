const getItemImageUrlByName = (productName) => {
    const cleanedName = productName
        .replace(/\./g, '')
        .replace(/[^a-zA-Z\d]/g, '-')
        .toLowerCase();

    return `https://backendapi.turing.com/images/products/${cleanedName}.gif`;
};

export default getItemImageUrlByName;
