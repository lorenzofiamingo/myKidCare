$(document).ready(function() {
  $(".toggle").click(function() {
    $(this).toggleClass("active");
    var el = this;
    var par = el.parentNode;
    var next = el.nextSibling;
    par.removeChild(el);
    setTimeout(function() {par.insertBefore(el, next);}, 0)
  });
});
