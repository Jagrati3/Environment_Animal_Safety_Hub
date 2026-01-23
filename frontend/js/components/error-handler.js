/**
 * Global Error Handler
 * Catches and handles errors across all modules
 */

class GlobalErrorHandler {
  constructor() {
    this.setupGlobalHandlers();
    this.errorLog = [];
  }

  setupGlobalHandlers() {
    // Catch unhandled JavaScript errors
    window.addEventListener('error', (event) => {
      this.logError('JavaScript Error', event.error, event.filename, event.lineno);
    });

    // Catch unhandled promise rejections
    window.addEventListener('unhandledrejection', (event) => {
      this.logError('Promise Rejection', event.reason);
      event.preventDefault();
    });
  }

  logError(type, error, filename = '', line = '') {
    const errorInfo = {
      type,
      message: error?.message || error,
      filename,
      line,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent
    };

    this.errorLog.push(errorInfo);
    console.error(`[${type}]`, errorInfo);

    // Show user-friendly message for critical errors
    if (this.isCriticalError(error)) {
      this.showErrorMessage('Something went wrong. Please refresh the page.');
    }
  }

  isCriticalError(error) {
    const criticalKeywords = ['network', 'fetch', 'module', 'syntax'];
    const errorStr = (error?.message || error || '').toLowerCase();
    return criticalKeywords.some(keyword => errorStr.includes(keyword));
  }

  showErrorMessage(message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'global-error-message';
    errorDiv.innerHTML = `
      <div class="error-content">
        <i class="fa-solid fa-exclamation-triangle"></i>
        <span>${message}</span>
        <button onclick="this.parentElement.parentElement.remove()">×</button>
      </div>
    `;
    
    // Add styles
    errorDiv.style.cssText = `
      position: fixed; top: 20px; right: 20px; z-index: 10000;
      background: #ef4444; color: white; padding: 15px;
      border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.3);
    `;

    document.body.appendChild(errorDiv);
    
    // Auto remove after 5 seconds
    setTimeout(() => errorDiv.remove(), 5000);
  }

  getErrorLog() {
    return this.errorLog;
  }
}

// Initialize global error handler
window.globalErrorHandler = new GlobalErrorHandler();

export default GlobalErrorHandler;