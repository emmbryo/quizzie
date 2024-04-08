document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM loaded with JavaScript');
  document.getElementById('size').addEventListener('input', function(e) {
    console.log('input changed');
    document.getElementById('sizeValue').innerText = e.target.value;
  });
});