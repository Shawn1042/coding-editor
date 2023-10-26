document.addEventListener("DOMContentLoaded", function() {
    // 1. Element References
    const editors = {
        html: document.getElementById('html-code'),
        css: document.getElementById('css-code'),
        js: document.getElementById('js-code')
    };
    const outputBox = document.querySelector('.right');
    const outputFrame = document.getElementById("output");

    // 2. Utility Functions
    function hasContent(editor) {
        return editor.value.trim() !== "";
    }

    function updateOutputVisibility() {
        // Check if any editor has content
        const anyEditorHasContent = Object.values(editors).some(hasContent);

        if (anyEditorHasContent) {
            outputBox.classList.add('show-output');
        } else {
            outputBox.classList.remove('show-output');
        }
    }

    function executeCode() {
        const { html, css, js } = editors;
        const formattedOutput = `
            ${html.value}
            <style>${css.value}</style>
            <script>${js.value}</script>
        `;

        outputFrame.contentDocument.body.innerHTML = formattedOutput;
        try {
            outputFrame.contentWindow.eval(js.value);
        } catch (e) {
            console.error("Error in JS code:", e);
        }
    }

    function handleEditorInput() {
        updateOutputVisibility();
        executeCode();
    }

   
    Object.values(editors).forEach(editor => {
        editor.addEventListener('input', handleEditorInput);
        editor.addEventListener("keyup", executeCode);
    });


    updateOutputVisibility();
});
