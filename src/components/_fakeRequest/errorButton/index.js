import React, { Component } from 'react';

export default class ErrorButton extends Component {
  state = {
    renderError: false,
  };

  render() {
    if (this.state.renderError) {
      this.foo.bar = 0;
    }

    return (
      <span onClick={() => this.setState({ renderError: true })}>
        GET ERROR: this.foo.bar=0
      </span>
    );
  }
}
