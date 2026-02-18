/**
 * Global Error Handler
 *
 * Catches unhandled errors and promise rejections to prevent the "White Screen of Death".
 * Displays a user-friendly modal with options to reload or go home.
 */

(function () {
    const showErrorModal = (title, message) => {
        // Check if modal already exists
        if (document.getElementById('global-error-modal')) return;

        const modalHtml = `
            <div id="global-error-modal" style="
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.8);
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 10000;
                font-family: 'Poppins', sans-serif;
            ">
                <div style="
                    background: white;
                    padding: 30px;
                    border-radius: 12px;
                    max-width: 500px;
                    text-align: center;
                    box-shadow: 0 4px 20px rgba(0,0,0,0.3);
                ">
                    <div style="font-size: 48px; margin-bottom: 20px;">⚠️</div>
                    <h2 style="color: #d32f2f; margin-bottom: 10px;">${title}</h2>
                    <p style="color: #555; margin-bottom: 25px; line-height: 1.5;">${message}</p>
                    <div style="display: flex; gap: 15px; justify-content: center;">
                        <button onclick="window.location.reload()" style="
                            background: #4CAF50;
                            color: white;
                            border: none;
                            padding: 10px 20px;
                            border-radius: 6px;
                            cursor: pointer;
                            font-size: 16px;
                            font-weight: 600;
                        ">Reload Page</button>
                        <button onclick="window.location.href='/'" style="
                            background: #ddd;
                            color: #333;
                            border: none;
                            padding: 10px 20px;
                            border-radius: 6px;
                            cursor: pointer;
                            font-size: 16px;
                            font-weight: 600;
                        ">Go Home</button>
                    </div>
                </div>
            </div>
        `;

        const div = document.createElement('div');
        div.innerHTML = modalHtml;
        document.body.appendChild(div.firstElementChild);
    };

    window.onerror = function (message, source, lineno, colno, error) {
        console.error('Global Error Caught:', { message, source, lineno, colno, error });
        showErrorModal(
            'Something went wrong',
            'We encountered an unexpected issue. Please try reloading the page.'
        );
        return true; // Prevent default browser error handling
    };

    window.onunhandledrejection = function (event) {
        console.error('Unhandled Promise Rejection:', event.reason);
        showErrorModal(
            'Connection Error',
            'We had trouble processing your request. Please check your connection and try again.'
        );
    };
})();
