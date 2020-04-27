import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { ACTIONS } from '../../ReduxStore/actions';
import { getFeatures, getComparisonProducts } from '../../ReduxStore/selectors';

import ProductComparison from './ProductComparison';

function mapStateToProps(state) {
    return {
        features: getFeatures(state),
        comparisonProducts: getComparisonProducts(state),
        showOnlyDifference: state.showOnlyDifference,
        productList: state.productList,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(ACTIONS, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductComparison);
