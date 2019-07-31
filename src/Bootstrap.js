import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { fetchInitialState } from './redux/actions/initialStateActions';
import Loader from './common/Loader';

class Bootstrap extends Component {
  constructor(props) {
    super(props);

    const { fetchInitialState } = this.props;
    fetchInitialState();
  }

  render() {
    const { initialStateLoaded, children } = this.props;

    return !initialStateLoaded ? <Loader /> : children;
  }
}

const mapStateToProps = (state) => ({
  initialStateLoaded: state.initialState.initialStateLoaded,
});

const mapDispatchToProps = {
  fetchInitialState,
};

Bootstrap.propTypes = {
  initialStateLoaded: PropTypes.bool,
  fetchInitialState: PropTypes.func,
  children: PropTypes.any,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Bootstrap);
