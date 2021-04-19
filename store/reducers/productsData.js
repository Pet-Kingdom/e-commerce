import { createActions, handleActions } from 'redux-actions';

const defaultState = { error: null, data: null, isLoading: false };

export const { fetchProductsStart, fetchProductsSuccess, fetchProductsFail } = createActions({
  FETCH_PRODUCTS_START: (preview, query) => ({ preview, query }),
  FETCH_PRODUCTS_SUCCESS: productsData => ({ productsData }),
  FETCH_PRODUCTS_FAIL: error => ({ error }),
});

export const reducer = handleActions(
  {
    [fetchProductsStart]: state => ({ ...state, error: null, isLoading: true }),
    [fetchProductsSuccess]: (state, { payload: { productsData } }) => ({
      error: null,
      isLoading: false,
      data: productsData,
    }),
    [fetchProductsFail]: (state, { payload: { error } }) => ({ error, isLoading: false, data: [] }),
  },
  defaultState,
);