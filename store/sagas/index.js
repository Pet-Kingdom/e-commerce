import { all } from 'redux-saga/effects';
import { watchFetchApod } from './apod';
import { watchFetchProducts } from './productsData';

export default function* rootSaga() {
  try {
    yield all([
      watchFetchApod(),
      watchFetchProducts()
    ]);
  } catch (err) {
    console.log(err);
  }
}