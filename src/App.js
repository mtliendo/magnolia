import { useState } from 'react'
import { SketchPicker } from 'react-color'
import './App.css'
import LightBulb from './lightbulb'
import axios from 'axios'
const TOKEN = process.env.LIGHT_TOKEN
const LIGHT_ID = process.env.TOKEN_ID
console.log('the env vars', { TOKEN, LIGHT_ID })
function App() {
  const [bulbColor, setBulbColor] = useState('#FFD517')
  const [color, setColor] = useState('#FFD517')

  const handleColorChange = (color) => {
    setColor(color.hex)
  }

  const handleButtonClick = async () => {
    setBulbColor(color)
    axios({
      method: 'put',
      url: `https://api.lifx.com/v1/lights/id:${LIGHT_ID}/state`,
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
      data: {
        color: color,
      },
    }).then((data) => {
      console.log({ success: 'light changed!', data })
    })
  }

  return (
    <div className="App">
      <header className="App-header">
        <MainContainer>
          <LightBulb bulbColor={bulbColor} />
          <SketchPicker color={color} onChange={handleColorChange} />
        </MainContainer>
        <button className="button" onClick={handleButtonClick}>
          Change Light
        </button>
      </header>
    </div>
  )
}
const MainContainer = ({ children }) => (
  <div
    style={{
      width: '100vw',
      display: 'flex',
      justifyContent: 'center',
    }}
  >
    {children}
  </div>
)

export default App
