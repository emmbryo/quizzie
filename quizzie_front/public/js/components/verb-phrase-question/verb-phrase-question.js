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
      font-size: 20px;
    }
    h2, h3 {
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
      font-size: 22px;
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
      text-align: center;
      justify-content: center;
      align-items: center;
      margin: 0px;
    }
    .question p, .meaning p {
      font-size: 20px;
    } 
    #prep-input {
      padding: 5px;
      border-radius: 10px;
      border: 2px solid black;
      font-size: 20px;
    }
  </style>

  <div class="verb-phrase-wrapper">
    <h3>verb phrase</h3>
    <div class="question-wrapper">
        <div class="meaning"></div>
        <div class="question"></div>
        <div class="answer">
          <input id="prep-input" type="text" placeholder="Preposition(s)" autofocus maxlength="200">
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
        const answer = this.#element.querySelector('#prep-input').value
        if (!answer) {
          alert('Please enter an answer')
        } else {
          const event = new CustomEvent('answer', {
            detail: { message: '', answer: this.#answer },
            bubbles: true,
            composed: true
          })
          if (answer.toLowerCase().trim() === this.#answer.toLowerCase()) {
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