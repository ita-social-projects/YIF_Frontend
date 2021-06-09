import React, { Component } from 'react';
import ErrorPage from '../pages/errorPage';
import { RootState } from '../store/store';
import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { connect } from 'react-redux';
import { requestFailure } from '../store/reducers/errorBoundryStatus.reducer';

class ErrorBoundry extends Component<
  any,
  ThunkAction<void, RootState, unknown, Action<string>>
> {
  componentDidCatch() {
    this.props.requestFailure();
  }
  render() {
    const { error } = this.props.state;

    if (error) {
      return <ErrorPage />;
    }
    return this.props.children;
  }
}

const mapStateToProps = (state: RootState) => {
  return {
    state: state.errorBoundryStatus,
  };
};
const mapDispatchToProps = (dispatch: any) => {
  return {
    requestFailure: () => dispatch(requestFailure()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ErrorBoundry);
