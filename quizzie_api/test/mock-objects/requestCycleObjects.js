/* eslint-disable jsdoc/require-jsdoc */
// mock req/res objects
const req = {
  body: {
      type: "verbPhrase",
      meaning: "go to an event / restaurant / pub / party",
      question: "GO __",
      options: [],
      examples: [
        "Let's go out for dinner.",
        "You're going out a lot these days.",
        "We should go out more."
      ],
      answer: "OUT"
  },
  params: {
    id: 1
  },
  query: {
    type: "verbPhrase",
    limit: 5
  }
}
// mock res object, with function to set status, in order to test for the code of the response.
const res = {
  code: 500,
  status: (newCode) => {
    res.code = newCode
  },
  data: '',
  json: (data) => {
    res.data = data
  },
  error: ''
}
// mock function for next - handling errors
function next (error = {}) {
  error.test = 'error function called'
}

export { req, res, next }
