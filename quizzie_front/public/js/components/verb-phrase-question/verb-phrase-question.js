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
      margin: 20px;
      padding: 10px;
      display: flex;
      flex-direction: column;
      gap: 10px;
      justify-content: center;
      align-items: center;
    }
    h2 {
      font-family: super-toast;
      margin-top: 30px;
      margin-bottom: 2px;
    }
    button {
      width: 100px;
      padding: 5px;
      margin-top: 30px;
      border-radius: 10px;
      border: 2px solid black;
      box-shadow: 2px 2px 2px 2px rgba(0, 0, 0, 0.2);
      font-family: super-toast;
      font-size: 18px;
    }
    button:hover {
      background-color: rgb(100, 137, 97);
    }
    .answer {
      width: 300px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 10px;
    }
    .question, .meaning {
      font-size: 20px;
      text-align: center;
      justify-content: center;
      align-items: center;
      margin: 0px;
    }
    #prep-input {
      padding: 5px;
      border-radius: 10px;
      border: 2px solid black;
    }
  </style>

  <div class="verb-phrase-wrapper">
    <h2>verb phrase</h2>
    <div class="question-wrapper">
        <div class="meaning"></div>
        <div class="question"></div>
        <div class="answer">
          <input id="prep-input" type="text" placeholder="Preposition(s)">
        </div>
    </div>  
    <button id="submit">OK</button>
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

    #exampleData = {
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
      this.#element.querySelector('#submit').addEventListener('click', () => {
        const selectedOption = this.#element.querySelector('#prep-input').value
        const event = new CustomEvent('answer', {
          detail: { message: '' },
          bubbles: true,
          composed: true
        })
        if (selectedOption === this.#answer.toLowerCase()) {
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

    #getTextNode (text) {
      const p = document.createElement('p')
      p.textContent = text
      return p
    }

    getCorrectAnswer () {
      return this.#answer
    }
  })