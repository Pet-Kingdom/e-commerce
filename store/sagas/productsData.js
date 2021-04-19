import { take, put, call } from 'redux-saga/effects';
import axios from 'axios';
import {
  fetchProductsStart,
  fetchProductsSuccess,
  fetchProductsFail,
} from '../reducers/productsData';
import { getClient } from "../../utils/sanity";

export function* fetchProducts(preview, query) {
  try {
    const productsData = yield getClient(preview).fetch(query);
    yield put(fetchProductsSuccess(productsData));
  } catch (error) {
    yield put(fetchProductsFail(error));
  }
}

export function* watchFetchProducts() {
  while (true) {
    const { payload: { preview, query } } = yield take(fetchProductsStart);
    yield call(fetchProducts, preview, query);
  }
}