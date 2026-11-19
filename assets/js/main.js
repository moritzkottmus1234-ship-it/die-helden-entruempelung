(function () {
  var nav = document.getElementById('nav');
  var burger = document.querySelector('.burger');
  var menu = document.getElementById('menu');

  function onScroll() { nav.classList.toggle('solid', window.scrollY > 40 || menu.classList.contains('open')); }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  burger.addEventListener('click', function () {
    var open = menu.classList.toggle('open');
    burger.setAttribute('aria-expanded', open);
    burger.setAttribute('aria-label', open ? 'Menü schließen' : 'Menü öffnen');
    onScroll();
  });
  menu.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', function () {
      menu.classList.remove('open');
      burger.setAttribute('aria-expanded', 'false');
      onScroll();
    });
  });

  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    document.querySelectorAll('.reveal').forEach(function (el) { io.observe(el); });
  } else {
    document.querySelectorAll('.reveal').forEach(function (el) { el.classList.add('in'); });
  }

  // Demo-Formular: sendet nichts, zeigt nur eine Bestätigung.
  var form = document.getElementById('form');
  form.addEventListener('submit', function (ev) {
    ev.preventDefault();
    var ok = true;
    ['name', 'tel'].forEach(function (n) {
      var f = form[n]; var bad = !f.value.trim();
      f.classList.toggle('err', bad); if (bad) ok = false;
    });
    if (!ok) return;
    document.getElementById('ok').hidden = false;
    form.querySelector('button').disabled = true;
  });
})();
