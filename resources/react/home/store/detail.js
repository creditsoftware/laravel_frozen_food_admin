const {takeEvery, call, put} = require('redux-saga/effects');
const api = require('../../api');


const PRODUCT_DETAIL = 'PRODUCT_DETAIL';
const PRICE_UPDATE = 'PRICE_UPDATE';

exports.getProds = (getProd) => ({type: PRODUCT_DETAIL,getProd});

exports.handlers = {
    [PRODUCT_DETAIL]:(s, getProd) => getProd,
};

exports.init = {}

function* getProd_saga(code) {
    console.log(code,"********************")
    const getProd = yield call(api.getProd, code.code);
    yield put({type:PRODUCT_DETAIL, getProd})
}

function* update_saga(getProd) {
    console.log(getProd.getProd,"^^^^^^^^^^^^^^^^")
    yield put({type:PRODUCT_DETAIL, getProd})
}

const PRODUCT_DETAIL_SAGA = 'PRODUCT_DETAIL_SAGA';

exports.getprod = (code) => ({type:PRODUCT_DETAIL_SAGA, code});

exports.saga = function*() {
    yield takeEvery(PRODUCT_DETAIL_SAGA, getProd_saga);
    yield takeEvery(PRODUCT_DETAIL, update_saga);
}
exports.updatePrice = (priceValue)=>(
    {type:PRODUCT_DETAIL, priceValue}
)