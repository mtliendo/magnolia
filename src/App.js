import { useState } from 'react'
import { SketchPicker } from 'react-color'
import './App.css'
import LightBulb from './lightbulb'
import axios from 'axios'
const TOKEN = 'c7c74e9b14ff949bec26845144dc811ca5e3091dfd1bfce9c27721bbfd5f4786'
const LIGHT_ID = 'd073d559bfdb'

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
