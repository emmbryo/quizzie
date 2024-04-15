/**
 * The verb-phrase-question web component module.
 *
 * @author Emma Fransson <ef222hr@student.lnu.se>
 * @version 1.0.0
 */

// Define template.
const template = document.createElement('template')
template.innerHTML = `
  <style>
    .verb-phrase-wrapper {
      display: flex;
      flex-direction: column;
    }
    h1 {
      font-family: super-toast;
    }
    button {
      width: 100px;
    }
  </style>

  <div class="verb-phrase-wrapper">
    <h1>verb phrase</h1>
    <div part="question" id="id">
        <div class="question"></div>
        <div class="meaning"></div>
        <div class="answer"></div>
    </div>  
    <button id="submit">Answer</button>
  </div>
`
customElements.define('verb-phrase-question',
  /**
   * Represents a flipping tile.
   */
  class extends HTMLElement {
    /**
     * The element representing the tile.
     */
    #element

    #question
    #meaning
    #answer

    #data = {
      question: "GET __",
      answer: "OUT",
      meaning: "leave a room / building / car",
      examples: [
        "I need to get out of the house!",
        "She got out of the car and went into the shop.",
        "Get out! There\'s a fire in the kitchen!"
      ],
      type: "verbPhrase"
    }

    /**
     * Creates an instance of the current type.
     */
    constructor () {
      super()

      this.attachShadow({ mode: 'open' }).appendChild(template.content.cloneNode(true))

      this.#element = this.shadowRoot.querySelector('.verb-phrase-wrapper')
    }

    /**
     * Called when the element is inserted into the DOM.
     */
    connectedCallback () {
      console.log(this.#meaning)
      this.#element.querySelector('#submit').addEventListener('click', () => {
        const selectedOption = this.#element.querySelector('input[name="answerOption"]:checked').value
        const event = new CustomEvent('answer', {
          detail: { message: '' },
          bubbles: true,
          composed: true
        })
        if (selectedOption === this.#answer) {
          event.detail.message = 'Correct answer'
        } else {
          event.detail.message = 'Wrong answer'
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
      return ['question', 'meaning', 'answer']
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
      if (name === 'meaning') {
        this.#meaning = newValue;
        this.#setMeaning()
      }

      if (name === 'question') {
        this.#question = newValue;
        this.#setQuestion()
      }

      if (name === 'answer') {
        this.#answer = newValue;
        this.#setAnswer()
      }
    }

    #setMeaning () {
      const meaning = this.#meaning
      const meaningElement = this.#element.querySelector('.meaning')
      meaningElement.appendChild(this.#getTextNode(meaning))
    }

    #setQuestion () {
      const question = this.#question
      const questionElement = this.#element.querySelector('.question')
      questionElement.appendChild(this.#getTextNode(question))
    }

    #setAnswer () {
      const answer = this.#answer
      const questionElement = this.#element.querySelector('.answer')
      questionElement.appendChild(this.#getTextNode(answer))
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