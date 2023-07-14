export const config = { runtime: 'edge' }

import type { AssemblyExports } from '../../wasm'
import { NextRequest, NextResponse } from 'next/server';

// prevent build error on not finding
// @ts-ignore
import releaseWasm from '../../release.wasm?module'

// const module$ = WebAssembly.instantiate(addWasm)
const module$ = WebAssembly.instantiate(releaseWasm)

export default async function handler() {
  const instance = (await module$) as any
  const exports = instance.exports as AssemblyExports
  const {memory,get1000Primes}= exports
  get1000Primes();
  // getFibonacci1000();
  const wasmByteMemoryArray = new Uint32Array(memory.buffer);

  // Get 1st 1000
  const prime1000 = wasmByteMemoryArray.slice(0,999);
  const primes = [];
  for (let i=0;i<prime1000.length;i++){
    primes.push(prime1000[i])
  }
  return NextResponse.json({
    values: primes,
  });
}

