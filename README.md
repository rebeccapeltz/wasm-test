# WebAssembly example

Got help from this repository 

https://github.com/vercel/next.js/tree/canary/examples/with-webassembly

## old index.ts: ok in dev but won't build
```
import type {AssemblyExports} from '../wasm'
import TableRow from '../components/TableRow'
interface Primes extends Array<Number> {}
type Props = {
  primes: Primes
};

export default function Page({primes}: Props) {
  console.log("100",primes[100])
  return (
    <div>
        <table>
            <thead>
                <tr>
                    <th colSpan={4} className='topnav'>Rendered By Next JS | Client side rendered</th>
                </tr>
            </thead>
            <tbody>
                {primes.map((index,prime) => <TableRow  key={index.toString()} prime={prime.toString()} index={index.toString()} />)}
            </tbody>

        </table>
    </div>
)
}



{/* export const getServerSideProps: GetServerSideProps = async (context) => {
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
  return {props: {"primes":primeArray}}
} */}

export const getStaticProps = async () => {
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
    return {props: {"primes":primeArray}}
}

```