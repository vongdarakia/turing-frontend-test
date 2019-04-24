const shopmateColors = {
    black: '#2e2e2e',
    white: '#f7f7f7',
    red: '#f62f5e',
    blue: '#6eb2fb',
    orange: '#f1ad3d',
    yellow: '#effc90',
};

const getShopmateColor = (color) => {
    const cleanedColor = color.toLowerCase();

    return shopmateColors[cleanedColor] || cleanedColor;
};

export default getShopmateColor;
