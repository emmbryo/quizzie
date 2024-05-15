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
      justify-content: center;
      align-items: center;
      font-size: 20px;
    }
    h3 {
      font-family: super-toast;
    }
    button {
      width: 100px;
      padding: 5px;
      margin-top: 30px;
      border-radius: 10px;
      border: 2px solid black;
      box-shadow: 2px 2px 2px 2px rgba(0, 0, 0, 0.2);
      font-family: super-toast;
      font-size: 22px;
    }
    button:hover {
      background-color: rgb(100, 137, 97);
    }
    .question {
      font-size: 25px;
      text-align: center;
      justify-content: center;
      align-items: center;
      margin: 0px;
    }
    .answer {
      width: 120px;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    #vocab-input {
      padding: 5px;
      border-radius: 10px;
      border: 2px solid black;
      font-size: 20px;
    }
  </style>

  <div class="vocab-wrapper">
    <h3>Vocabulary</h3>
    <div part="question" id="id">
        <div class="question"></div>
        <div class="meaning"></div>
        <div class="answer">
          <input id="vocab-input" type="text" placeholder="English translation" autofocus maxlength="200">
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
        const selectedOption = this.#element.querySelector('#vocab-input').value
        if (!selectedOption) {
          alert('Please enter an answer')
        } else {
          const event = new CustomEvent('answer', {
            detail: { message: '', answer: this.#answer },
            bubbles: true,
            composed: true
          })
          if (selectedOption.toLowerCase().trim() === this.#answer.toLowerCase()) {
            event.detail.message = 'Correct!'
          } else {
            event.detail.message = 'Wrong'
          }
          this.dispatchEvent(event)
        }
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