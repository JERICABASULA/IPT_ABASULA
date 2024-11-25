document.addEventListener("DOMContentLoaded", () => {
    const textElement = document.querySelector(".intro h1 span"); // Target the span
    const text = "Jayrald B. Bonucan"; // Text to display
    const typingSpeed = 150; // Speed of typing (ms)
    const deletingSpeed = 100; // Speed of deleting (ms)
    const pauseAfterTyping = 1000; // Pause after the full text is typed (ms)
    const showCursor = true; // Whether to show a blinking cursor
    const loop = true; // Whether to loop the animation

    let index = 0; // Current position in the text
    let isDeleting = false; // Whether the animation is in delete mode

    if (showCursor) {
        // Add a blinking cursor effect by appending a span
        const cursorElement = document.createElement("span");
        cursorElement.classList.add("typing-cursor");
        cursorElement.textContent = "|"; // The cursor symbol
        textElement.parentNode.appendChild(cursorElement);

        // Add cursor blinking animation via CSS
        const cursorStyles = document.createElement("style");
        cursorStyles.innerHTML = `
            .typing-cursor {
                display: inline-block;
                animation: blink 0.7s infinite;
            }
            @keyframes blink {
                0%, 100% { opacity: 1; }
                50% { opacity: 0; }
            }
        `;
        document.head.appendChild(cursorStyles);
    }

    function typeText() {
        if (!isDeleting) {
            // Typing mode
            if (index < text.length) {
                textElement.textContent += text[index]; // Add the next character
                index++;
                setTimeout(typeText, typingSpeed);
            } else {
                // Full text typed, pause before deleting
                if (loop) {
                    setTimeout(() => {
                        isDeleting = true;
                        typeText();
                    }, pauseAfterTyping);
                }
            }
        } else {
            // Deleting mode
            if (index > 0) {
                textElement.textContent = text.slice(0, index - 1); // Remove last character
                index--;
                setTimeout(typeText, deletingSpeed);
            } else {
                // Deletion complete, restart typing if loop is enabled
                isDeleting = false;
                if (loop) typeText();
            }
        }
    }

    // Start the animation
    textElement.textContent = ""; // Clear any pre-existing text
    typeText();
});
