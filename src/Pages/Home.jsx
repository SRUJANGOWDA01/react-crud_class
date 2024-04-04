import React, { useEffect, useState } from 'react'
import UserApi from '../API/UserApi'
import { toast } from 'react-toastify'
import { NavLink } from 'react-router-dom'
import ReactPaginate from 'react-paginate'

function Home() {
  const [ users,setUsers ] = useState([])

  const [index,setIndex] = useState(0) // beginning index

  const itemsPerPage = 5
  const endIndex = index + itemsPerPage; //ending index
  const pCount = Math.ceil( users.length / itemsPerPage ) // page count

  //current active page items
  const currentUsers = users.slice(index,endIndex)

  const readHandler = async () => {
    await UserApi.readAll().then(res => {
      console.log(`data = `, res)
      setUsers(res.data.users)
    }).catch(err => {
      console.log(err)
      toast.error(err.response.data.msg)
    })
  }

  useEffect(() => {
    readHandler()
  },[])

  return (
    <div className="container">
       <div className="row">
        <div className="col-md-12 text-center">
          <table className="table table-bordered table-striped table-hovered ">
            <thead>
              <tr>
                <th colSpan={6}>
                  <h4 className="display4 text-success-text-center">Users Data</h4>
                </th>
              </tr>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Mobile</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {
                currentUsers && currentUsers.map((item,index) => {
                  return (
                    <tr key={index} className="text-center">
                      <td> { item._id } </td>
                      <td> { item.name } </td>
                      <td> { item.email } </td>
                      <td> { item.mobile } </td>
                      <td> { item.isActive ? <strong className='text-success'>Active</strong> : <strong className='text-danger'>Blocked</strong> } </td>
                      <td>
                        <NavLink className="btn btn-sm btn-info" title="Edit">
                          <i className="bi bi-pencil"></i>
                        </NavLink>
                        <button className="btn btn-sm btn-danger" title='Delete'>
                          <i className='bi bi-trash'></i>
                        </button>
                      </td>
                    </tr>
                  )
                })
              }
            </tbody>
            <tfoot>
              <ReactPaginate pageCount={pCount}/>
            </tfoot>
          </table>
        </div>
       </div>
    </div>
  )
}

export default Home
