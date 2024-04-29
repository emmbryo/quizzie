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
      e.stopPropagation()
      e.preventDefault()

      let type = document.querySelector('input[name="quizOption"]:checked')
      console.log(type.value)
      document.getElementById(`${type.value}-form`).classList.remove('hidden')
      document.getElementById('question-type').classList.add('hidden')

      hideFlash()

    })
  }

  if (document.querySelector('quiz-game')) {
    console.log('quiz-game found, adding event listener')
    document.querySelector('quiz-game').addEventListener('done', (e) => {
      e.stopPropagation()
      e.preventDefault()
      console.log('quiz is done')
      redirectToHome()
    })
  }
})

function redirectToHome() {
  window.location.href = './quiz';
}

if (document.getElementById('upload-form-btn')) {
  document.getElementById('upload-form-btn').addEventListener('click', function(e) {
    document.getElementById('upload-form').classList.toggle('hidden')
  })
}

if (document.getElementById('upload-file-btn')) {
  document.getElementById('upload-file-btn').addEventListener('click', function(e) {
    document.getElementById('upload-file-wrapper').classList.toggle('hidden')
  })
}

function hideFlash() {
  if (document.getElementById('flash-message')) {
    document.getElementById('flash-message').classList.add('hidden')
  }
}
