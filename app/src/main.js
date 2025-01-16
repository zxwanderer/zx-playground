console.log('Hello World from console')

const onLoad = () => {
  emu = JSSpeccy(document.getElementById('jsspeccy'), {zoom: 2, sandbox: false, tapeAutoLoadMode: 'usr0'})
  // const emu = JSSpeccy(
  //   document.getElementById('jsspeccy'),
  //   { zoom: 2, machine: 128, sandbox: true, autoStart: true, uiEnabled: false, keyboardEnabled: false }
  // )
}
window.addEventListener('load', () => onLoad()) 
