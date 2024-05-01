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

  if (document.getElementById('file-input')) {
    document.getElementById('file-input').addEventListener('change', event => {
      const filename = event.target.files[0].name
      document.getElementById('file-label').innerText = filename
    })
  }

  if (document.getElementById('img-wrapper')) {
    document.getElementById('img-wrapper').addEventListener('click', (event) => {
      console.log(event.target);
      event.target.classList.toggle('enlarged')
    })
  }

  if (document.getElementById('show-img-btn')) {
    document.getElementById('show-img-btn').addEventListener('click', (event) => {
      document.getElementById('img-wrapper').classList.toggle('hidden')
    })
  }

  document.querySelector('.menu-toggle').addEventListener('click', (event) => {
    const menu = document.querySelector('.base-menu')

    console.log('classList: ', menu.classList)
    menu.classList.toggle('menu')
    menu.classList.toggle('menu-drop')
  })

})

function redirectToHome() {
  window.location.href = './quiz';
}

function hideFlash() {
  if (document.getElementById('flash-message')) {
    document.getElementById('flash-message').classList.add('hidden')
  }
}
