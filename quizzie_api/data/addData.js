import phrasalVerbs from './example.js'

async function addData() {
  for (const verb of phrasalVerbs) {
    // console.log(verb)
    try {
      const response = await fetch('http://localhost:8080/api/v1/question', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(verb)
      })

      if (!response.ok) {
        console.log(response)
        throw new Error('Failed to add question')
      }
    } catch (error) {
      console.log(error.message)
    }
  }
}

addData()