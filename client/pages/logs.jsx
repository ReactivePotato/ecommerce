import React from 'react'
import Storeheader from './storeheader'

export default function logs() {
  return (
    <div>
      <Storeheader />
      <div className="flex m-2 font-mono">Logs</div>
      <div className="ml-2 mr-2 font-mono">
        <table className="table-fixed border-collapse border-border-green-800">
          <thead>
            <tr>
              <th className="w-1/4 border border-green-600 pl-1 pr-1">Time</th>
              <th className="w-1/2 border border-green-600 pl-1 pr-1">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-green-600 pl-1 pr-1">some time</td>
              <td className="border border-green-600 pl-1 pr-1">some action</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
