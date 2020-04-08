const hasMatchMedia = typeof window.matchMedia !== 'undefined';
/**
 * determine if device is touch-capable
 * true - device is touch-capable
 * false - device is not touch-capable
 * null - unable to determine touch capability
 * @return {null|boolean}
 */
const hasTouch = () => {
  if (hasMatchMedia) {
    return window.matchMedia('(hover: none)').matches;
  }
  return null;
};

/**
 * remove all CSS rules contaning both '.btn' and ':hover'
 * @return {number} count of rules deleted
 */
function removeBtnHovers() {

  let rulesDeleted = 0;

  // recursively delete '.btn:hover' rules
  function recursiveDelete(rules, styleSheet) {

    if (typeof rules === 'undefined' ||
      typeof rules.length === 'undefined' ||
      rules.length <= 0) {
      return;
    }

    // iterate in reverse order,
    // deleting any rule containing both '.btn' and ':hover'
    const ruleLen = rules.length;
    for (let i = ruleLen - 1; i >= 0; i--) {
      const rule = rules[i];
      if (typeof rule.cssRules === 'undefined') {
        // a standard rule, evaluate it
        const cssText = rule.cssText;
        if (typeof cssText === 'string' &&
          cssText.includes('.btn') &&
          cssText.includes(':hover')) {
          styleSheet.deleteRule(i);
          rulesDeleted++;
        }
      } else {
        // rule contains cssRules, iterate over them
        recursiveDelete(rule.cssRules, rule);
      }
    }
  }

  // iterate over all style sheets in document
  for (const styleSheet of document.styleSheets) {
    let rules = styleSheet.cssRules;
    if (!rules) {
      continue;
    }
    recursiveDelete(rules, styleSheet);
  }
  return rulesDeleted;
}
