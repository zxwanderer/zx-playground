console.log('module_loader')

function initModuleStruct (moduleTarget) {
  console.log(moduleTarget)
const RasmAssemble = moduleTarget.cwrap('RasmAssembleInfo', 'number', ['string', 'number', 'number', 'number', 'number']);
const RasmFreeInfoStruct = moduleTarget.cwrap('RasmFreeInfoStruct', 'void', ['number']);

return {
  RasmAssemble,
  RasmFreeInfoStruct,
  destPtr: moduleTarget._malloc(4),
  destLenPtr: moduleTarget._malloc(4),
  infoPtr: moduleTarget._malloc(4)
}
}

assembleToSnapshot = function (moduleTarget, moduleStruct, source) {
const result = moduleTarget.RasmAssemble(source, source.length, destPtr, destLenPtr, infoPtr);
const destLen = moduleTarget.getValue(destLenPtr, 'i32');
const dest = moduleTarget.getValue(destPtr, 'i32');
const info = moduleTarget.getValue(infoPtr, 'i32');
let errorPtr = moduleTarget.getValue(info, 'i32');
const nbError = moduleTarget.getValue(info + 4, 'i32');
const maxError = moduleTarget.getValue(info + 8, 'i32');
const warnErr = moduleTarget.getValue(info + 12, 'i32');
if (result != 0) {
    const errorMessages = [];
    for (let i = 0; i < nbError; i++) {
        const line = moduleTarget.getValue(errorPtr + 4, 'i32');
        const msgPtr = moduleTarget.getValue(errorPtr + 8, 'i32');
        const lenMsg = moduleTarget.getValue(errorPtr + 12, 'i32');
        errorMessages.push("line " + line + ": " + moduleTarget.UTF8ToString(msgPtr, lenMsg));
        errorPtr += 20;
    }
    moduleTarget.RasmFreeInfoStruct(info);
    return { success: false, errorMessages: errorMessages };
} else {
    const start = moduleTarget.getValue(info + 32, 'i32');
    const destArray = new Uint8Array(moduleTarget.HEAPU8.buffer, dest, destLen);
    moduleTarget.RasmFreeInfoStruct(info);
    moduleTarget._free(dest);

    const snapshotMemory = new Uint8Array(0xc000);
    for (let i = 0x1800; i < 0x1b00; i++) {
        snapshotMemory[i] = 0x38;
    }
    for (let i = 0; i < SYSVARS.length; i++) {
        snapshotMemory[i + 0x1c00] = SYSVARS[i];
    }
    for (let i = 0; i < destLen; i++) {
        snapshotMemory[start + i - 0x4000] = destArray[i];
    }
    const snapshot = {
        registers: {
            'AF': (start & 0xff) << 8,
            'BC': start,
            'HL': 0,
            'PC': start,
            'SP': start - 2,
            'IR': 0,
            'DE': 0,
            'BC_': 0,
            'DE_': 0,
            'HL_': 0x2758,
            'AF_': 0,
            'IY': 0x5c3a,
            'IX': 0,
            'iff1': 1,
            'iff2': 1,
            'im': 1,
        },
        ulaState: {
            borderColour: 0,
            pagingFlags: 0x10,
        },
        model: 128,
        memoryPages: {
            5: new Uint8Array(snapshotMemory.buffer, 0, 0x4000),
            2: new Uint8Array(snapshotMemory.buffer, 0x4000, 0x4000),
            0: new Uint8Array(snapshotMemory.buffer, 0x8000, 0x4000),
        },
        tstates: 0,
    };

    return { success: true, snapshot: snapshot, codeLength: destLen };

}

}

var Module = {
  onRuntimeInitialized: function() {
    console.log('onRuntimeInitialized')
    const moduleStruct = initModuleStruct(Module)
  //   console.log(result)
  //   let result = assembleToSnapshot(Module, moduleStruct, Z80_SOURCE)
  //   console.log(result)
  }
}
