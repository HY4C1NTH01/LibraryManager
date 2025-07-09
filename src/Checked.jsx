import React from 'react'
import './Checked.css'
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Popup from '../components/popup'
import { useTable, useGlobalFilter, useSortBy, usePagination} from 'react-table'
function Checked() {

const [book, setBook] = useState([])

const [showPopup , setShowPopup] = useState(false)

    const navigate = useNavigate();
        const redirect = () =>{
            navigate('/');
            window.location.reload()
        }

    const getAllBooks =()=>{
      axios.get("http://localhost:8081/seeCheckedBooks").then((res)=>{     
          setBook(res.data)
        if(res.data == ""){
            document.getElementById("App").innerHTML = "It seems no books are checked out right now";
        }
    }
)}

    useEffect(()=>{
    getAllBooks();
  })

   const getInfo = async(book)=>{
   await axios.get(`http://localhost:8081/bookInfo/${book.title}`).then((res)=>{
      console.log(res.data); 
      document.getElementById('about').innerHTML = `About book: ${book.title}`
      document.getElementById('info').innerHTML = res.data
    })
  
  }

  const returnBook= async(book)=>{
     await axios.delete(`http://localhost:8081/return/${book.title}`).then((res)=>{
     console.log(res.data);
     window.alert(`${book.title} returned! Thank you`)
     })
        
  }

   const columns = React.useMemo(()=>[
      {Header: "Title", accessor: "title"},
      {Header: "Author", accessor: "author"},
      {Header: "Genre", accessor:"genre"},
      {Header:"About",accessor:"about",
        Cell:props=>(<button id="about-btn" onClick={()=>{
          setShowPopup(true);
          getInfo(props.cell.row.original);
        } }>i</button>)},
        {Header: "Checked out On", accessor: "checkOutDate"},
      {Header: "Checked out by", accessor: "checkedOutBy"},
      {Header: "Due to be returned on", accessor:"dueReturnDate"},
      {Header: "Return", accessor:"return",
        Cell:props=>(<button id="return-btn" onClick={()=>returnBook(props.cell.row.original)}>return</button>)
      }
   ],[])

 const {getTableProps,getTableBodyProps,state,page,headerGroups,prepareRow,setGlobalFilter,pageCount
      ,previousPage,nextPage, canPreviousPage, canNextPage, gotoPage} = 

    useTable({columns, data : book, initialState:{pageSize:5}},
      useGlobalFilter,useSortBy,usePagination);


      const {globalFilter,pageIndex} = state;

    

  return (
    <>
    <title>Un-available books</title>
    <div id='App'>
        <h1>These Books have been Checked out by someone</h1>
        
     <Popup showPopup={showPopup} closePopup={()=>setShowPopup(false)}>
      <h2 id='info'></h2>
      <h2 id='about'></h2>
     </Popup>

            <input type='search' className='search'
            value = {globalFilter} placeholder='Search Book title or genre' onChange={e=>setGlobalFilter(e.target.value)}/>


       <table id='table' {...getTableProps()}>
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

    <button id="home-btn" onClick={redirect}>HOME</button>
    </>
  )
}

export default Checked