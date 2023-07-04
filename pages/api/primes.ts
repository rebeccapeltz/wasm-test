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
  const {memory,isPrime,get1000Primes,getFibonacci1000,add}= exports
  get1000Primes();
  // getFibonacci1000();
  const wasmByteMemoryArray = new Uint32Array(memory.buffer);

  // Get 1st 1000
  const prime1000 = wasmByteMemoryArray.slice(0,999);
  const primes = [];
  for (let i=0;i<prime1000.length;i++){
    primes.push(prime1000[i])
  }
  // const fib1000 = wasmByteMemoryArray.slice(1000,1999)
  // const fibs = [];
  // for (let i=0;i<fib1000.length;i++){
  //   fibs.push(fib1000[i])
  // }
  // console.log(primes)
  const json = {"primes":primes}
  return new Response(
    JSON.stringify(json, null, 2),
    {
      headers: {
        'content-type': 'application/json;charset=UTF-8',
      }
    }
  )
}


