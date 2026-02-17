/**
 * Validates a form against a Zod schema and displays errors.
 * @param {HTMLFormElement} formElement - The form to validate.
 * @param {ZodSchema} schema - The Zod schema to validate against.
 * @returns {Promise<boolean>} - True if valid, false otherwise.
 */
export async function validateForm(formElement, schema) {
  // 1. Clear previous errors
  clearErrors(formElement);

  // 2. Extracts data from form
  // Create an object from FormData, handling multiple values if needed (though simplistic for now)
  const formData = new FormData(formElement);
  const data = Object.fromEntries(formData.entries());

  try {
    // 3. Parse with Zod
    // Using parseAsync in case schema has async refinements
    await schema.parseAsync(data);
    return true;

  } catch (error) {
    // 4. Handle Zod Errors
    if (error.issues) {
      error.issues.forEach(issue => {
        const fieldName = issue.path[0];
        const errorMessage = issue.message;
        showError(formElement, fieldName, errorMessage);
      });
    } else {
      console.error("Unexpected validation error:", error);
    }
    return false;
  }
}

/**
 * Displays an error message for a specific field.
 * Expects the input to be inside a .form-group or .field container, 
 * or finding the input by name and appending a sibling.
 */
function showError(form, fieldName, message) {
  const input = form.querySelector(`[name="${fieldName}"]`);
  if (!input) return;

  // Add error class to input
  input.classList.add('error-border'); // Ensure we have CSS for this

  // Find or create error message container
  // Try to find a sibling .error-message first
  let errorContainer = input.parentElement.querySelector('.error-message');

  if (!errorContainer) {
    errorContainer = document.createElement('div');
    errorContainer.className = 'error-message';
    errorContainer.style.color = '#dc3545'; // Bootstrap red
    errorContainer.style.fontSize = '0.875rem';
    errorContainer.style.marginTop = '4px';
    input.parentElement.appendChild(errorContainer);
  }

  errorContainer.textContent = message;
}

/**
 * Clears all error messages and styles from the form.
 */
function clearErrors(form) {
  // Remove error text
  const errorMessages = form.querySelectorAll('.error-message');
  errorMessages.forEach(el => el.remove());

  // Remove error border styles
  const errorInputs = form.querySelectorAll('.error-border');
  errorInputs.forEach(el => el.classList.remove('error-border'));
}