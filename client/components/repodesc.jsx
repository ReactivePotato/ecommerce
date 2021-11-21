import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import Head from './head'
import Header from './header'

const RepoDesc = () => {
  const { userName, repositoryName } = useParams()
  const [repoData, setRepoData] = useState('')

  return (
    <div>
      <Head title="Main Page" />
      <Header reponame={repositoryName} />

      {useEffect(async () => {
        await axios
          .get(`https://raw.githubusercontent.com/${userName}/${repositoryName}/master/README.md`)
          .then((it) => {
            setRepoData(it.data)
          })
          .catch(() => {})
      }, [repositoryName, userName])}
      <div id="description" className="mt-3 ml-3 mr-3">
        <ReactMarkdown>{repoData}</ReactMarkdown>
      </div>
    </div>
  )
}

RepoDesc.propTypes = {}

export default React.memo(RepoDesc)
