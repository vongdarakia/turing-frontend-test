const prepareRequestBody = (data = {}) => {
    const newData = { ...data };
    const keys = Object.keys(newData);
    let numKeysDeleted = 0;

    keys.forEach((key) => {
        if (newData[key] === undefined) {
            delete newData[key];
            numKeysDeleted += 1;
        }
    });

    if (numKeysDeleted === keys.length) {
        return undefined;
    }
    return JSON.stringify(newData);
};

export default prepareRequestBody;
