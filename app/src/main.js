const { initModuleStruct, assembleToSnapshot } = require('./assembler')

console.log('Hello World from console')

import Z80_SOURCE from './code.asm'

document.addEventListener("ModuleReady", function(event) { // (1)
  console.log('onRuntimeInitialized')
  const moduleStruct = initModuleStruct(Module)
  console.log(moduleStruct)
  let result = assembleToSnapshot(Module, moduleStruct, Z80_SOURCE)
  console.log(result)
  let emu = JSSpeccy(document.getElementById('jsspeccy'), 
    // {zoom: 2, sandbox: false, tapeAutoLoadMode: 'usr0'}
    { zoom: 2, sandbox: true, autoStart: true, uiEnabled: false, keyboardEnabled: false }
  )
  emu.onReady(() => {
    emu.loadSnapshotFromStruct(result.snapshot);
  });

  const editor = ace.edit("source");
  editor.setTheme("ace/theme/twilight");
  editor.setShowPrintMargin(false);
  editor.setFontSize(16);
  editor.session.setValue(Z80_SOURCE);
  editor.focus();
});
