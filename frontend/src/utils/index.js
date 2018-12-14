const formatNumber = (() => {
    let pow = Math.pow, floor = Math.floor, abs = Math.abs, log = Math.log;

    function round(n, precision) {
        let prec = Math.pow(10, precision);
        return Math.round(n * prec) / prec;
    }

    function format(n) {
        let base = floor(log(abs(n)) / log(1000));
        let suffix = 'KMB'[base - 1];
        return suffix ? round(n / pow(1000, base), 1) + suffix : '' + n;
    }
    return format;
})();

const splitArray = (array, size) => {
    const container = [];
    for(let i = 0; i < size; i++){
        container.push([]);
    }
    let i = 0;
    array.map(e => {
        container[i%size].push(e);
        i++;
    });
    return container;
};

const humanPrivacyMode = (privacy) => {
    switch (privacy) {
        case "1":
            return "Private";
        case "2":
            return "Friend";
        case "3":
            return "Public";
        default:
            return ""
    }
};

export {formatNumber, splitArray, humanPrivacyMode}