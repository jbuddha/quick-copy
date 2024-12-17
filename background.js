let activeTabs = new Set();

browser.browserAction.onClicked.addListener(async (tab) => {
    const isActive = activeTabs.has(tab.id);
    
    if (!isActive) {
        // Activate
        await browser.tabs.insertCSS(tab.id, {
            code: `
                .quick-copy-notification {
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    background: #333;
                    color: white;
                    padding: 10px 20px;
                    border-radius: 5px;
                    z-index: 999999;
                    animation: fadeInOut 2s ease-in-out;
                }
                @keyframes fadeInOut {
                    0% { opacity: 0; }
                    15% { opacity: 1; }
                    85% { opacity: 1; }
                    100% { opacity: 0; }
                }
            `
        });

        await browser.tabs.executeScript(tab.id, {
            code: `(${activate.toString()})()`
        });

        activeTabs.add(tab.id);
        browser.browserAction.setIcon({
            tabId: tab.id,
            path: "icon-active.png"
        });
        browser.browserAction.setTitle({
            tabId: tab.id,
            title: "Click to deactivate Quick Copy"
        });
    } else {
        // Deactivate
        await browser.tabs.executeScript(tab.id, {
            code: `(${deactivate.toString()})()`
        });

        activeTabs.delete(tab.id);
        browser.browserAction.setIcon({
            tabId: tab.id,
            path: "icon-inactive.png"
        });
        browser.browserAction.setTitle({
            tabId: tab.id,
            title: "Click to activate Quick Copy"
        });
    }
});

function activate() {
    if (window.quickCopyActive) return;
    window.quickCopyActive = true;

    function showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'quick-copy-notification';
        notification.textContent = message;
        document.body.appendChild(notification);
        setTimeout(() => notification.remove(), 2000);
    }

    function copyHandler() {
        const selection = window.getSelection();
        const selectedText = selection.toString().trim();
        
        if (selectedText) {
            // Store the current selection range
            const range = selection.getRangeAt(0);

            // Create temporary textarea and copy
            const textarea = document.createElement('textarea');
            textarea.value = selectedText;
            document.body.appendChild(textarea);
            textarea.select();
            
            try {
                document.execCommand('copy');
                showNotification('Text copied!');
            } catch (err) {
                showNotification('Failed to copy');
            }
            
            // Clean up textarea
            document.body.removeChild(textarea);

            // Restore the original selection
            selection.removeAllRanges();
            selection.addRange(range);
        }
    }

    window.quickCopyHandler = copyHandler;
    document.addEventListener('mouseup', window.quickCopyHandler);
    showNotification('Quick Copy activated!');
}

function deactivate() {
    if (!window.quickCopyActive) return;
    
    document.removeEventListener('mouseup', window.quickCopyHandler);
    window.quickCopyActive = false;
    
    const notification = document.createElement('div');
    notification.className = 'quick-copy-notification';
    notification.textContent = 'Quick Copy deactivated!';
    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 2000);
}

// Clean up on tab updates
browser.tabs.onUpdated.addListener((tabId, changeInfo) => {
    if (changeInfo.status === 'complete') {
        activeTabs.delete(tabId);
        browser.browserAction.setIcon({
            tabId: tabId,
            path: "icon-inactive.png"
        });
    }
});

// Clean up on tab removal
browser.tabs.onRemoved.addListener((tabId) => {
    activeTabs.delete(tabId);
});