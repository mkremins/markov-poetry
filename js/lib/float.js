var FloatLabel = (function () {
  function labelFor(input) {
    return document.querySelector('label[for="' + input.id + '"]');
  }

  function enable(input) {
    var label = labelFor(input);
    var labelText = label.textContent || label.innerText;

    input.setAttribute('placeholder', labelText);

    input.addEventListener('blur', function(ev) {
      label.classList.remove('active');
    });

    input.addEventListener('focus', function(ev) {
      label.classList.add('active');
    });

    input.addEventListener('input', function() {
      if (input.value === '') {
        label.classList.remove('visible');
      } else {
        label.classList.add('visible');
      }
    });
  }

  return {enable: enable};
})();
