/**
 * The vocab-question web component module.
 *
 * @author Emma Fransson <ef222hr@student.lnu.se>
 * @version 1.0.0
 */

// Define template.
const template = document.createElement('template')
template.innerHTML = `
  <style>
    .vocab-wrapper {
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
    .answer {
      width: 120px;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  </style>

  <div class="vocab-wrapper">
    <h1>Vocabulary</h1>
    <div part="question" id="id">
        <div class="question"></div>
        <div class="meaning"></div>
        <div class="answer">
          <label for="prep-input">Answer:</label>
          <input id="prep-input" type="text">
        </div>
    </div>  
    <button id="submit">OK</button>
  </div>
`
customElements.define('vocab-question',
  /**
   * Represents a flipping tile.
   */
  class extends HTMLElement {
    /**
     * The element representing the tile.
     */
    #element

    /**
     * The question and its answer values as strings.
     */
    #question
    #answer

    #exampleData = { question: "hund", answer: "dog", type: "vocab" }

    /**
     * Creates an instance of the current type.
     */
    constructor () {
      super()

      this.attachShadow({ mode: 'open' }).appendChild(template.content.cloneNode(true))

      this.#element = this.shadowRoot.querySelector('.vocab-wrapper')
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
      return ['question', 'answer']
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
      if (name === 'question') {
        this.#question = newValue;
        this.#setQuestion()
      }

      if (name === 'answer') {
        this.#answer = newValue;
      }
    }

    #setQuestion () {
      const question = this.#question
      const questionElement = this.#element.querySelector('.question')
      const p = document.createElement('p')
      p.textContent = question
      questionElement.appendChild(p)
    }

    getCorrectAnswer () {
      return this.#answer
    }
  })