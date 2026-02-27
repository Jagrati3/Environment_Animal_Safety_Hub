// Wildlife Sighting Explorer JS
// Handles logging, listing, and mapping wildlife sightings

let sightings = [];

document.addEventListener('DOMContentLoaded', function() {
    /**
     * Wildlife Sighting Explorer - Robust DOM Checks, Logging, Fallback UI, Modular Structure
     * Author: Ayaanshaikh12243
     * Date: 2026-02-27
     *
     * This file implements defensive programming, detailed logging, fallback UI, and modular structure
     * for maintainability and extensibility. Extension hooks are provided for future features.
     */

    // --- Utility Functions ---

    /**
     * Log messages with timestamp and type
     * @param {string} msg
     * @param {'info'|'warn'|'error'} type
     */
    function log(msg, type = 'info') {
      const ts = new Date().toISOString();
      switch(type) {
        case 'warn':
          console.warn(`[WARN ${ts}] ${msg}`);
          break;
        case 'error':
          console.error(`[ERROR ${ts}] ${msg}`);
          break;
        default:
          console.log(`[INFO ${ts}] ${msg}`);
      }
    }

    /**
     * Create a fallback UI for missing elements
     * @param {string} id
     * @param {string} message
     */
    function createFallbackUI(id, message) {
      const fallback = document.createElement('div');
      fallback.className = 'fallback-ui';
      fallback.style.background = '#ffe0e0';
      fallback.style.color = '#b71c1c';
      fallback.style.padding = '1rem';
      fallback.style.margin = '1rem';
      fallback.style.borderRadius = '8px';
      fallback.style.fontWeight = 'bold';
      fallback.textContent = `Missing element #${id}: ${message}`;
      document.body.appendChild(fallback);
      log(`Fallback UI created for #${id}`, 'warn');
    }

    /**
     * Validate element presence and type
     * @param {string} id
     * @param {string} type
     * @returns {HTMLElement|null}
     */
    function validateElement(id, type = 'any') {
      const el = document.getElementById(id);
      if (!el) {
        createFallbackUI(id, 'Element not found in DOM.');
        log(`Element #${id} missing.`, 'error');
        return null;
      }
      if (type !== 'any' && !(el instanceof window[type])) {
        createFallbackUI(id, `Element is not of type ${type}.`);
        log(`Element #${id} is not of type ${type}.`, 'error');
        return null;
      }
      log(`Element #${id} validated.`, 'info');
      return el;
    }

    /**
     * Dynamically create missing elements for demo purposes
     * @param {string} id
     * @param {string} tag
     * @param {string} placeholder
     */
    function createDemoElement(id, tag = 'div', placeholder = '') {
      const el = document.createElement(tag);
      el.id = id;
      el.textContent = placeholder;
      el.style.background = '#f5f5f5';
      el.style.margin = '1rem';
      el.style.padding = '1rem';
      el.style.borderRadius = '8px';
      document.body.appendChild(el);
      log(`Demo element #${id} created.`, 'info');
      return el;
    }

    // --- Robust Element Selection ---

    const sightingForm = validateElement('sightingForm', 'HTMLFormElement') || createDemoElement('sightingForm', 'form', 'Demo Sighting Form');
    const speciesName = validateElement('speciesName', 'HTMLInputElement') || createDemoElement('speciesName', 'input', 'Demo Species Name');
    const locationInput = validateElement('location', 'HTMLInputElement') || createDemoElement('location', 'input', 'Demo Location');
    const sightingTime = validateElement('sightingTime', 'HTMLInputElement') || createDemoElement('sightingTime', 'input', 'Demo Time');
    const sightingList = validateElement('sightingList') || createDemoElement('sightingList', 'div', 'Demo Sighting List');
    const mapArea = validateElement('mapArea') || createDemoElement('mapArea', 'div', 'Demo Map Area');

    // --- Defensive Initialization ---

    if (!sightingForm || !speciesName || !locationInput || !sightingTime || !sightingList || !mapArea) {
      log('Initialization aborted due to missing elements.', 'error');
      return;
    }

    // --- Extension Hooks ---

    /**
     * Hook for custom validation logic
     * @param {HTMLElement} el
     * @param {string} id
     */
    function customValidationHook(el, id) {
      // Example: Add custom validation or analytics
      log(`Custom validation hook for #${id}`, 'info');
      // Future: Integrate with analytics or accessibility tools
    }

    [sightingForm, speciesName, locationInput, sightingTime, sightingList, mapArea].forEach((el, idx) => {
      customValidationHook(el, el.id);
    });

    // --- Fallback UI for All Elements ---

    function showFallbackUI() {
      [sightingForm, speciesName, locationInput, sightingTime, sightingList, mapArea].forEach(el => {
        if (!el) createFallbackUI(el.id, 'Missing element.');
      });
    }

    // --- Example Modular Structure ---

    /**
     * WildlifeSightingModule - Encapsulates all logic for sightings
     */
    const WildlifeSightingModule = (function() {
      let sightings = [];

      /**
       * Add a sighting
       * @param {string} species
       * @param {string} location
       * @param {string} time
       */
      function addSighting(species, location, time) {
        sightings.push({ species, location, time });
        log(`Sighting added: ${species}, ${location}, ${time}`, 'info');
        renderSightings();
      }

      /**
       * Render sightings list
       */
      function renderSightings() {
        sightingList.innerHTML = '';
        sightings.slice(-10).reverse().forEach(s => {
          const row = document.createElement('div');
          row.className = 'sighting-row';
          row.innerHTML = `<strong>${s.species}</strong><span>Location: ${s.location}</span><span>Time: ${s.time}</span>`;
          sightingList.appendChild(row);
        });
        renderMap();
      }

      /**
       * Render map with Leaflet and geocoded markers
       */
      async function renderMap() {
        mapArea.innerHTML = '';
        const mapDiv = document.createElement('div');
        mapDiv.id = 'leafletMap';
        mapDiv.style.height = '400px';
        mapArea.appendChild(mapDiv);

        // Default center
        const map = L.map('leafletMap').setView([51.505, -0.09], 2);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '© OpenStreetMap contributors'
        }).addTo(map);

        // Geocode all sightings and add markers
        const markerPromises = sightings.map(async s => {
          const coords = await geocodeLocation(s.location);
          if (coords) {
            return L.marker([coords.lat, coords.lng]).addTo(map)
              .bindPopup(`<strong>${s.species}</strong><br>Location: ${s.location}<br>Time: ${s.time}`);
          }
          return null;
        });
        const markers = (await Promise.all(markerPromises)).filter(m => m);

        // Auto-fit map to markers
        if (markers.length > 0) {
          const group = L.featureGroup(markers);
          map.fitBounds(group.getBounds().pad(0.2));
        }
        else {
          map.setView([51.505, -0.09], 2);
          mapArea.insertAdjacentHTML('beforeend', '<div style="color:#888;margin-top:10px">No valid locations found for sightings.</div>');
        }
      }

      /**
       * Helper: Geocode location to lat/lng using OpenStreetMap Nominatim
       * @param {string} location
       * @returns {Promise<{lat:number,lng:number}|null>}
       */
      async function geocodeLocation(location) {
        const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(location)}`;
        try {
          const response = await fetch(url);
          const data = await response.json();
          if (data && data.length > 0) {
            return { lat: parseFloat(data[0].lat), lng: parseFloat(data[0].lon) };
          }
        } catch (e) {
          log(`Geocoding failed for location: ${location}`, 'warn');
        }
        return null;
      }

      /**
       * Expose module API
       */
      return {
        addSighting,
        renderSightings,
        renderMap,
        geocodeLocation,
        getSightings: () => sightings.slice(),
      };
    })();

    // --- Form Submission Handler ---

    sightingForm.onsubmit = function(e) {
      e.preventDefault();
      const species = speciesName.value.trim();
      const location = locationInput.value.trim();
      const time = sightingTime.value;
      if (!species || !location || !time) {
        log('Form submission failed: missing fields.', 'warn');
        createFallbackUI('sightingForm', 'Please fill all fields.');
        return;
      }
      WildlifeSightingModule.addSighting(species, location, time);
      sightingForm.reset();
    };

    // --- Initial Render ---

    WildlifeSightingModule.renderSightings();

    // --- Example Extension: Accessibility ---

    function addAccessibilityFeatures() {
      [sightingForm, speciesName, locationInput, sightingTime].forEach(el => {
        if (el) {
          el.setAttribute('aria-label', `Wildlife Sighting ${el.id}`);
          log(`Accessibility label added to #${el.id}`, 'info');
        }
      });
    }
    addAccessibilityFeatures();

    // --- Example Extension: Analytics ---

    function sendAnalyticsEvent(event, details) {
      log(`Analytics event: ${event} - ${JSON.stringify(details)}`, 'info');
      // Future: Integrate with analytics platform
    }

    sightingForm.addEventListener('submit', function() {
      sendAnalyticsEvent('sighting_submitted', {
        species: speciesName.value,
        location: locationInput.value,
        time: sightingTime.value
      });
    });

    // --- Example Extension: Dynamic UI ---

    function addDynamicUI() {
      // Add a button to clear all sightings
      const clearBtn = document.createElement('button');
      clearBtn.textContent = 'Clear All Sightings';
      clearBtn.className = 'action-btn danger';
      clearBtn.style.margin = '1rem';
      clearBtn.onclick = function() {
        if (confirm('Are you sure you want to clear all sightings?')) {
          WildlifeSightingModule.getSightings().length = 0;
          WildlifeSightingModule.renderSightings();
          log('All sightings cleared.', 'warn');
        }
      };
      sightingList.parentNode.insertBefore(clearBtn, sightingList);
      log('Dynamic UI button added.', 'info');
    }
    addDynamicUI();

    // --- Example Extension: Error Recovery ---

    window.addEventListener('error', function(e) {
      log(`Global error: ${e.message}`, 'error');
      createFallbackUI('global', `Unexpected error: ${e.message}`);
    });

    // --- Example Extension: Future Features ---

    // Placeholder for future modules (e.g., export sightings, import CSV, advanced filtering)
    // function exportSightings() {}
    // function importSightingsCSV() {}
    // function filterSightings(criteria) {}

    // --- Extensive Comments for Maintainability ---

    /**
     * End of Wildlife Sighting Explorer robust implementation.
     * This file is modular, extensible, and ready for future enhancements.
     * For questions, contact Ayaanshaikh12243.
     */
  // Robust element selection with error handling
  function getElement(id, required = true) {
    const el = document.getElementById(id);
    if (!el && required) {
      console.error(`Missing required element: #${id}`);
      const errorDiv = document.createElement('div');
      errorDiv.style.color = 'red';
      errorDiv.style.margin = '1rem';
      errorDiv.textContent = `Error: Required element #${id} not found.`;
      document.body.appendChild(errorDiv);
    }
    return el;
  }

  const sightingForm = getElement('sightingForm');
  const speciesName = getElement('speciesName');
  const locationInput = getElement('location');
  const sightingTime = getElement('sightingTime');
  const sightingList = getElement('sightingList');
  const mapArea = getElement('mapArea');

  // If any required element is missing, abort initialization
  if (!sightingForm || !speciesName || !locationInput || !sightingTime || !sightingList || !mapArea) {
    console.warn('Initialization aborted due to missing elements.');
    return;
  }

    // Render map with Leaflet
    function renderMap() {
    // Helper: Geocode location to lat/lng using OpenStreetMap Nominatim
    async function geocodeLocation(location) {
      const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(location)}`;
      try {
        const response = await fetch(url);
        const data = await response.json();
        if (data && data.length > 0) {
          return { lat: parseFloat(data[0].lat), lng: parseFloat(data[0].lon) };
        }
      } catch (e) {
        // Ignore errors
      }
      return null;
    }
      // Clear previous map
    // Render map with Leaflet and geocoded markers
    async function renderMap() {
      mapArea.innerHTML = '';
      const mapDiv = document.createElement('div');
      mapDiv.id = 'leafletMap';
      mapDiv.style.height = '400px';
      mapArea.appendChild(mapDiv);

      // Default center
      const map = L.map('leafletMap').setView([51.505, -0.09], 2);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(map);

      // Geocode all sightings and add markers
      const markerPromises = sightings.map(async s => {
        const coords = await geocodeLocation(s.location);
        if (coords) {
          return L.marker([coords.lat, coords.lng]).addTo(map)
            .bindPopup(`<strong>${s.species}</strong><br>Location: ${s.location}<br>Time: ${s.time}`);
        }
        return null;
      });
      const markers = (await Promise.all(markerPromises)).filter(m => m);

      // Auto-fit map to markers
      if (markers.length > 0) {
        const group = L.featureGroup(markers);
        map.fitBounds(group.getBounds().pad(0.2));
      }
      else {
        map.setView([51.505, -0.09], 2);
        mapArea.insertAdjacentHTML('beforeend', '<div style="color:#888;margin-top:10px">No valid locations found for sightings.</div>');
      }
    }
    sightingList.innerHTML = '';
    sightings.slice(-10).reverse().forEach(s => {
      sightingList.innerHTML += `<div class='sighting-row'><strong>${s.species}</strong><span>Location: ${s.location}</span><span>Time: ${s.time}</span></div>`;
    });
    renderMap();
  }

      renderMap(); // Now async
  sightingForm.onsubmit = function(e) {
    e.preventDefault();
    const species = speciesName.value.trim();
    const location = locationInput.value.trim();
    const time = sightingTime.value;
    if (!species || !location || !time) return;
    sightings.push({ species, location, time });
    renderSightings();
    sightingForm.reset();
  };

  // Initial render
  renderSightings();
});
