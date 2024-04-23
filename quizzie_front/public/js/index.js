document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM loaded with JavaScript')
  if (document.getElementById('size')) {
    document.getElementById('size').addEventListener('input', function(e) {
      console.log('input changed')
      document.getElementById('sizeValue').innerText = e.target.value;
    })
  }

  if (document.getElementById('question-type')) {
    console.log('question-type found, adding event listener')
    document.getElementById('question-type').addEventListener('submit', (e) => {
      console.log(e.target)
      e.stopPropagation()
      e.preventDefault()

      let type = document.querySelector('input[name="quizOption"]:checked')
      console.log(type.value)
      document.getElementById(`${type.value}-form`).classList.remove('hidden')
      document.getElementById('question-type').classList.add('hidden')
    })
  }
});