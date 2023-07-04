export const config = { runtime: 'edge' }

import type { AssemblyExports } from '../../wasm'


// import type { Prime1000Exports } from '../../wasm'
// @ts-ignore
// import addWasm from '../../add.wasm?module'
import releaseWasm from '../../release.wasm?module'

// const module$ = WebAssembly.instantiate(addWasm)
const module$ = WebAssembly.instantiate(releaseWasm)

export default async function handler() {
  const instance = (await module$) as any
  const exports = instance.exports as AssemblyExports
//   const {memory,getFibonacci1000}= exports
  const {memory,isPrime,get1000Primes,getFibonacci1000,add}= exports

  getFibonacci1000();
  const wasmByteMemoryArray = new Uint32Array(memory.buffer);

  // Get 2nd 1000
  const fib1000 = wasmByteMemoryArray.slice(1000,1999);
  const fibs = [];
  for (let i=0;i<fib1000.length;i++){
    fibs.push(fib1000[i])
  }
  console.log(fibs)
  return new Response(`fibs: ${fibs}`)
}


