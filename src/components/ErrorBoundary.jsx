import React from "react";

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    console.error("UI crashed:", error);
    console.error("Component stack:", info?.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: 16, fontFamily: "system-ui" }}>
          <h2>Erro ao renderizar esta página</h2>
          <p>Abra o Console (F12) para ver o detalhe.</p>
          <pre style={{ whiteSpace: "pre-wrap" }}>
            {String(this.state.error)}
          </pre>
          <button onClick={() => window.location.reload()}>
            Recarregar
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
