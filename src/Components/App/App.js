import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import './App.css';
import { ACTIONS } from '../../ReduxStore/actions';
import ProductComparisonContainer from '../ProductComparison/ProductComparisonContainer';

class App extends Component {
    componentDidMount() {
        this.props.fetchProducts();
    }

    render() {
        const { loading, error } = this.props;
        return (
            <Fragment>
                {loading && <h1 className="loading">Loading..!</h1>}
                {error && (
                    <h1 className="error">Error occurred. Refresh again!</h1>
                )}
                {!loading && !error && <ProductComparisonContainer />}
            </Fragment>
        );
    }
}

function mapStateToProps(state) {
    return {
        loading: state.loading,
        error: state.error,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        fetchProducts: bindActionCreators(ACTIONS.fetchProducts, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
