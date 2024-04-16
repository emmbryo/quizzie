document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM loaded with JavaScript');
  if (document.getElementById('size')) {
    document.getElementById('size').addEventListener('input', function(e) {
      console.log('input changed');
      document.getElementById('sizeValue').innerText = e.target.value;
    });
  }

  // if (document.getElementById('quiz-wrapper')) {
  //   console.log('quiz-wrapper found, adding event listener')
  //   document.getElementById('quiz-wrapper').addEventListener('answer', function(e) {
  //     console.log(e.detail);
  //     e.stopPropagation();
  //     e.preventDefault();
  //   });
  // }
});