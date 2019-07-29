import { Component } from 'react';
import { connect } from 'react-redux';
import { fetchInitialState } from './redux/actions/initialStateActions';

class Bootstrap extends Component {
  async componentWillMount() {
    const { fetchInitialState } = this.props;
    fetchInitialState();
  }

  render() {
    const { initialStateLoaded, children } = this.props;

    return !initialStateLoaded ? null : children;
  }
}

const mapStateToProps = state => ({
  initialStateLoaded: state.initialState.initialStateLoaded,
});

const mapDispatchToProps = {
  fetchInitialState,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Bootstrap);
