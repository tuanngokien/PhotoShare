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

export {formatNumber}