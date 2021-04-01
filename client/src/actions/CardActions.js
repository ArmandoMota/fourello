import apiClient from "../lib/ApiClient";
import * as types from "../constants/ActionTypes";

export function createCardRequest() {
  return { type: types.CREATE_CARD_REQUEST };
}

export function createCardSuccess(card) {
  return { type: types.CREATE_CARD_SUCCESS, card };
}

export function createCard(card, callback) {
  return function (dispatch) {
    dispatch(createCardRequest());
    apiClient.createCard(card, (data) => {
      dispatch(createCardSuccess(data.card));

      if (callback) {
        callback(data.card);
      }
    });
  };
}

export function getCardRequest() {
  return { type: types.FETCH_CARD_REQUEST };
}

export function getCardSuccess(card) {
  return { type: types.FETCH_CARD_SUCCESS, card };
}

export function getCard(id, callback) {
  return function (dispatch) {
    dispatch(getCardRequest());
    apiClient.getCard(id, (data) => {
      dispatch(getCardSuccess(data.card));

      if (callback) {
        callback(data.card);
      }
    });
  };
}