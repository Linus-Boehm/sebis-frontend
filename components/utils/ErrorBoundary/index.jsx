import * as React from 'react';
import ErrorPage from './ErrorPage';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error) {
    // Display fallback UI
    this.setState({ hasError: true });
  }

  render() {
    if (this.state.hasError) {
      return (
        <ErrorPage
          title="Ups, da ist uns leider ein Fehler unterlaufen."
        />
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
