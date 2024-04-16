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
      margin: 20px;
      padding: 10px;
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
    h1 {
      font-family: super-toast;
    }
    button {
      width: 100px;
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
    <button id="start">Start</button>
    <button class="hidden" id="next">Next</button>
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
    }

    /**
     * Called when the element is inserted into the DOM.
     */
    connectedCallback () {
      this.#element.addEventListener('answer', (event) => {
        console.log('answer received: ', event.detail)
      })

      this.#slot = this.shadowRoot.querySelector('slot');
      this.#slot.addEventListener('slotchange', () => {
        const questions = Array.from(this.#slot.assignedElements())
        this.#questionsId = questions.map(question => question.id)
        this.#currentQuestionId = this.#questionsId[0]
        console.log(this.#questionsId, this.#currentQuestionId)
      })

      this.#element.querySelector('#start').addEventListener('click', () => {
        this.#startQuiz()
      })

      this.#element.querySelector('#next').addEventListener('click', () => {
        this.#nextQuestion()
        this.#showNextQuestion()
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
      console.log('start quiz')
      this.#element.querySelector('#start').classList.add('hidden')
      this.#element.querySelector('#next').classList.remove('hidden')
      document.querySelector(`#${this.#currentQuestionId}`).classList.remove('hidden')
    }

    #nextQuestion () {
      const currentQuestionIndex = this.#questionsId.indexOf(this.#currentQuestionId)
      if (this.#questionsId.length === currentQuestionIndex + 1) {
        console.log('no more questions')
      } else {
        const nextQuestionIndex = currentQuestionIndex + 1
        this.#currentQuestionId = this.#questionsId[nextQuestionIndex]
      }
    }

    #showNextQuestion () {
      const currentQuestionIndex = this.#questionsId.indexOf(this.#currentQuestionId)
      const previousQuestionIndex = currentQuestionIndex - 1
      document.querySelector(`#${this.#questionsId[previousQuestionIndex]}`).classList.add('hidden')
      document.querySelector(`#${this.#currentQuestionId}`).classList.remove('hidden')
    }
  })