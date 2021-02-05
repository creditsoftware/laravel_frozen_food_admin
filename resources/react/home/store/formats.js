const {produce} = require('immer');

exports.handlers = {
    // "HACK+": (s) => produce(s, s=> {
    //      s[1].find(e => e.id=="ingredients").size++;
    // }),
    //
    // "HACK-": (s) => produce(s, s=> {
    //     const e = s[1].find(e => e.id=="ingredients").size--;
    // }),

};

exports.getAll = s => s.formats;
exports.getById = id => s => s.formats[id];

const format1 = [
    {
        h: 455, w: 790, x: 71, y: 410,
        title: "Nome", uisize: 1,
        id: "name", size: 1087, lineh: 100,
    },
    {
        h: 722, w: 931, x: 72, y: 484,
        title: "Ingredienti", uisize: 6,
        id: "ingredients", size: 473, lineh: 134
    },
    {
        title: "Ricette", uisize: 6,
        id: "recipes",
    },
    {
        h: 759, w: 900, x: 780, y: 745,
        title: "Energia", suffix: "KCal", uisize: 0.25,
        id: "energy", size: 471, lineh: 100,
    },
    {
        h: 788, w: 900, x: 780, y: 772,
        title: "Grassi", suffix: "gr", uisize: 0.25,
        id: "fat", size: 472, lineh: 100,
    },
    {
        h: 815, w: 900, x: 780, y: 798,
        title: "Acidi grassi sat.", suffix: "gr", uisize: 0.25,
        id: "acidfat", size: 472, lineh: 100,
    },
    {
        h: 852, w: 900, x: 780, y: 837,
        title: "Carboidrati", suffix: "gr", uisize: 0.25,
        id: "carbo", size: 472, lineh: 100,
    },
    {
        id: "sugar", size: 472, lineh: 100,
        title: "Zuccheri", suffix: "gr", uisize: 0.25,
        h: 880, w: 900, x: 780, y: 862,
    },
    {
        id: "protein", size: 472, lineh: 100,
        title: "Proteine", suffix: "gr", uisize: 0.25,
        h: 903, w: 900, x: 780, y: 889,
    },
    {
        id: "salt", size: 472, lineh: 100,
        title: "Sale", suffix: "gr", uisize: 0.25,
        h: 933, w: 900, x: 780, y: 915,
    },
];

exports.init = {1: format1}
