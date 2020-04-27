import React from 'react';

import AddToProductBox from '../AddToProductBox';
import CompareProduct from '../CompareProducts';
import FeatureList from '../FeatureList';
import CompareBox from '../StatusBox';

import './ProductComparison.css';

const ProductComparison = ({
    features,
    comparisonProducts,
    showOnlyDifference,
    productList,
    actions,
}) => {
    const addProductToCompare = (event) => {
        actions.addProductToCompare(event.target.value);
    };

    const { toggleShowDifference, removeProductFromCompare } = actions;
    return (
        <div className="container">
            {features.length > 0 && (
                <div className="column features">
                    <div className="product">
                        <CompareBox
                            count={comparisonProducts.length}
                            showOnlyDifference={showOnlyDifference}
                            toggleShowDifference={toggleShowDifference}
                        />
                    </div>
                    <div className="table">
                        <FeatureList features={features} />
                    </div>
                </div>
            )}

            <CompareProduct
                products={comparisonProducts}
                onCloseClick={removeProductFromCompare}
            />

            {comparisonProducts.length < 4 && (
                <div className="column">
                    <div className="product">
                        <AddToProductBox
                            products={productList}
                            onChange={addProductToCompare}
                        />
                    </div>
                    <div className="table">
                        <FeatureList features={features} printEmpty={true} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductComparison;
