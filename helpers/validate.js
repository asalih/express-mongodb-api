class Validate {
    isInt (o) {
        return Number(o) === o && o % 1 === 0;
    }
    isFloat(o) {
        return Number(o) === o && o % 1 !== 0;
    }
    is(o, w) {
        return o === w;
    }
    isNot(o, w) {
        return o !== w;
    }
    isUndefined (i) {
        return typeof (i) === "undefined";
    }
}

module.exports = new Validate();