console.log('module_loader')

var Module = {
  onRuntimeInitialized: function() {
    let event = new Event("ModuleReady", {bubbles: true}); // (2)
    document.dispatchEvent(event);
  }
}
