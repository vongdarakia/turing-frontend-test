const objectIsSame = (prevObj, nextObj) => {
    if (prevObj === nextObj) {
        return true;
    }

    if (!prevObj || !nextObj) {
        return false;
    }

    const prevKeys = Object.keys(prevObj);
    const nextKeys = Object.keys(nextObj);

    if (prevKeys.length !== nextKeys.length) {
        return false;
    }

    for (let keyIndex = 0; keyIndex < prevKeys.length; keyIndex += 1) {
        const key = prevKeys[keyIndex];
        if (prevObj[key] !== nextObj[key]) {
            return false;
        }
    }
    return true;
};

export default objectIsSame;
