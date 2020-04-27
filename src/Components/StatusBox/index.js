import React, { Fragment } from 'react';

const CompareBox = ({ count, showOnlyDifference, toggleShowDifference }) => {
    return (
        <Fragment>
            <h1>Compare</h1>
            <label className="itemSelected">{count} item selected</label>
            <div className="difference">
                <input
                    type="checkbox"
                    checked={showOnlyDifference}
                    onChange={toggleShowDifference}
                />
                Show only difference
            </div>
        </Fragment>
    );
};

export default CompareBox;
