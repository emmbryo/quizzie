/* eslint-disable jsdoc/require-jsdoc */
// mock req/res objects
const req = {
  body: {
      username: 'username',
      password: 'password'
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
  next: (error) => {
    res.error = error
  },
  error: '',
  end: () => {
    res.endCalled = true
  }
}
// mock function for next - handling errors
function next (error = {}) {
  error.test = 'error function called'
}

export { req, res, next }
