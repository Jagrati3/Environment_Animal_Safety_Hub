/**
 * Trash Bin Match Game Logic
 */

document.addEventListener('DOMContentLoaded', () => {
    const items = document.querySelectorAll('.item');
    const bins = document.querySelectorAll('.bin');
    const scoreEl = document.getElementById('score');
    const message = document.getElementById("message");

    let score = 0;
    let draggedItem = null;
    let itemsLeft = items.length;

    // Initialize Items
    items.forEach(item => {
        item.addEventListener('dragstart', () => {
            draggedItem = item;
            item.classList.add('dragging');
        });

        item.addEventListener("dragend", () => {
            item.classList.remove("dragging");
            draggedItem = null;
        });
    });

    // Initialize Bins
    bins.forEach(bin => {
        bin.addEventListener("dragover", (e) => {
            e.preventDefault(); // Allow drop
        });

        bin.addEventListener("drop", () => {
            if (!draggedItem) return;

            const binType = bin.getAttribute('data-bin');
            const itemType = draggedItem.getAttribute('data-type');

            if (binType === itemType) {
                handleCorrectDrop(draggedItem);
            } else {
                handleWrongDrop();
            }
        });
    });

    function handleCorrectDrop(item) {
        score += 10;
        scoreEl.textContent = score;
        showMessage("✅ Correct!", true);

        // Remove item visually
        item.style.opacity = '0';
        item.style.pointerEvents = 'none';

        itemsLeft--;

        if (itemsLeft === 0) {
            endGame();
        }
    }

    function handleWrongDrop() {
        score = Math.max(0, score - 5);
        scoreEl.textContent = score;
        showMessage("❌ Wrong bin!", false);
    }

    function showMessage(text, success = true) {
        message.textContent = text;
        message.style.color = success ? "green" : "red";

        // Clear message after 2 seconds
        setTimeout(() => {
            message.textContent = "";
        }, 2000);
    }

    function endGame() {
        showMessage("🎉 You sorted everything!", true);

        // Save Progress
        if (window.UserProgress) {
            window.UserProgress.recordGame('trash-bin-match', score);
        }

        // Create a 'Play Again' button or visual cue if needed
        setTimeout(() => {
            alert(`Game Over! Final Score: ${score}`);
            // Optional: Reload to restart
            location.reload();
        }, 1000);
    }
});
