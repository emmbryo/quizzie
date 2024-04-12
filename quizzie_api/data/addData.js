import datas from './example.js'

async function addData() {
  for (const data of datas) {
    // console.log(verb)
    try {
      const response = await fetch('http://localhost:8086/api/v1/questions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
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