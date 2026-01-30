    // Load navbar and footer
    fetch('../components/navbar.html')
      .then(r => r.text())
      .then(html => {
        document.getElementById('navbar-container').innerHTML = html;
      });
    
    fetch('../components/footer.html')
      .then(r => r.text())
      .then(html => {
        document.getElementById('footer-container').innerHTML = html;
      });

    // Download functionality
    function downloadResource(filename) {
      alert(`Downloading ${filename}... This resource contains valuable information about helping animals with psychological trauma.`);
      // In real implementation: window.open(`/downloads/${filename}`, '_blank');
    }

    // Add interactive elements
    document.addEventListener('DOMContentLoaded', function() {
      // Add click animations to cards
      const cards = document.querySelectorAll('.trauma-card, .stat-card, .case-study');
      cards.forEach(card => {
        card.addEventListener('click', function() {
          this.style.transform = 'scale(0.98)';
          setTimeout(() => {
            this.style.transform = '';
          }, 150);
        });
      });

      // Add scroll animation
      const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      };

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
          }
        });
      }, observerOptions);

      // Observe all cards and sections
      document.querySelectorAll('.trauma-card, .stat-card, .case-study, .healing-card, .action-step, .resource-card')
        .forEach(el => {
          el.style.opacity = '0';
          el.style.transform = 'translateY(20px)';
          el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
          observer.observe(el);
        });
    });