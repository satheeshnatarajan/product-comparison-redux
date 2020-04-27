import { createSelector } from 'reselect';

const featureListSelector = (state) => state.featuresList;

const compareSummarySelector = (state) => state.compareSummary;

const showOnlyDifference = (state) => state.showOnlyDifference;

const selectedProductSelector = (state) =>
    state.productList.filter((product) => product.selected);

const getAllFeaturesSelector = createSelector(
    featureListSelector,
    (features) => {
        return features.map((list) => {
            return {
                ...list,
                isDifferent: list.features.some(
                    ({ properties = {} }) => properties.isDifferent || false
                ),
            };
        });
    }
);

const getSpecs = (selectedFeature, productId) => {
    const specs = [];
    for (const features of selectedFeature) {
        specs.push('');
        for (const feature of features.features) {
            specs.push(feature.values[productId] || '-');
        }
    }
    return specs;
};

const getProductSummary = (allProductSummary, productId) => {
    const summary = [];
    for (const category in allProductSummary) {
        if ({}.hasOwnProperty.call(allProductSummary, category)) {
            summary[category] = allProductSummary[category][productId];
        }
    }
    return summary;
};

export const getFeatures = createSelector(
    getAllFeaturesSelector,
    showOnlyDifference,
    (allFeatures, showOnlyDifference) => {
        if (showOnlyDifference) {
            const features = [];
            for (const list of allFeatures) {
                if (list.isDifferent) {
                    features.push({
                        title: list.title,
                        features: list.features.filter(
                            ({ properties = {} }) => properties.isDifferent
                        ),
                    });
                }
            }
            return features;
        } else {
            return allFeatures;
        }
    }
);

export const getComparisonProducts = createSelector(
    compareSummarySelector,
    selectedProductSelector,
    getFeatures,
    (allProductSummary, selectedProducts, selectedFeature) => {
        return selectedProducts.map(({ productId }) => {
            const productSummary = getProductSummary(
                allProductSummary,
                productId
            );
            return {
                productId,
                ...productSummary,
                specs: getSpecs(selectedFeature, productId),
            };
        });
    }
);
