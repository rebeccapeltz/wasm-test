import React from 'react';
import type {AssemblyExports} from '../wasm'

async function loadAsync() {
    debugger
    const exports = (await import('../release.wasm')) as AssemblyExports
    const {isPrime: isPrime,add: add,get1000Primes: get1000Primes,getFibonacci1000: getFibonacci1000, memory:memory} = exports
    get1000Primes()
    const wasmByteMemoryArray = new Uint32Array(memory.buffer);

    // Get 1st 1000
    const prime1000 = wasmByteMemoryArray.slice(0,1000);
    let primeArray:number[] = [];
    let primeOutput = '';
    for (let i=0;i<prime1000.length;i++){
      primeOutput += `${i}:${prime1000[i]}\n`;
      primeArray.push(prime1000[i])
    }
    return primeArray
}
 
function Hello() {
    let arr:number[] = []

    loadAsync()
    .then(result=>{
        debugger
        for (let i = 0; i< result.length; i++){
            arr.push(result[i])
        }
    })
    
    debugger
    return (
        <>
        <ul>
            <div>{arr[0]}</div>
            <li>hello</li>
        </ul>
        </>
    );
}
 
export default Hello;