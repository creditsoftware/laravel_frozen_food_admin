const { takeEvery, call, put, takeLatest, select } = require('redux-saga/effects');
const { init } = require('../utils');
const api = require('../../api');

const LABEL_ADD = 'LABEL_ADD';
const LABEL_DEL = 'LABEL_DEL';
const LABEL_UPD = 'LABEL_UPD';

exports.init = init('labels');

exports.handlers = {
    [LABEL_ADD]: (s, { label }) => ([...s, label]),
    [LABEL_DEL]: (s, { id }) => s.filter(l => l.id !== id),
    [LABEL_UPD]: (s, { id, label }) => s.map(l => l.id === id ? { ...l, ...label, id } : l),

    PRODUCT_DEL: (s, { id }) => s.filter(l => l.product_id !== id),
};


exports.getAll = s => s.labels;
exports.getById = id => s => s.labels.find(l => l.id == id);
exports.getByProdId = id => s => id ? s.labels.filter(l => l.product_id === id) : null;


function* dupe_saga({ id }) {
    const { ok, err } = yield call(api.dupe, id);
    if (err) return alert(err);
    yield put({ type: LABEL_ADD, label: ok })
}

function* del_saga({ id }) {
    const { ok, err } = yield call(api.delLabel, id);
    if (err) return alert(err);
    yield put({ type: LABEL_DEL, id });
}

function* save_saga({ label }) {
    let payload = label;
    const product = yield select(({ products }) => products)
    const detail = yield select(({ detail }) => detail)
    const pp = product.filter((p) => p.id == payload.product_id);
    payload['sku'] = pp[0].code;
    const { ok, err } = yield call(api.save, { ...label, code: detail.getProd.product.code ? detail.getProd.product.code : "", price: detail.getProd.product.price ? detail.getProd.product.price : 0 });
    const result = yield call(api.wp_save, payload);
    if (result === null) alert('Il prodotto corrispondente non esiste nel sito web.');
    if (err) return alert(err);
    yield put({ type: LABEL_UPD, id: ok.id, label: ok });
}

const LABEL_DUPE_SAGA = 'LABEL_DUPE_SAGA';
const LABEL_DEL_SAGA = 'LABEL_DEL_SAGA';
const LABEL_SAVE_SAGA = 'LABEL_SAVE_SAGA';

exports.dupe = (id) => ({ type: LABEL_DUPE_SAGA, id });
exports.del = (id) => ({ type: LABEL_DEL_SAGA, id });
exports.save = (label) => ({ type: LABEL_SAVE_SAGA, label });

exports.saga = function* () {
    yield takeLatest(LABEL_DUPE_SAGA, dupe_saga);
    yield takeLatest(LABEL_DEL_SAGA, del_saga);
    yield takeLatest(LABEL_SAVE_SAGA, save_saga);
}