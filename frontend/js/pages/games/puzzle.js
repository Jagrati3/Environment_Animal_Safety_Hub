/**
 * Environmental Jigsaw Puzzle Game
 *
 * An interactive puzzle game where players reconstruct environmental images
 * by dragging and dropping puzzle pieces into the correct grid positions.
 * Features multiple environmental themes and smooth drag-and-drop mechanics.
 *
 * Game Mechanics:
 * - Random environmental image selection from curated collection
 * - 3x3 grid puzzle pieces generated from source image
 * - Drag-and-drop interface for piece placement
 * - Visual feedback with sound effects
 * - Completion detection and victory celebration
 * - Game controls: New Board, Reset, Back navigation
 *
 * Educational Value:
 * - Environmental awareness through themed imagery
 * - Fine motor skills development through drag-and-drop
 * - Spatial reasoning and pattern recognition
 * - Patience and problem-solving skills
 *
 * Technical Features:
 * - Canvas-based image processing for piece generation
 * - HTML5 Drag and Drop API implementation
 * - Audio feedback system
 * - Responsive grid layout
 * - AOS (Animate On Scroll) integration
 *
 * @author Environment Animal Safety Hub Team
 * @version 1.0.0
 * @since 2024
 */

// ===== GAME CONFIGURATION =====
/**
 * Core game configuration constants
 * @typedef {Object} PuzzleConfig
 * @property {number} gridSize - Number of rows/columns in puzzle grid (3x3)
 * @property {number} pieceSize - Size of each puzzle piece in pixels (120px)
 * @property {number} canvasSize - Total canvas dimensions (360px)
 */
const gridSize = 3; // 3x3 puzzle grid
const pieceSize = 120; // Each piece is 120x120 pixels
const canvasSize = gridSize * pieceSize; // 360x360 canvas

// ===== ENVIRONMENTAL IMAGE COLLECTION =====
/**
 * Curated collection of environmental images for puzzle generation
 * Features diverse ecosystems and wildlife conservation themes
 * @type {string[]}
 */
const images = [
  "../../assets/images/puzzle/puzzle1.webp",   // Forest ecosystem
  "../../assets/images/puzzle/puzzle2.webp",   // Ocean wildlife
  "../../assets/images/puzzle/puzzle3.webp",  // Mountain landscape
  "../../assets/images/puzzle/puzzle4.webp",   // Desert conservation
  "../../assets/images/puzzle/puzzle5.webp",   // Wetland birds
  "../../assets/images/puzzle/puzzle6.webp",  // Rainforest canopy
  "../../assets/images/puzzle/puzzle7.webp",  // Arctic wildlife
  "../../assets/images/puzzle/puzzle8.webp",  // Coral reef
  "../../assets/images/puzzle/puzzle9.webp",  // Grassland savanna
  "../../assets/images/puzzle/puzzle10.webp"   // River ecosystem
];

// ===== DOM ELEMENT REFERENCES =====
/**
 * All interactive DOM elements organized by functionality
 */
const originalCanvas = document.getElementById("original-canvas");
const puzzleGrid = document.getElementById("puzzle-grid");
const piecesContainer = document.getElementById("pieces-container");
const newBoardBtn = document.getElementById("new-board-btn");
const resetBtn = document.getElementById("reset-btn");
const backBtn = document.getElementById("back-btn");
const placeSound = document.getElementById("place-sound");
const successModal = document.getElementById("success-modal");
const modalBackBtn = document.getElementById("modal-back-btn");
const modalNewBtn = document.getElementById("modal-new-btn");

// ===== CANVAS AND GAME STATE =====
/**
 * Canvas rendering context for original image display
 * @type {CanvasRenderingContext2D}
 */
const ctx = originalCanvas.getContext("2d");

/**
 * Current puzzle image being used
 * @type {HTMLImageElement}
 */
let img = new Image();

/**
 * Array of puzzle piece canvas elements
 * @type {HTMLCanvasElement[]}
 */
let pieces = [];

/**
 * Array of grid slot elements for puzzle placement
 * @type {HTMLDivElement[]}
 */
let slots = [];

/**
 * Currently dragged puzzle piece reference
 * @type {HTMLCanvasElement|null}
 */
let draggedPiece = null;

// ===== IMAGE MANAGEMENT =====
/**
 * Load a random environmental image from the curated collection
 */
function loadRandomImage() {
  const randomIndex = Math.floor(Math.random() * images.length);
  img.src = images[randomIndex];
}

/**
 * Draw the original complete image on the reference canvas
 */
function drawOriginalImage() {
  ctx.clearRect(0, 0, canvasSize, canvasSize);
  ctx.drawImage(img, 0, 0, canvasSize, canvasSize);
}

// ===== PUZZLE PIECE GENERATION =====
/**
 * Generate puzzle pieces by dividing the source image into grid sections
 * Creates individual canvas elements for each piece with proper positioning
 */
function generateImagePieces() {
  pieces = [];

  // Create temporary canvas for image processing
  const tempCanvas = document.createElement("canvas");
  tempCanvas.width = canvasSize;
  tempCanvas.height = canvasSize;
  const tctx = tempCanvas.getContext("2d");

  // Draw source image to temporary canvas
  tctx.drawImage(img, 0, 0, canvasSize, canvasSize);

  // Generate pieces for each grid position
  for (let row = 0; row < gridSize; row++) {
    for (let col = 0; col < gridSize; col++) {
      // Create individual piece canvas
      const piece = document.createElement("canvas");
      piece.width = pieceSize;
      piece.height = pieceSize;

      // Draw piece section from temporary canvas
      const pieceCtx = piece.getContext("2d");
      pieceCtx.drawImage(
        tempCanvas,
        col * pieceSize, row * pieceSize,  // Source position
        pieceSize, pieceSize,              // Source dimensions
        0, 0,                             // Destination position
        pieceSize, pieceSize              // Destination dimensions
      );

      // Configure piece properties
      piece.className = "piece";
      piece.draggable = true;
      piece.dataset.row = row;
      piece.dataset.col = col;

      // Add drag event listener
      piece.addEventListener("dragstart", () => draggedPiece = piece);

      pieces.push(piece);
    }
  }
}

// ===== GRID MANAGEMENT =====
/**
 * Initialize the puzzle grid with empty slots for piece placement
 * Creates drop zones and sets up drag-and-drop event handlers
 */
function initGrid() {
  puzzleGrid.innerHTML = "";
  slots = [];

  // Create grid slots
  for (let i = 0; i < gridSize * gridSize; i++) {
    const slot = document.createElement("div");
    slot.classList.add("grid-slot");
    slot.dataset.index = i;

    // Set up drop zone event handlers
    slot.addEventListener("dragover", e => e.preventDefault());
    slot.addEventListener("drop", dropPiece);

    slots.push(slot);
    puzzleGrid.appendChild(slot);
  }
}

// ===== PIECE PLACEMENT =====
/**
 * Randomly place puzzle pieces in the pieces container for player selection
 */
function placePieces() {
  piecesContainer.innerHTML = "";
  shuffle(pieces).forEach(piece => piecesContainer.appendChild(piece));
}

/**
 * Handle piece drop event on grid slots
 * Validates drop location and triggers completion check
 * @param {DragEvent} e - The drop event
 */
function dropPiece(e) {
  e.preventDefault();
  const slot = e.currentTarget;

  // Only allow drop if slot is empty
  if (slot.children.length === 0) {
    slot.appendChild(draggedPiece);
    placeSound.play();
    checkCompletion();
  }
}

// ===== GAME LOGIC =====
/**
 * Check if the puzzle has been completed correctly
 * Validates that all pieces are in their correct grid positions
 */
function checkCompletion() {
  let correct = true;

  // Check each slot for correct piece placement
  slots.forEach((slot, i) => {
    if (slot.children[0]) {
      const piece = slot.children[0];
      const row = Math.floor(i / gridSize);
      const col = i % gridSize;

      // Verify piece position matches grid coordinates
      if (piece.dataset.row != row || piece.dataset.col != col) {
        correct = false;
      }
    } else {
      // Empty slot means incomplete puzzle
      correct = false;
    }
  });

  // Show success modal if puzzle is complete
  if (correct) {
    successModal.style.display = "flex";
  }
}

/**
 * Shuffle array elements using Fisher-Yates algorithm
 * @param {Array} array - Array to shuffle
 * @returns {Array} Shuffled array
 */
function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

// ===== GAME INITIALIZATION =====
/**
 * Initialize or reinitialize the puzzle game
 * @param {boolean} newImage - Whether to load a new random image
 */
function initPuzzle(newImage = false) {
  if (newImage) {
    loadRandomImage();
  }

  // Set up image load handler
  img.onload = () => {
    drawOriginalImage();
    generateImagePieces();
    initGrid();
    placePieces();
  };
}

// ===== EVENT HANDLERS =====
/**
 * Set up all game control event handlers
 */

// New Board button - Start fresh puzzle with new image
newBoardBtn.onclick = () => {
  successModal.style.display = "none";
  initPuzzle(true);
};

// Reset button - Clear grid and reshuffle pieces
resetBtn.onclick = () => {
  slots.forEach(slot => {
    if (slot.firstChild) {
      slot.removeChild(slot.firstChild);
    }
  });
  placePieces();
};

// Back button - Navigate to previous page
backBtn.onclick = () => history.back();

// Modal Back button - Close modal and go back
modalBackBtn.onclick = () => {
  successModal.style.display = "none";
  history.back();
};

// Modal New button - Close modal and start new puzzle
modalNewBtn.onclick = () => {
  successModal.style.display = "none";
  initPuzzle(true);
};

// ===== GAME STARTUP =====
/**
 * Initialize the puzzle game on page load
 */
initPuzzle(true);

// ===== ANIMATION INITIALIZATION =====
/**
 * Initialize AOS (Animate On Scroll) library for smooth animations
 */
AOS.init({ duration: 800 });