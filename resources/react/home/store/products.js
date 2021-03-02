const {takeEvery, call, put} = require('redux-saga/effects');
const {init} = require('../utils');
const api = require('../../api');


const PRODUCT_UPD = 'PRODUCT_UPD';
const PRODUCT_DEL = 'PRODUCT_DEL';
const PRODUCT_UPDCOD = 'PRODUCT_UPDCOD';

exports.updProd = (id, values) => ({type: PRODUCT_UPD, id, values});


exports.handlers = {
    [PRODUCT_UPD]: (s, {id, values}) => s.map(p => p.id === id ? {...p, ...values, id} : p ),
    [PRODUCT_DEL]: (s, {id}) => s.filter(p => p.id !== id),
    [PRODUCT_UPDCOD]: (s, {oldCod, newCod}) => s.map(p => p.code === oldCod ? {...p, code:newCod} : p ),
};

exports.init = init('products');

exports.getAll = s => s.products;

function* active_saga({id}) {
    const {ok, err} = yield call(api.active, id);
    if(err) return alert(err);
    yield put(exports.updProd(ok.id, ok));
}

function* delete_saga({id}) {
    const {ok, err} = yield call(api.delProduct, id);
    if(err) return alert(err);
    yield put({type: PRODUCT_DEL, id});
}

function* updCod_saga({oldCod, newCod}) {
    const {ok, err} = yield call(api.updCod, oldCod, newCod);
    if(err) return alert(err);
    yield put({type: PRODUCT_UPDCOD, oldCod, newCod});
}

const PRODUCT_ACTIVE_SAGA = 'PRODUCT_ACTIVE_SAGA';
const PRODUCT_DELETE_SAGA = 'PRODUCT_DEL_SAGA';
const PRODUCT_UPDCOD_SAGA = 'PRODUCT_UPDCOD_SAGA';

exports.active = id => ({type: PRODUCT_ACTIVE_SAGA, id});
exports.del = id => ({type: PRODUCT_DELETE_SAGA, id});
exports.updCod = (oldCod, newCod) => ({type: PRODUCT_UPDCOD_SAGA, oldCod, newCod});

exports.saga = function*() {
    yield takeEvery(PRODUCT_ACTIVE_SAGA, active_saga);
    yield takeEvery(PRODUCT_DELETE_SAGA, delete_saga);
    yield takeEvery(PRODUCT_UPDCOD_SAGA, updCod_saga);
}
