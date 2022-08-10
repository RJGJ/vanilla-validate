export function initialize() {
  //
}

export validationRules {
  required(value) {
    return !!value
  }
}

export function extend(newRule) {
  validationRules = { ...validationRules, newRule }
}