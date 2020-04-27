import React, { Fragment } from 'react';

const FeatureList = ({ features, printEmpty }) => {
    return (
        <Fragment>
            {features.map((feature) => {
                return (
                    <Fragment key={feature.title}>
                        <div className="title item">
                            {!printEmpty ? feature.title : ''}
                        </div>
                        {feature.features.map((f) => (
                            <div key={f.featureName} className="item">
                                {!printEmpty ? f.featureName : ''}
                            </div>
                        ))}
                    </Fragment>
                );
            })}
        </Fragment>
    );
};

export default FeatureList;
