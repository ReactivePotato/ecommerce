import React, { useState } from 'react'
import axios from 'axios'
import Storeheader from './storeheader'

export default function Logs() {
  const [listLogs, setlistLogs] = useState([])

  axios.get('api/v1/getlogs').then(({ data }) => setlistLogs(data))

  return (
    <div>
      <Storeheader />
      <div className="flex m-2 font-mono">Logs</div>
      <div className="ml-2 mr-2 font-mono">
        <button
          type="button"
          onClick={() => {
            axios.delete('api/v1/logs')
          }}
        >
          <div className="border border-dashed m-1 p-1">clear logs</div>
        </button>
        <table className="table-fixed border-collapse border-border-green-800">
          <thead>
            <tr>
              <th className="w-1/4 border border-green-600 pl-1 pr-1">Time</th>
              <th className="w-1/2 border border-green-600 pl-1 pr-1">Action</th>
            </tr>
          </thead>
          <tbody>
            {listLogs.map((it) => {
              return (
                <tr key={it.time}>
                  <td className="border border-green-600 pl-1 pr-1">{it.time}</td>
                  <td className="border border-green-600 pl-1 pr-1">{it.act}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
