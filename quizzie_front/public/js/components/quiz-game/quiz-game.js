/**
 * The quiz-game web component module.
 *
 * @author Emma Fransson <ef222hr@student.lnu.se>
 * @version 1.0.0
 */

// Define template.
const template = document.createElement('template')
template.innerHTML = `
  <style>
    .quiz-wrapper {
      position: relative;
      width: 350px;
      height: 350px;
      padding: 20px;
      display: flex;
      flex-direction: column;
      gap: 10px;
      justify-content: center;
      align-items: center;
    }
    .quiz-game {
      display: flex;
      flex-direction: row;
      gap: 10px;
    }
    h1 {
      position: absolute;
      top: 10px;
      font-family: super-toast;
      margin: 5px;
    }
    .result-wrapper, #final-result-wrapper {
      font-size: 20px;
      text-align: center;
    }
    button {
      position: absolute;
      bottom: 20px;
      width: 100px;
      padding: 5px;
      font-family: super-toast;
      border-radius: 10px;
      border: 2px solid black;
      font-size: 25px;
    }
    button:hover {
      background-color: rgb(100, 137, 97);
    }
    .hidden {
      display: none;
    }
  </style>

  <div class="quiz-wrapper">
    <h1>Quiz game</h1>
    <div class="quiz-game" id="id">
      <slot></slot>
    </div>
    <div class="result-wrapper">
      <p id="result"></p>
      <p id="correct-answer"></p>
    </div>
    <div id="final-result-wrapper" class="hidden">
      <p>Quiz is finished!</p>
      <p id="final-result"></p>
    </div>
    <button id="start">Start</button>
    <button class="hidden" id="next">Next</button>
    <button class="hidden" id="done">Done</button>
  </div>
`
customElements.define('quiz-game',
  /**
   * Represents a flipping tile.
   */
  class extends HTMLElement {
    /**
     * The element representing the tile.
     * @type {HTMLElement}
     */
    #element

    /** 
     * the slot element, that holds all question elements
     * @type {HTMLSlotElement}
     */
    #slot

    /** 
     * the slot element, that holds all question elements
     * @type {string[]}
     */
    #questionsId

    /** 
     * the slot element, that holds all question elements
     * @type {string}
     */
    #currentQuestionId

    /** 
     * Holds the result from latest answered question.
     * @type {HTMLParagraphElement}
     */
    #resultHolder

    /** 
     * Holds the total game result
     * @type {number}
     */
    #finalResult = 0

    /** 
     * the slot element, that holds all question elements
     * @type {string}
     */
    #name = 'quiz-game'


    /**
     * Creates an instance of the current type.
     */
    constructor () {
      super()

      this.attachShadow({ mode: 'open' }).appendChild(template.content.cloneNode(true))

      this.#element = this.shadowRoot.querySelector('.quiz-wrapper')
      this.#resultHolder = this.#element.querySelector('.result-wrapper')
    }

    /**
     * Called when the element is inserted into the DOM.
     */
    connectedCallback () {
      this.#element.addEventListener('answer', (event) => {
        this.#hideCurrentQuestion()
        this.#saveResult(event.detail.message)
        this.#displayResult(event.detail)
      })

      this.#slot = this.shadowRoot.querySelector('slot');
      this.#slot.addEventListener('slotchange', () => {
        const questions = Array.from(this.#slot.assignedElements())
        this.#questionsId = questions.map(question => question.id)
        this.#currentQuestionId = this.#questionsId[0]
      })

      this.#element.querySelector('#start').addEventListener('click', () => {
        this.#startQuiz()
      })

      this.#element.querySelector('#next').addEventListener('click', () => {
        this.#nextQuestion()
      })

      this.#element.querySelector('#done').addEventListener('click', () => {
        this.#endQuiz()
      })
    }

    /**
     * Called when the element is removed into the DOM.
     */
    disConnectedCallback () {

    }

    /**
     * Attributes to monitor for changes.
     *
     * @returns {string[]} A string array of attributes to monitor.
     */
    static get observedAttributes () {
      return ['name']
    }

    /**
     * Called if observed attribute/attributes change.
     *
     * @param {string} name Name of attribute.
     * @param {*} oldValue Old Value of attribute.
     * @param {*} newValue New value of attribute.
     */
    attributeChangedCallback (name, oldValue, newValue) {
      // TODO: validering av attribut
      if (name === 'name') {
        this.#name = newValue;
      }
    }

    #startQuiz () {
      this.#element.querySelector('#start').classList.add('hidden')
      document.querySelector(`#${this.#currentQuestionId}`).classList.remove('hidden')
    }

    #nextQuestion () {
      this.#removeResult()
      const currentQuestionIndex = this.#questionsId.indexOf(this.#currentQuestionId)
      if (this.#questionsId.length === currentQuestionIndex + 1) {
        this.#element.querySelector('#next').classList.add('hidden')
        this.#element.querySelector('#done').classList.remove('hidden')
        this.#hideCurrentQuestion()
        this.#displayFinalResult()
      } else {
        const nextQuestionIndex = currentQuestionIndex + 1
        this.#currentQuestionId = this.#questionsId[nextQuestionIndex]
        this.#showCurrentQuestion()
      }
    }

    #hideCurrentQuestion() {
      document.querySelector(`#${this.#currentQuestionId}`).classList.add('hidden')
    }

    #showCurrentQuestion () {
      document.querySelector(`#${this.#currentQuestionId}`).classList.remove('hidden')
      this.#element.querySelector('#next').classList.add('hidden')
    }

    #displayResult (result) {
      this.#resultHolder.querySelector('#result').textContent = result.message
      this.#resultHolder.querySelector('#correct-answer').textContent = result.answer
      this.#resultHolder.classList.remove('hidden')
      this.#element.querySelector('#next').classList.remove('hidden')
    }

    #removeResult () {
      this.#element.querySelector('.result-wrapper').classList.add('hidden')
    }

    #displayFinalResult () {
      this.#element.querySelector('#next').classList.add('hidden')
      this.#element.querySelector('#final-result').textContent = this.#finalResult + ' of ' + this.#questionsId.length + ' correct answers.'
      this.#element.querySelector('#final-result-wrapper').classList.remove('hidden')
    }

    #saveResult (result) {
      if (result === 'Correct!') {
        this.#finalResult++
      }
    }

    #endQuiz () {
      console.log('end quiz')
    }
  })