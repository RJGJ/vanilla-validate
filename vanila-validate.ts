export interface ValidationRule {
  name: string;
  handler: Function;
  errorMessage: Function;
}

export function initialize(formSelectors: string) {
  document.querySelectorAll(formSelectors).forEach((form) => {
    initializeForm(form);
  });
}

let validationRules: ValidationRule[] = [
  {
    name: "required",
    handler: (value: string) => {
      return !!value;
    },
    errorMessage: (fieldName: string) => {
      return `The ${fieldName} is required`;
    },
  },
];

export function extend(newRule: ValidationRule) {
  validationRules = [...validationRules, newRule];
}

function initializeForm(form: Element) {
  const providers = [...form.querySelectorAll("[data-v-provider]")];
  providers.forEach((p) => {
    initializeProviders(p);
  });
}

function initializeProviders(provider: Element) {
  const validatorAttribute = provider.getAttribute("data-v-rules");
  if (!validatorAttribute) {
    throw new Error("`data-v-rules` attribute required");
    return;
  }

  const rules = provider.getAttribute("data-v-rules")?.split("|");
  const input = provider.querySelector("[data-v-input]");

  if (!rules) {
    throw new Error("proveder must have data-v-rules attribute");
  }
  if (!input) {
    throw new Error(
      "provider must have an input with data-v-input attribute child"
    );
  }

  watchInput(input, rules);
}

function watchInput(input: Element, rules: string[]) {
  input.addEventListener("change", (ev) => {
    validateInput(ev.target as HTMLInputElement, rules);
  });
  input.addEventListener("keyup", (ev) => {
    validateInput(ev.target as HTMLInputElement, rules);
  });
}

function validateInput(input: HTMLInputElement, rules: string[]) {
  const errors: string[] = [];
  const inputName = input.getAttribute("name") || "field";
  const value = input.value;

  rules.forEach((rule_key) => {
    const rule = validationRules.filter((r) => r.name === rule_key)[0];
    if (rule.handler(value)) return;

    errors.push(rule.errorMessage(inputName));
  });

  input.setAttribute("data-v-errors", JSON.stringify(errors));
}
