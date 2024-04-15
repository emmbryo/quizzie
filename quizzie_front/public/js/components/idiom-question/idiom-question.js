/**
 * The idiom-question web component module.
 *
 * @author Emma Fransson <ef222hr@student.lnu.se>
 * @version 1.0.0
 */

// Define template.
const template = document.createElement('template')
template.innerHTML = `
  <style>
    .idiom-wrapper {
      margin: 20px;
      padding: 10px;
      display: flex;
      flex-direction: column;
      gap: 5px;
    }
    h1 {
      font-family: super-toast;
    }
    button {
      width: 100px;
    }
  </style>

  <div class="idiom-wrapper">
    <h1>Idiom</h1>
    <div id="question">
        <div class="question"></div>
        <div class="options"></div>
        <div class="answer"></div>
    </div>  
    <button id="submit">Answer</button>
  </div>
`
customElements.define('idiom-question',
  /**
   * Represents a flipping tile.
   */
  class extends HTMLElement {
    /**
     * The element representing the tile.
     */
    #element

    #question
    #options
    #answer

    /**
     * Creates an instance of the current type.
     */
    constructor () {
      super()

      this.attachShadow({ mode: 'open' }).appendChild(template.content.cloneNode(true))

      this.#element = this.shadowRoot.querySelector('.idiom-wrapper')
    }

    /**
     * Called when the element is inserted into the DOM.
     */
    connectedCallback () {
      this.#element.querySelector('#submit').addEventListener('click', () => {
        console.log('selected option: ', this.#element.querySelector('input[name="answerOption"]:checked').value)
        const selectedOption = this.#element.querySelector('input[name="answerOption"]:checked').value
        const event = new CustomEvent('answer', {
          detail: { message: '' },
          bubbles: true,
          composed: true
        })
        if (selectedOption === this.#answer) {
          event.detail.message = 'Correct'
        } else {
          event.detail.message = 'Wrong'
        }
        this.dispatchEvent(event)
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
      return ['question', 'options', 'answer']
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
      if (name === 'options') {
        this.#options = JSON.parse(newValue);
        this.#setOptions()
      }

      if (name === 'question') {
        this.#question = newValue;
        this.#setQuestion()
      }

      if (name === 'answer') {
        this.#answer = newValue;
      }
    }

    #setOptions () {
      const options = this.#options
      const optionsElement = this.#element.querySelector('.options')

      options.forEach((option, index) => {
        const wrapper = document.createElement('div')
        wrapper.class = 'option-wrapper'

        const radio = document.createElement('input')
        radio.type = 'radio'
        radio.name = 'answerOption'
        radio.value = option
        radio.id = 'answerOption' + index

        const label = document.createElement('label')
        label.textContent = option
        label.htmlFor = radio.id 
        wrapper.appendChild(radio)
        wrapper.appendChild(label)
        optionsElement.appendChild(wrapper)
      })
    }

    #setQuestion () {
      const question = this.#question
      const questionElement = this.#element.querySelector('.question')
      questionElement.appendChild(this.#getTextNode(question))
    }

    #getTextNode (text) {
      const p = document.createElement('p')
      p.textContent = text
      return p
    }

    getCorrectAnswer () {
      return this.#answer
    }
  })