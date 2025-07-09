import { useState } from 'react'
import './Home.css'
import { useNavigate } from 'react-router-dom'
import { useTable, useGlobalFilter, useSortBy, usePagination} from 'react-table'
import * as React from 'react'
import axios from 'axios'
import Popup from '../components/popup'
import { useMemo } from 'react'

const Home =()=>{

  const [book, setBook] = useState([])

  const [name, setName] = useState('')

  const navigate = useNavigate();
    const redirect = () =>{
        navigate('/checked');
        window.location.reload()
    }

  const getAllBooks =()=>{
    axios.get("http://localhost:8081/seeAvailBooks").then((res)=>{
      setBook(res.data)
      if(res.data == ""){
            document.getElementById("App").innerHTML = "It seems no books are available right now";
      }
    })
  }

  window.onload = function(){
   getAllBooks();
  }

  const [showPopup , setShowPopup] = useState(false)

  const getInfo = async(book)=>{
   await axios.get(`http://localhost:8081/info/${book.title}`).then((res)=>{
      console.log(res.data); 
      document.getElementById('about').innerHTML = `About book: ${book.title}`
      document.getElementById('info').innerHTML = res.data
    })
  
  }

  const checkOutBook = async(book)=>{
    let name = document.getElementById('name').value
      if(name.match(/^[a-z0-9]+$/i)){
        window.alert("You need a first and last name")
      }  
    else if(name.match(/^([a-zA-Z0-9])+\s*[a-zA-Z0-9]+$/)){
        await axios.delete(`http://localhost:8081/checkOut/${book.title}?name=${name}`).then((res)=>{
        console.log(res.data)
        window.alert(`${book.title} by ${book.author} has been checked out by ${name}, Who has three weeks to return it. Thank You!`)
        window.location.reload()
     }) 
    } 
      else{
      window.alert("Name cannot be empty or contain special characters or more than one space. You need just a first and last name")
    }
  }

  const columns = useMemo(()=>[
    {Header: "Title", accessor: "title"},
    {Header: "Author", accessor: "author"},
    {Header: "Genre", accessor:"genre"},
    {Header:"About",accessor:"about",
      Cell:props=>(<button className="about-btn" onClick={()=>{
        setShowPopup(true);
        getInfo(props.cell.row.original);
      } }>i</button>)
    },
    {Header:"Checkout",accessor:"checkOut",
      Cell:props=>(<button className="check-btn"
      onClick={()=>checkOutBook(props.cell.row.original)}>CheckOut</button>)
    }
  ],[])

  const {getTableProps,getTableBodyProps,state,page,headerGroups,prepareRow,setGlobalFilter,pageCount
      ,previousPage,nextPage, canPreviousPage, canNextPage, gotoPage} = 

    useTable({columns, data : book, initialState:{pageSize:5}},
      useGlobalFilter,useSortBy,usePagination);


      const {globalFilter,pageIndex} = state;

    return (
      <>
    <title>LIBRARY!</title>
    <div id='App'>
     <h1 id='lib'>Library Books here are available for Checkout</h1>

     <Popup showPopup={showPopup} closePopup={()=>setShowPopup(false)}>
      <h2 id='info'></h2>
      <h2 id='about'></h2>
     </Popup>

            <input type='search' className='search-inp'
            value = {globalFilter} placeholder='Search Book title or genre' onChange={e=>setGlobalFilter(e.target.value)}/>

¶§§§§§§§§§§§§§§§¶

     <input  id='name' placeholder='Enter your first and last name here' type='text' value={name} onChange={e=>setName(e.target.value)}/>

        <table className='display' {...getTableProps()}>
           <thead>
            {headerGroups.map((hg)=>(
              <tr {...hg.getHeaderGroupProps()} key={hg.id}>
               <th>No</th>
              {hg.headers.map((column)=>(
                
                <th {...column.getHeaderProps(column.getSortByToggleProps())} key={column.id} >
                  {column.render("Header")} {column.isSorted && <span>{column.isSortedDesc ? "↑":"↓"}</span>}</th>
              ))}

              </tr>
            ))}
              </thead>
            
            <tbody {...getTableBodyProps()}>
             {page.map((row)=>{
              prepareRow(row);
              return(<tr {...row.getRowProps()} key={row.id}>
              
              <td className='count'></td>
              {row.cells.map((cell)=>(
                <td {...cell.getCellProps()} key={cell.id}>{cell.render("Cell")}</td>
              ))}

              </tr>)
            
            })}

            </tbody>

            </table>

 <div className='pagination'>
           <button className='page-btn' disabled={!canPreviousPage} onClick={()=>gotoPage(0)}>ά First</button> 
           <button className='page-btn' disabled={!canPreviousPage}  onClick={previousPage}> ← Prev</button> 
           <span className='counter'>Page {pageIndex+1} of {pageCount}</span>
           <button className='page-btn' disabled={!canNextPage} onClick={nextPage}>Next →</button>
            <button className='page-btn' disabled={!canNextPage} onClick={()=>gotoPage(pageCount-1)}>Last Ω</button>
          </div>
          
  </div>

<button className="redirect" onClick={redirect}>See unavailable books</button>
  </>
  
  )

  }
 
export default  Home
