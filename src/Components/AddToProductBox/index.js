import React, { Fragment } from 'react';

const AddToProductBox = ({ products, onChange }) => {
    return (
        <Fragment>
            <div className="imageSpace" />
            <div className="addProduct">Add a product</div>
            <select
                className="selection"
                defaultValue="DEFAULT"
                onChange={onChange}
            >
                <option value="DEFAULT">choose a product</option>
                {products.map((product) => {
                    return (
                        !product.selected && (
                            <option
                                key={product.productId}
                                value={product.productId}
                            >
                                {product.title}
                            </option>
                        )
                    );
                })}
            </select>
        </Fragment>
    );
};

export default AddToProductBox;
