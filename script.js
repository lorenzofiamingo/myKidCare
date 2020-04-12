$(document).ready(function() {
  $(".toggle").click(function(e) {
    if (!$($(this).data("target")).hasClass("collapsing")) {
      $(this).toggleClass("active");
    } else {
      e.preventDefault()
    }
  });

  function hasTouch() {
    return 'ontouchstart' in document.documentElement ||
      navigator.maxTouchPoints > 0 ||
      navigator.msMaxTouchPoints > 0;
  }

  if (hasTouch()) { // remove all the :hover stylesheets
    try { // prevent exception on browsers not supporting DOM styleSheets properly
      for (var si in document.styleSheets) {
        var styleSheet = document.styleSheets[si];
        if (!styleSheet.rules) continue;

        for (var ri = styleSheet.rules.length - 1; ri >= 0; ri--) {
          if (!styleSheet.rules[ri].selectorText) continue;

          if (styleSheet.rules[ri].selectorText.match(':hover')) {
            styleSheet.deleteRule(ri);
          }
        }
      }
    } catch (ex) {}
  }

  $(function() {
    $(".slider-range").slider({
      range: true,
      min: 0,
      max: 100,
      values: [0, 100],
      step: 10,
      slide: function(event, ui) {
        $(".amount").val("€" + ui.values[0] + " - €" + ui.values[1]);
      }
    });
    $(".amount").val("$" + $(".slider-range").slider("values", 0) +
      " - $" + $(".slider-range").slider("values", 1));
  });
});
