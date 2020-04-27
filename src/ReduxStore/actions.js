import { ENDPOINT_API_URL } from '../constant';

import ACTION_TYPES from './actionTypes';

/** ******************
 * Actions Creators *
 ********************/

const updateResponse = (products) => {
    return {
        type: ACTION_TYPES.UPDATE_RESPONSE_DATA,
        payload: products,
    };
};

const toggleShowDifference = () => {
    return {
        type: ACTION_TYPES.TOGGLE_SHOW_DIFFERENT,
    };
};

const createAllProductList = () => {
    return {
        type: ACTION_TYPES.CREATE_PRODUCT_LIST,
    };
};

const addProductToCompare = (productId) => {
    return {
        type: ACTION_TYPES.ADD_PRODUCT_TO_COMPARE,
        payload: { productId },
    };
};

const removeProductFromCompare = (productId) => {
    return {
        type: ACTION_TYPES.REMOVE_PRODUCT_FROM_COMPARE,
        payload: { productId },
    };
};

const updateError = (error) => {
    return {
        type: ACTION_TYPES.UPDATE_API_ERROR,
        error: error.message,
    };
};

const showLoading = (loading = true) => {
    return {
        type: ACTION_TYPES.SHOW_LOADER,
        payload: { loading },
    };
};

const ACTION_CREATORS = {
    updateResponse,
    createAllProductList,
    addProductToCompare,
    updateError,
    showLoading,
};

/** ******************
 * Actions          *
 ********************/

const fetchProducts = () => {
    return (dispatch, getState) => {
        dispatch(ACTION_CREATORS.showLoading(true));
        fetch(ENDPOINT_API_URL)
            .then((res) => res.json())
            .then((response) => {
                dispatch(ACTION_CREATORS.updateResponse(response));
                dispatch(ACTION_CREATORS.createAllProductList());
                const { productList } = getState();
                if (productList.length) {
                    const [{ productId }] = productList;
                    dispatch(ACTION_CREATORS.addProductToCompare(productId));
                }
            })
            .catch((err) => dispatch(ACTION_CREATORS.updateError(err)))
            .finally(() => dispatch(ACTION_CREATORS.showLoading(false)));
    };
};

export const ACTIONS = {
    fetchProducts,
    toggleShowDifference,
    addProductToCompare,
    removeProductFromCompare,
};
