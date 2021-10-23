import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Head from './head'
import Header from './header'


const RepoList = () => {
  const [userRepo, setUserRepo] = useState([])
  const { userName } = useParams()

  return <div>
    <Head title="Main Page" />
    <Header username={userName} />
    <div>
      {useEffect(async () => {
        await axios.get(`https://api.github.com/users/${userName}/repos`)
          .then((it) => {
            setUserRepo(it.data)
          })
          .catch(() => { })
      }, [userName])}
      <div>
        {userRepo.map(repo => {
          return <div className="ml-5 mt-3" key={repo.name}>
            <Link to={`/${userName}/${repo.name}`}>{repo.name}</Link>
          </div>
        })}
      </div>
    </div>

  </div>

}

RepoList.propTypes = {}

export default React.memo(RepoList)
