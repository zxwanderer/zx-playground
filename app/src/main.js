const { init } = require('./init')
const { initModuleStruct, assembleToSnapshot } = require('./assembler.js')

console.log('Hello World from console')

const Z80_SOURCE = require('./code.asm')

// const onLoad = () => {
    // init()
    // Module.onRuntimeInitialized()
    // console.log(Module)
// }

// document.addEventListener('DOMContentLoaded', () => onLoad()) 
