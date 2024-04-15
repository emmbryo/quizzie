console.log('Script loaded')

const answerListener = document.querySelector('#quiz-wrapper').addEventListener('answer', (e) => {
  console.log(e.detail)
})