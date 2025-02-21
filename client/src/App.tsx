import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [inputValue, setInputValue] = useState('')
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)
  const [messages, setMessages] = useState<any[]>([])
  const [loadingMessage, setLoadingMessage] = useState("")

  const fetchData = async () => { 
    const response = await fetch(`http://localhost:3000/api/getMessages`, {
      method: 'GET',
      headers: {
      'Content-Type': 'application/json'
      }
    })
    setMessages(await response.json())
  }

  const handleSubmit = async () => {
    window.scrollTo(0, document.body.scrollHeight)
    setLoading(true)
    setSuccess(false)
    setLoadingMessage(inputValue)
    await fetch(`http://localhost:3000/api/sendPrompt`, {
      method: 'POST',
      headers: {
      'Content-Type': 'application/json'
      },
      body: JSON.stringify({ "prompt" : inputValue })
    })
    setLoading(false)
    setSuccess(true)
    window.scrollTo(0, document.body.scrollHeight)
  }

  useEffect(() => {
    fetchData();
  }, [])

  useEffect(() => {  
    fetchData();
  }, [success])

  return (
    <>
      {messages.map((message, index) => (
        <>
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <p 
                key={`human-${index}`} 
                style={{ textAlign: 'right', backgroundColor: '#00BCFF', color: 'white', width: "fit-content", maxWidth: "75%", padding: "10px", borderRadius: "10px"}}
              >
                {message.humanMessage}
              </p>
          </div>
            <p 
              key={`ai-${index}`} 
              style={{ textAlign: 'left', backgroundColor: '#3C3C3C', color: 'white', width: "fit-content", maxWidth: "75%", padding: "10px", borderRadius: "10px", marginTop: "40px", marginBottom: "40px"}}
            >
              {message.AIMessage}
            </p>
        </>
      ))}
      {loading && (
        <>
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <p style={{ textAlign: 'right', backgroundColor: '#00BCFF', color: 'white', width: "fit-content", maxWidth: "75%", padding: "10px", borderRadius: "10px"}}>{loadingMessage}</p>
          </div>
          <p style={{ textAlign: 'left', backgroundColor: '#3C3C3C', color: 'white', width: "fit-content", maxWidth: "75%", padding: "10px", borderRadius: "10px", marginTop: "40px", marginBottom: "40px"}}>
              Loading...
          </p>
        </>
      )}
      <div style={{ margin: "100px"}}></div>
      <div style={{ position: 'fixed', bottom: '0', zIndex: '1000', display: 'flex', justifyContent: 'center', backgroundColor: '#3C3C3C', color: 'white', width: "84.5%", padding: "20px", borderRadius: "10px", gap: "20px"}}>
        <input style={{ width: "100%", backgroundColor: "#242424", borderRadius: "10px" }} type="text" onChange={(e)=> setInputValue(e.target.value)}/> 
        <button style={{ backgroundColor: "#00BCFF", borderRadius: "10px" }} type="submit" onClick={handleSubmit}>Submit</button>
      </div>
    </>
  )
}

export default App
