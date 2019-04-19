const prepareRequestParams = (data = {}) => {
    const enc = encodeURIComponent;
    const newData = { ...data };
    let keys = Object.keys(newData);

    // Get data that only have values
    keys.forEach((key) => {
        if (newData[key] === undefined) {
            delete newData[key];
        }
    });

    keys = Object.keys(newData);

    if (keys.length > 0) {
        const params = keys
            .map((key) => `${enc(key)}=${enc(newData[key])}`)
            .join('&');
        return `?${params}`;
    }
    return '';
};

export default prepareRequestParams;
