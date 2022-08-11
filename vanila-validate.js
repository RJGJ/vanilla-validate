export function initialize(formSelectors) {
  document.querySelectorAll('formSelectors').forEach(form => {
    initializeForm(form)
  })
}

export validationRules {
  required: {
    handler: (value) => {
      return !!value
    },
    errorMessage: (fieldName) => {
      return `The ${fieldName} is required`
    }
  }
}

export function extend(newRule) {
  validationRules = { ...validationRules, newRule }
}

function initializeForm(form) {

  const providers = [...forms.querySelectorAll('[data-v-provider]')]
  providers.forEach(p => {
    initializeProviders(p)
  })
}

function initializeProviders(provider) {
  const validatorAttribute = provider.getAttribute('data-v-rules')
  if (!validatorAttribute) {
    throw new Error('`data-v-rules` attribute required')
    return
  }

  const rules = provider.getAttribute('data-v-rules')
  const input = provider.querySelector('[data-v-input]')
  watchInput(input, rules)
}

function watchInput(input, rules) {
  input.addEventListener('change', () => {
    validateInput(ev.target, rules)
  })
  input.addEventListener('keyup', () => {
    validateInput(ev.target, rules)
  })
}

function validateInput(input, rules) {
  const errors = []
  const inputName = input.getAttribute('name') || 'field'
  const value = input.value

  rules.forEach(rule => {
    if (rule.handler(value)) return

    errors.push(ruel.errorMessage(inputName))
  })

  element.setAttribute('data-v-errors', errors)
}
