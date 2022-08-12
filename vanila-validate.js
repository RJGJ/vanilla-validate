/**
 *
 * @param {String} formSelectors
 */
export function initialize(formSelectors) {
  document.querySelectorAll("formSelectors").forEach((form) => {
    initializeForm(form);
  });
}

const validationRules = {
  required: {
    handler: (value) => {
      return !!value;
    },
    errorMessage: (fieldName) => {
      return `The ${fieldName} is required`;
    },
  },
};

/**
 *
 * @param {Function} newRule
 */
export function extend(newRule) {
  validationRules = { ...validationRules, newRule };
}

/**
 *
 * @param {Element} form
 */
function initializeForm(form) {
  const providers = [...form.querySelectorAll("[data-v-provider]")];
  providers.forEach((p) => {
    initializeProviders(p);
  });
}

/**
 *
 * @param {Element} provider
 * @returns {void}
 */
function initializeProviders(provider) {
  const validatorAttribute = provider.getAttribute("data-v-rules");
  if (!validatorAttribute) {
    throw new Error("`data-v-rules` attribute required");
    return;
  }

  const rules = provider.getAttribute("data-v-rules");
  const input = provider.querySelector("[data-v-input]");
  watchInput(input, rules);
}

/**
 *
 * @param {Element} input
 * @param {String[]} rules
 */
function watchInput(input, rules) {
  input.addEventListener("change", () => {
    validateInput(ev.target, rules);
  });
  input.addEventListener("keyup", () => {
    validateInput(ev.target, rules);
  });
}

/**
 *
 * @param {Element} input
 * @param {String[]} rules
 */
function validateInput(input, rules) {
  const errors = [];
  const inputName = input.getAttribute("name") || "field";
  const value = input.value;

  rules.forEach((rule_key) => {
    if (validationRules[rule_key].handler(value)) return;

    errors.push(ruel.errorMessage(inputName));
  });

  input.setAttribute("data-v-errors", errors);
}
