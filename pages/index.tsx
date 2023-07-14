// import type {AssemblyExports} from '../release'

import type { InferGetServerSidePropsType, GetServerSideProps } from 'next'
import { AreaChart } from '../components/AreaChart'

// type Primes = {
//   values: Number[]
// };

interface Props {
  primes: Number[];
}


export const getServerSideProps: GetServerSideProps<{ primes: Number[] }> = async (context) => {
  const API_URL = 'https://wasm-test-git-main-rebeccapeltz.vercel.app/api/primes';
  const res = await fetch(API_URL)
  const data = await res.json()
  const primes = data.values;
  if (primes == null) {
    return {
      notFound: true
    }
  } else {
    return {
      props: { primes }
    }
  }
}

import TableRow from '../components/TableRow'


export default function Page({ primes }: Props) {
  // console.log(primes)
  // console.log("100",primes[100])
  return (
    <div className="container">
      <div className="grid-container">
        <div><AreaChart primes={primes} /></div>
        <div><AreaChart primes={primes} /></div>
        <div><AreaChart primes={primes} /></div>
      </div>



      {/* <table>
            <thead>
                <tr>
                    <th colSpan={4} className='topnav'>Rendered By Next JS | Client side rendered</th>
                </tr>
            </thead>
            <tbody>
                {primes.map((index,prime) => <TableRow  key={index.toString()} prime={prime.toString()} index={index.toString()} />)}
            </tbody>

        </table> */}
    </div>
  )
}



