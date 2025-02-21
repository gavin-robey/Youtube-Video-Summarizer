import { useState } from 'react'
import './App.css'

function App() {

  const [inputValue, setInputValue] = useState('')
  const [response, setResponse] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit() {
    setLoading(true)
    const response = await fetch(`http://localhost:3000/sendPrompt`, {
      method: 'POST',
      headers: {
      'Content-Type': 'application/json'
      },
      body: JSON.stringify({ "prompt" : inputValue })
    })

    const data = await response.json()
    setResponse(data.response)

    setLoading(false)
  }


  return (
    <>
      {loading ? ( 
        <p>Loading...</p> 
      ) : ( 
          <p>{response}</p>
      )}
      <input type="text" onChange={(e)=> setInputValue(e.target.value)}/> 
      <button type="submit" onClick={handleSubmit}>Submit</button>
    </>
  )
}

export default App
