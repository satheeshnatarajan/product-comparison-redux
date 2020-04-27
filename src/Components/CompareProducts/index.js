import React, { Fragment } from 'react';

import { toINR } from '../../utils';

const CompareProduct = ({ products, onCloseClick }) => {
    return (
        <Fragment>
            {products.map((product) => {
                const {
                    images,
                    titles,
                    specs,
                    productId,
                    productPricingSummary: {
                        finalPrice,
                        price,
                        totalDiscount,
                    } = {},
                } = product;
                return (
                    <div key={product.id || 'selectProduct'} className="column">
                        <div className="product">
                            {products.length > 1 && (
                                <span
                                    className="close"
                                    onClick={() => onCloseClick(productId)}
                                >
                                    X
                                </span>
                            )}
                            <div className="image">
                                <img src={images} alt={titles.title} />
                            </div>
                            <div className="title">{titles.title}</div>
                            <div className="prices">
                                <span className="price">
                                    {toINR(finalPrice)}
                                </span>
                                <span className="discount">{toINR(price)}</span>
                                <span className="off">
                                    {totalDiscount}% off
                                </span>
                            </div>
                        </div>
                        <div className="table">
                            {specs &&
                                specs.map((spec, i) => {
                                    return (
                                        <div
                                            key={spec + i}
                                            className={`item ${
                                                spec === '' && 'title'
                                            }`}
                                        >
                                            {spec}
                                        </div>
                                    );
                                })}
                        </div>
                    </div>
                );
            })}
        </Fragment>
    );
};

export default CompareProduct;
