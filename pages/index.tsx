// import type {AssemblyExports} from '../wasm'
import type { InferGetServerSidePropsType, GetServerSideProps } from 'next'

type Primes = {
  arr: Number[]
};


export const getServerSideProps: GetServerSideProps<{
  primes: Primes
}> = async () => {
  const res = await fetch('https://wasm-test-git-main-rebeccapeltz.vercel.app/api/primes')
  const primes = await res.json()
  return { props: { primes } }
}

import TableRow from '../components/TableRow'


export default function Page({primes}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  console.log("100",primes.arr[100])
  
  return (
    <div>
        <table>
            <thead>
                <tr>
                    <th colSpan={4} className='topnav'>Rendered By Next JS | Client side rendered</th>
                </tr>
            </thead>
            <tbody>
                {primes.arr.map((index,prime) => <TableRow  key={index.toString()} prime={prime.toString()} index={index.toString()} />)}
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

// export const getStaticProps = async () => {
//     const exports = (await import('../release.wasm')) as AssemblyExports
//     const {isPrime: isPrime,add: add,get1000Primes: get1000Primes,getFibonacci1000: getFibonacci1000, memory:memory} = exports
//     get1000Primes()
//     const wasmByteMemoryArray = new Uint32Array(memory.buffer);
  
//     // Get 1st 1000
//     const prime1000 = wasmByteMemoryArray.slice(0,1000);
//     let primeArray:number[] = [];
//     let primeOutput = '';
//     for (let i=0;i<prime1000.length;i++){
//       primeOutput += `${i}:${prime1000[i]}\n`;
//       primeArray.push(prime1000[i])
//     }
//     return {props: {"primes":primeArray}}
// }
// export const getStaticProps = async () => {
//      // fetch https://wasm-test-git-main-rebeccapeltz.vercel.app/api/primes
//      const primeArray = [1,2,3,5,7];
//       return {props: {"primes":primeArray}}
// }

