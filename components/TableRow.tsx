import React from 'react'

interface IProps {
    prime: string,
    index: string
 }
// deconstructed props
export default function TableRow({prime,index}:IProps) {
// debugger
  return (
        <tr>
            <td>{prime}</td>
            <td>{index}</td>
        </tr>
  )
}
