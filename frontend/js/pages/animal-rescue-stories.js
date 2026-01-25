// Animal Rescue Stories JavaScript

// Story data for modal content
const storyData = {
  max: {
    title: "From Abandoned to Adored: Max's Incredible Journey",
    fullStory: `
      <div class="modal-story">
        <div class="story-hero">
          <img src="../assets/images/others/rescue-dog.jpg" alt="Max" onerror="this.src='../assets/images/others/placeholder.jpg'">
          <div class="story-overlay">
            <h1>Max</h1>
            <p>Golden Retriever Mix • Rescued March 2024</p>
          </div>
        </div>

        <div class="story-content">
          <h2>The Beginning</h2>
          <p>Max was found wandering the streets of downtown, severely emaciated and covered in fleas. His ribs were visible through his matted fur, and he was too weak to even wag his tail. Animal control officers estimated he hadn't eaten in days.</p>

          <h2>The Rescue</h2>
          <p>When Sarah first saw Max at the shelter, she noticed something special in his eyes despite his condition. "There was this quiet dignity about him," she recalls. "Even though he was terrified, he didn't growl or snap. He just looked at me with these soulful eyes that said 'please help me'."</p>

          <h2>The Recovery</h2>
          <p>The first few weeks were challenging. Max had severe anxiety and would hide under furniture for hours. But Sarah was patient. She worked with a professional trainer and slowly helped Max build confidence. Within two months, Max had gained 25 pounds of healthy weight and was beginning to trust humans again.</p>

          <h2>The Transformation</h2>
          <p>Today, Max is a certified therapy dog who visits hospitals and nursing homes weekly. He brings joy to over 50 patients each month, proving that every animal, no matter their past, deserves a second chance.</p>

          <div class="story-quote">
            <blockquote>"Max taught me that love and patience can heal even the deepest wounds. He's not just my dog – he's my partner in healing others."</blockquote>
            <cite>- Sarah, Max's adoptive mom</cite>
          </div>
        </div>
      </div>
    `,
    category: "dogs"
  },

  bella: {
    title: "Mother Cat's Unwavering Love",
    fullStory: `
      <div class="modal-story">
        <div class="story-hero">
          <img src="../assets/images/others/rescue-cat.jpg" alt="Bella" >
          <div class="story-overlay">
            <h1>Bella</h1>
            <p>Domestic Shorthair • Rescued January 2024</p>
          </div>
        </div>

        <div class="story-content">
          <h2>A Mother's Instinct</h2>
          <p>Bella was rescued from a hoarding situation along with her five kittens. Despite the trauma of being confined in a small space with dozens of other cats, Bella remained fiercely protective of her babies.</p>

          <h2>The Challenge</h2>
          <p>The shelter staff were amazed by Bella's dedication. Even during the stressful intake process, she never left her kittens' side. "She was like a lioness guarding her cubs," said shelter manager Lisa. "Her maternal instinct was incredible."</p>

          <h2>The Happy Ending</h2>
          <p>When a wonderful family came to adopt, they fell in love with the entire family. "We couldn't separate them," said the adoptive mom. "Bella had done such an amazing job raising her kittens that we knew they belonged together."</p>

          <div class="story-quote">
            <blockquote>"Bella showed me what unconditional love really means. She taught her kittens everything – from grooming to playing – and now they're all thriving in their forever home."</blockquote>
            <cite>- Maria, Bella's adoptive mom</cite>
          </div>
        </div>
      </div>
    `,
    category: "cats"
  },

  oliver: {
    title: "The Puppy Who Wouldn't Give Up",
    fullStory: `
      <div class="modal-story">
        <div class="story-hero">
          <img src="../assets/images/others/rescue-puppy.jpg" alt="Oliver" >
          <div class="story-overlay">
            <h1>Oliver</h1>
            <p>Labrador Mix • Rescued February 2024</p>
          </div>
        </div>

        <div class="story-content">
          <h2>Against All Odds</h2>
          <p>Oliver was found abandoned in a cardboard box during a severe snowstorm. He was only 8 weeks old, severely malnourished, and suffering from frostbite on his ears and paws. The veterinarian gave him a 50/50 chance of survival.</p>

          <h2>The Fight for Life</h2>
          <p>For three days, Oliver fought for his life in the animal hospital. Shelter volunteers took turns sitting with him, offering gentle touches and words of encouragement. "His little tail would wag weakly whenever we spoke to him," recalls volunteer coordinator Jennifer. "He had such spirit."</p>

          <h2>The Recovery</h2>
          <p>Against all odds, Oliver pulled through. After six weeks of intensive care and rehabilitation, he was ready for adoption. His new family describes him as "a bundle of energy and love" who brings joy to everyone he meets.</p>

          <div class="story-quote">
            <blockquote>"Oliver's determination to live inspired everyone at the shelter. He reminds us that even the smallest creatures have incredible strength and will to survive."</blockquote>
            <cite>- Dr. Martinez, Oliver's veterinarian</cite>
          </div>
        </div>
      </div>
    `,
    category: "dogs"
  },

  luna: {
    title: "Wings of Freedom Restored",
    fullStory: `
      <div class="modal-story">
        <div class="story-hero">
          <img src="../assets/images/others/rescue-owl.jpg" alt="Luna" >
          <div class="story-overlay">
            <h1>Luna</h1>
            <p>Great Horned Owl • Rescued April 2024</p>
          </div>
        </div>

        <div class="story-content">
          <h2>A Wing and a Prayer</h2>
          <p>Luna was brought to the wildlife rehabilitation center with a severely broken wing after being hit by a car. Her wing was shattered in three places, and the prognosis was grim. Wildlife rehabilitator Mark knew it would take months of intensive care.</p>

          <h2>The Rehabilitation Journey</h2>
          <p>For six months, Luna underwent daily physical therapy. Her wing was splinted and bandaged, and she received pain medication and anti-inflammatory drugs. Mark would spend hours each day gently exercising her wing to prevent muscle atrophy.</p>

          <h2>Freedom Restored</h2>
          <p>The day Luna was released back into the wild was emotional for everyone involved. She circled the release site three times, as if saying goodbye, before disappearing into the forest canopy. "Seeing her fly free again was the most rewarding moment of my career," Mark said.</p>

          <div class="story-quote">
            <blockquote>"Luna's recovery taught me about resilience and the incredible healing power of nature. She didn't just survive – she thrived and returned to her wild home stronger than before."</blockquote>
            <cite>- Mark, Wildlife Rehabilitator</cite>
          </div>
        </div>
      </div>
    `,
    category: "wildlife"
  },

  charlie: {
    title: "Senior Love Knows No Age",
    fullStory: `
      <div class="modal-story">
        <div class="story-hero">
          <img src="../assets/images/others/rescue-senior.jpg" alt="Charlie" >
          <div class="story-overlay">
            <h1>Charlie</h1>
            <p>Beagle Mix • Rescued December 2023</p>
          </div>
        </div>

        <div class="story-content">
          <h2>Twelve Years of Wisdom</h2>
          <p>Charlie was surrendered to the shelter by his previous family at age 12. They claimed he was "too old and had too many health issues." But Charlie had a different story to tell – one of loyalty, wisdom, and unconditional love.</p>

          <h2>The Waiting Game</h2>
          <p>Senior dogs often get overlooked in shelters, but Charlie's gentle nature and soulful eyes eventually caught the attention of retired teacher Margaret. "I wasn't looking for a dog," she admits. "But Charlie found me, and I'm so grateful he did."</p>

          <h2>A Perfect Match</h2>
          <p>Margaret and Charlie were made for each other. She provided him with the stability and love he craved, and he gave her companionship during her retirement. "Charlie taught me that it's never too late to find your perfect match," Margaret says.</p>

          <div class="story-quote">
            <blockquote>"Age is just a number. Charlie has more love and wisdom in his paw than most young dogs have in their entire body. He's my best friend and constant companion."</blockquote>
            <cite>- Margaret, Charlie's adoptive mom</cite>
          </div>
        </div>
      </div>
    `,
    category: "dogs"
  },

  ruby: {
    title: "From Race Track to Pasture Paradise",
    fullStory: `
      <div class="modal-story">
        <div class="story-hero">
          <img src="../assets/images/others/rescue-horse.jpg" alt="Ruby" >
          <div class="story-overlay">
            <h1>Ruby</h1>
            <p>Thoroughbred • Rescued June 2024</p>
          </div>
        </div>

        <div class="story-content">
          <h2>Racing's Hidden Cost</h2>
          <p>Ruby was a promising racehorse until a career-ending injury forced her retirement. Instead of the peaceful pasture life she deserved, she faced an uncertain future. That's when the equine rescue stepped in.</p>

          <h2>Healing from the Inside Out</h2>
          <p>Ruby arrived at the sanctuary with physical and emotional scars. Her legs were weak from years of intense training, and she was distrustful of humans. Sanctuary director Rachel worked patiently to gain her trust.</p>

          <h2>A New Beginning</h2>
          <p>Today, Ruby spends her days grazing in lush pastures, free from the pressures of competition. She enjoys daily grooming sessions and has formed close bonds with other rescued horses. "She's finally living the life she was meant to have," Rachel says.</p>

          <div class="story-quote">
            <blockquote>"Ruby's transformation from a high-performance athlete to a content pasture horse shows that every animal deserves a peaceful retirement. She's teaching us all about second chances."</blockquote>
            <cite>- Rachel, Sanctuary Director</cite>
          </div>
        </div>
      </div>
    `,
    category: "farm"
  },

  whiskers: {
    title: "The Kitten Who Conquered Fear",
    fullStory: `
      <div class="modal-story">
        <div class="story-hero">
          <img src="../assets/images/others/rescue-kitten.jpg" alt="Whiskers" >
          <div class="story-overlay">
            <h1>Whiskers</h1>
            <p>Tabby Kitten • Rescued May 2024</p>
          </div>
        </div>

        <div class="story-content">
          <h2>Found in Fear</h2>
          <p>Whiskers was discovered hiding under a dumpster, hissing and spitting at anyone who approached. He was only 6 weeks old but had already learned to fear humans. Shelter staff named him Whiskers because of his distinctive facial markings.</p>

          <h2>Building Trust</h2>
          <p>Volunteer coordinator Sarah spent extra time with Whiskers, sitting quietly near his cage and speaking softly. "He was so scared that even making eye contact was a breakthrough," she recalls. Slowly but surely, Whiskers began to respond to gentle voices and soft touches.</p>

          <h2>From Fear to Love</h2>
          <p>Today, Whiskers is a confident, affectionate cat who has become the shelter's unofficial "greeter." He helps other frightened cats adjust to shelter life by showing them that humans can be kind. "He's living proof that patience and love can overcome even the deepest fears," Sarah says.</p>

          <div class="story-quote">
            <blockquote>"Whiskers went from being terrified of his own shadow to helping other cats feel safe. His journey reminds us that every animal has the capacity for love if given the chance."</blockquote>
            <cite>- Sarah, Shelter Volunteer</cite>
          </div>
        </div>
      </div>
    `,
    category: "cats"
  },

  shadow: {
    title: "Breaking the Black Dog Stereotype",
    fullStory: `
      <div class="modal-story">
        <div class="story-hero">
          <img src="../assets/images/others/rescue-black-dog.jpg" alt="Shadow" >
          <div class="story-overlay">
            <h1>Shadow</h1>
            <p>Black Labrador • Rescued July 2024</p>
          </div>
        </div>

        <div class="story-content">
          <h2>The Long Wait</h2>
          <p>Shadow waited 8 long months for adoption, a victim of "black dog syndrome" where darker-colored animals are often overlooked. Despite his friendly nature, loving personality, and perfect health, potential adopters would walk right past his kennel.</p>

          <h2>The Perfect Match</h2>
          <p>When the Johnson family walked into the shelter, they weren't looking for a specific breed or color. They were looking for a companion. "Shadow chose us," says mom Jennifer. "He came right up to us, wagging his tail and giving us those soulful eyes."</p>

          <h2>A Family Complete</h2>
          <p>Shadow has brought so much joy to the Johnson family. He goes on daily walks with the kids, cuddles on the couch during movie nights, and has even learned to play fetch. "Color doesn't matter," Jennifer says. "Love does."</p>

          <div class="story-quote">
            <blockquote>"Shadow proved that sometimes the best things in life are right in front of us, even if we have to look a little harder to see them. He's the perfect addition to our family."</blockquote>
            <cite>- Jennifer, Shadow's adoptive mom</cite>
          </div>
        </div>
      </div>
    `,
    category: "dogs"
  },

  mango: {
    title: "From Illegal Pet Trade to Sanctuary",
    fullStory: `
      <div class="modal-story">
        <div class="story-hero">
          <img src="../assets/images/others/rescue-monkey.jpg" alt="Mango" >
          <div class="story-overlay">
            <h1>Mango</h1>
            <p>Capuchin Monkey • Rescued August 2024</p>
          </div>
        </div>

        <div class="story-content">
          <h2>Stolen from the Wild</h2>
          <p>Mango was confiscated from illegal wildlife traders who had captured him from the rainforest as a baby. He had been kept in a small cage, deprived of social interaction with other monkeys, and was suffering from severe psychological trauma.</p>

          <h2>Sanctuary Life</h2>
          <p>At the primate sanctuary, Mango was introduced to a troop of other capuchin monkeys. Though initially fearful, he gradually learned to trust his own kind. Sanctuary staff provided enrichment activities, puzzle feeders, and plenty of space to climb and explore.</p>

          <h2>Healing and Hope</h2>
          <p>While Mango can never be released back into the wild due to his human imprinting, he now lives a life of dignity and purpose. He helps educate visitors about the dangers of the illegal wildlife trade and shows them the incredible intelligence and emotional capacity of primates.</p>

          <div class="story-quote">
            <blockquote>"Mango's story is a powerful reminder of the devastating impact of the illegal wildlife trade. But it also shows that with proper care and rehabilitation, these animals can still live meaningful lives."</blockquote>
            <cite>- Dr. Elena, Primate Sanctuary Director</cite>
          </div>
        </div>
      </div>
    `,
    category: "wildlife"
  }
};

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
  // Add animation delays to story cards
  const storyCards = document.querySelectorAll('.story-card');
  storyCards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.1}s`;
  });

  // Initialize modal close functionality
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      closeStoryModal();
    }
  });

  // Close modal when clicking outside
  document.getElementById('story-modal').addEventListener('click', function(e) {
    if (e.target === this) {
      closeStoryModal();
    }
  });
});

// Filter stories by category
function filterStories(category) {
  const storyCards = document.querySelectorAll('.story-card');
  const categoryBtns = document.querySelectorAll('.category-btn');

  // Update active button
  categoryBtns.forEach(btn => btn.classList.remove('active'));
  event.target.classList.add('active');

  // Filter stories
  storyCards.forEach(card => {
    if (category === 'all' || card.dataset.category === category) {
      card.style.display = 'block';
      card.style.animation = 'fadeInUp 0.6s ease forwards';
    } else {
      card.style.display = 'none';
    }
  });
}

// Open story modal
function openStoryModal(storyId) {
  const modal = document.getElementById('story-modal');
  const modalContent = document.getElementById('modal-content');

  if (storyData[storyId]) {
    modalContent.innerHTML = storyData[storyId].fullStory;
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
  }
}

// Close story modal
function closeStoryModal() {
  const modal = document.getElementById('story-modal');
  modal.style.display = 'none';
  document.body.style.overflow = 'auto';
}

// Submit user story
function submitStory(event) {
  event.preventDefault();

  const formData = {
    submitterName: document.getElementById('submitter-name').value,
    animalName: document.getElementById('animal-name-form').value,
    animalType: document.getElementById('animal-type-form').value,
    contactEmail: document.getElementById('contact-email').value,
    story: document.getElementById('story-text').value
  };

  // Here you would typically send this data to a server
  // For now, we'll just show a success message
  alert(`Thank you for sharing ${formData.animalName}'s story! We'll review it and may feature it on our site. You should receive a confirmation email at ${formData.contactEmail} within 24 hours.`);

  // Reset form
  document.getElementById('story-form').reset();
}

// Add smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Add loading animation for story cards
function animateStoryCards() {
  const storyCards = document.querySelectorAll('.story-card');
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

  storyCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
  });
}

// Initialize animations when page loads
document.addEventListener('DOMContentLoaded', function() {
  animateStoryCards();
});

// Add CSS for modal story styling
const modalStyles = `
  .modal-story {
    max-width: 100%;
  }

  .story-hero {
    position: relative;
    margin: -40px -40px 30px -40px;
    border-radius: 12px 12px 0 0;
    overflow: hidden;
  }

  .story-hero img {
    width: 100%;
    height: 300px;
    object-fit: cover;
  }

  .story-overlay {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background: linear-gradient(transparent, rgba(0,0,0,0.8));
    padding: 40px 30px 20px;
    color: white;
  }

  .story-overlay h1 {
    font-size: 2.5rem;
    margin-bottom: 5px;
    text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
  }

  .story-overlay p {
    font-size: 1.1rem;
    opacity: 0.9;
  }

  .story-content h2 {
    color: #2c3e50;
    font-size: 1.6rem;
    margin: 30px 0 15px 0;
    border-bottom: 2px solid #3498db;
    padding-bottom: 10px;
  }

  .story-content p {
    line-height: 1.8;
    color: #555;
    margin-bottom: 20px;
  }

  .story-quote {
    background: #f8f9fa;
    padding: 25px;
    border-radius: 8px;
    margin: 30px 0;
    border-left: 4px solid #27ae60;
  }

  .story-quote blockquote {
    font-style: italic;
    font-size: 1.1rem;
    color: #2c3e50;
    margin-bottom: 15px;
    line-height: 1.6;
  }

  .story-quote cite {
    color: #27ae60;
    font-weight: 600;
    font-size: 0.95rem;
  }

  @media (max-width: 768px) {
    .story-hero {
      margin: -20px -20px 20px -20px;
    }

    .story-hero img {
      height: 200px;
    }

    .story-overlay {
      padding: 25px 20px 15px;
    }

    .story-overlay h1 {
      font-size: 2rem;
    }
  }
`;

// Add modal styles to document
const styleSheet = document.createElement('style');
styleSheet.textContent = modalStyles;
document.head.appendChild(styleSheet);
