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

  </style>

  <div class="idiom-wrapper">
    <h1>Idiom</h1>
    <div part="for-styling" id="id">
        <div class="question"></div>
        <div class="options"></div>
        <div class="answer"></div>
    </div>  
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
      console.log(this.#options)
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
        this.#setAnswer()
      }
    }

    #setOptions () {
      const options = this.#options
      const optionsElement = this.#element.querySelector('.options')

      options.forEach(option => {

        const p = document.createElement('p')
        p.textContent = option
        optionsElement.appendChild(p)
      })
    }

    #setQuestion () {
      const question = this.#question
      const questionElement = this.#element.querySelector('.question')

      const p = document.createElement('p')
      p.textContent = question
      questionElement.appendChild(p)
    }

    #setAnswer () {
      const answer = this.#answer
      const questionElement = this.#element.querySelector('.answer')

      const p = document.createElement('p')
      p.textContent = answer
      questionElement.appendChild(p)
    }
  })