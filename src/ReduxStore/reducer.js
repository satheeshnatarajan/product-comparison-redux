import ACTION_TYPES from './actionTypes';

const initialState = {
    featuresList: [],
    compareSummary: {},
    productList: [],
    showOnlyDifference: false,
    loading: false,
    error: null,
};

const reducer = (state = initialState, { type, payload, error }) => {
    switch (type) {
        case ACTION_TYPES.UPDATE_RESPONSE_DATA: {
            const {
                products: { featuresList = [], compareSummary = {} } = {},
            } = payload;
            return { ...state, featuresList, compareSummary };
        }
        case ACTION_TYPES.CREATE_PRODUCT_LIST: {
            const { compareSummary } = state;
            const productList = [];
            if (Object.entries(compareSummary).length) {
                const { titles } = compareSummary;
                for (const productId in titles) {
                    if ({}.hasOwnProperty.call(titles, productId)) {
                        productList.push({
                            productId,
                            ...titles[productId],
                            selected: false,
                        });
                    }
                }
            }
            return { ...state, productList };
        }
        case ACTION_TYPES.TOGGLE_SHOW_DIFFERENT: {
            return { ...state, showOnlyDifference: !state.showOnlyDifference };
        }
        case ACTION_TYPES.ADD_PRODUCT_TO_COMPARE: {
            const { productList } = state;
            const newProductList = productList.map((product) => {
                if (payload.productId === product.productId) {
                    return {
                        ...product,
                        selected: payload.productId === product.productId,
                    };
                }
                return product;
            });
            return { ...state, productList: newProductList };
        }
        case ACTION_TYPES.REMOVE_PRODUCT_FROM_COMPARE: {
            const { productList } = state;
            const newProductList = productList.map((product) => {
                if (payload.productId === product.productId) {
                    return {
                        ...product,
                        selected: !(payload.productId === product.productId),
                    };
                }
                return product;
            });
            return { ...state, productList: newProductList };
        }
        case ACTION_TYPES.UPDATE_API_ERROR: {
            return { ...state, error: 'Error occur. Refresh again!' };
        }
        case ACTION_TYPES.SHOW_LOADER: {
            return { ...state, loading: payload.loading };
        }
        default: {
            return state;
        }
    }
};

export default reducer;
