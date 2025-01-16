console.log('Hello World from console')


const onLoad = () => {
  let emu = JSSpeccy(document.getElementById('jsspeccy'), {zoom: 2, sandbox: false, tapeAutoLoadMode: 'usr0'})
}
window.addEventListener('load', () => onLoad()) 
