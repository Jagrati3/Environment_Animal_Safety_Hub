function initScrollToTop() {
    const scrollBtn = document.getElementById("scrollToTop");

    if (!scrollBtn) return;

    window.addEventListener("scroll", () => {
        if (window.scrollY > 300) {
            scrollBtn.classList.add("show");
        } else {
            scrollBtn.classList.remove("show");
        }
    });

    scrollBtn.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
}

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", initScrollToTop);
