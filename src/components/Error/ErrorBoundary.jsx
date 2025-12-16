import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Обновляем состояние, чтобы показать запасной UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Можно отправить лог на сервер или в консоль
    console.error("Error caught by ErrorBoundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center h-screen bg-black text-white">
          <h1 className="text-3xl font-bold mb-4 text-red-600">
            Oops, something went wrong
          </h1>
          <p className="text-gray-400 mb-6">
            We’re working to fix the issue. Try refreshing the page.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-red-600 hover:bg-red-700 rounded text-white font-semibold"
          >
            Reload
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
