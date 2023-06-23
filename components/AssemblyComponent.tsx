// import type { AddModuleExports } from '../wasm'
import type {AssemblyExports} from '../wasm'
import dynamic from 'next/dynamic'

// interface RustComponentProps {
//   number: Number
// }

const AssemblyComponent = dynamic({
  // const AssemblyComponent = async function(){
  loader: async () => {
    
    // Import the wasm module
    // @ts-ignore
    // const exports = (await import('../add.wasm')) as AddModuleExports
     // @ts-ignore
    const exports = (await import('../release.wasm')) as AssemblyExports
    // debugger
    // const { add_one: addOne } = exports
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

    // Return a React component that calls the add_one method on the wasm module
    return () => (
      <div>
        <>{primeOutput}</>
      </div>
    // <>
    // {primeArray.map((index,item)=> {
    //   <li>{index}: {item}</li>
    // })}
    // </>
    )
  }

})

export default AssemblyComponent
