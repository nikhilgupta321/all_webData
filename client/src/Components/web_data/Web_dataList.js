import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { SlArrowLeftCircle } from "react-icons/sl";
import { SlArrowRightCircle } from "react-icons/sl";
import auth from "../helper/auth-helper";

const Web_dataList = (props) => {
  const [data, setData] = useState([])
  const [allData, setAllData] = useState([])
  const [filterType, setFilterType] = useState('all');
  const [searchInput, setSearchInput] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(20);
  const navigate = useNavigate();

  const jwt = auth.isAuthenticated();
  let url = 'http://localhost:8080/api/webdata';

  const fetchData = async () => {
    try {
      const response = await axios.get(url, {
        headers: {
          authorization: `Bearer ${jwt.token}`,
        },
      });
      if (response.status === 200) {
        setAllData(response.data);
        setCurrentPage(1);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const filterTypeFromUrl = props.match?.params.filterType || 'all';
    setFilterType(filterTypeFromUrl);
    setSearchInput(new URLSearchParams(window.location.search).get('search') || '');
    fetchData();
  }, [props.match?.params.filterType, window.location.search]);

  // Combined useEffect for Search Filter and All Button filterType
  useEffect(() => {
    const filteredDataBySearch = allData.filter((val) =>
      val.content.toLowerCase().includes(searchInput.toLowerCase())
    );
    const filteredDataByType = filterType === 'all'
      ? allData
      : allData.filter((val) => val.status === filterType);
    setData(filterType === 'all' ? filteredDataBySearch : filteredDataByType);
    setCurrentPage(1);
  }, [searchInput, filterType, allData]);

  const handleFilterButtonClick = async (filterType) => {
    debugger
    setFilterType(filterType);
    fetchData();
    navigate(`/webdata/${filterType}`);
  };

  // Status Change function Alldata 
  const handleChangeStatus = async (e, value) => {
    const userConfirmed = window.confirm('Do you really want to Change.');
    if (userConfirmed) {
      const status = { status: e.target.value };
      try {
        const response = await axios.put(`${url}/${value.id}`, status, {
          headers: {
            authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
          }
        });
        if (response.status === 200) {
          fetchData();
        }
        console.log('API Response:', response.data);
      } catch (error) {
        console.error('Error making API request:', error);
      }
    } else {
      console.log('User canceled the action.');
    }
  };

  // Status Change Color 
  const statusColor = {
    pending: 'bg-orange-300',
    working: 'bg-yellow-100',
    completed: 'bg-blue-300',
    info: 'bg-lime-300',
    'last-work': 'bg-purple-300',
    journal: 'bg-teal-300',
    urgent: 'bg-red-300',
    cancelled: 'bg-blue-300'
  };
  const getStatusColorClass = (status) => statusColor[status] || '';

  // format Date and Time
  const formatDate = (dateString) => {
    const options = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    };
    const formattedDate = new Date(dateString).toLocaleString('en-US', options);
    return formattedDate;
  };
  // Paginaction this page 
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(data.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <>
      {data.length === 0 ? (
        <h1>Loading...</h1>
      ) : (
        <>
          <div className="bar-nav justify-between">
            <div className='space-x-1 flex'>

              <Link to={"/webdata/addentris"}>
                <button className="w-auto p-2 text-center bg-green-700 rounded text-white uppercase text-sm">add now</button>
              </Link>
              <button className={`w-auto px-1 py-2 text-center rounded text-black-200 text-xs uppercase ${filterType === "all" ? 'bg-blue-500' : 'bg-gray-300'}`} onClick={() => handleFilterButtonClick("all")}>All Entries</button>
              <button className={`w-auto px-1 py-2 text-center rounded text-black-200 text-xs uppercase ${filterType === "pending" ? 'bg-blue-500' : 'bg-gray-300'}`} onClick={() => handleFilterButtonClick("pending")}>Pending</button>
              <button className={`w-auto px-1 py-2 text-center rounded text-black-200 text-xs uppercase ${filterType === "working" ? 'bg-blue-500' : 'bg-gray-300'}`} onClick={() => handleFilterButtonClick("working")}>Working</button>
              <button className={`w-auto px-1 py-2 text-center rounded text-black-200 text-xs uppercase ${filterType === "completed" ? 'bg-blue-500' : 'bg-gray-300'}`} onClick={() => handleFilterButtonClick("completed")}>Completed</button>
              <button className={`w-auto px-1 py-2 text-center rounded text-black-200 text-xs uppercase ${filterType === "info" ? 'bg-blue-500' : 'bg-gray-300'}`} onClick={() => handleFilterButtonClick("info")}>Information</button>
              <button className={`w-auto px-1 py-2 text-center rounded text-black-200 text-xs uppercase ${filterType === "last-work" ? 'bg-blue-500' : 'bg-gray-300'}`} onClick={() => handleFilterButtonClick("last-work")}>Last-work</button>
              <button className={`w-auto px-1 py-2 text-center rounded text-black-200 text-xs uppercase ${filterType === "journal" ? 'bg-blue-500' : 'bg-gray-300'}`} onClick={() => handleFilterButtonClick("journal")}>Journal</button>
              <button className={`w-auto px-1 py-2 text-center rounded text-black-200 text-xs uppercase ${filterType === "urgent" ? 'bg-blue-500' : 'bg-gray-300'}`} onClick={() => handleFilterButtonClick("urgent")}>Urgent</button>
              <button className={`w-auto px-1 py-2 text-center rounded text-black-200 text-xs uppercase ${filterType === "cancelled" ? 'bg-blue-500' : 'bg-gray-300'}`} onClick={() => handleFilterButtonClick("cancelled")}>Cancelled</button>
            </div>
            <div className='flex'>
              <div className="w-auto  mr-2 py-2 text-center rounded text-green-700 text-sm">
                {indexOfFirstItem + 1} - {indexOfLastItem > data.length ? data.length : indexOfLastItem} of {data.length}
              </div>
              <SlArrowLeftCircle className='hover:text-red-500' onClick={() => setCurrentPage(currentPage > 1 ? currentPage - 1 : 1)}
                style={{ height: '25px', width: '25px', marginRight: '8px', }} />
              <SlArrowRightCircle className='hover:text-red-500' onClick={() =>
                setCurrentPage(currentPage < pageNumbers.length ? currentPage + 1 : pageNumbers.length)} style={{ height: '25px', width: '25px' }} />
            </div>
          </div >
          <div className="flex flex-col mt-16">
            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block w-full py-2 sm:px-6 lg:px-2">
                <div className="overflow-hidden">
                  <table className="min-w-full border text-sm font-light border-slate-700">
                    <thead className="border-b font-normal uppercase">
                      <tr className='bg-gray-100'>
                        <th scope="col" className="border p-1 text-xs w-12">s.no.</th>
                        <th scope="col" className="border p-1 text-xs ">Work</th>
                        <th scope="col" className="border p-1 text-xs w-1/12">Date</th>
                        <th scope="col" className="border p-1 text-xs w-1/12">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        currentItems.map((val, ind) => {
                          return (
                            <tr className={`border border-black ${getStatusColorClass(val.status)}`} key={ind} id={ind}>
                              <td className="border p-1 font-normal text-center">{ind + 1}</td>
                              <td className="border p-1 font-normal" dangerouslySetInnerHTML={{ __html: val.content }}></td>
                              <td className="border p-1 font-normal uppercase">{val.createdby}<br />{formatDate(val.created_at)}</td>
                              <td className="border p-1 font-normal ">
                                <select value={val.status} onChange={(e) => handleChangeStatus(e, val)} className='w-full border-2 border-gray-400 focus:ring-blue-500 focus:border-blue-500  rounded-lg'>
                                  <option value="pending" >Pending</option>
                                  <option value="working" >Working</option>
                                  <option value="completed">Completed</option>
                                  <option value="info" >Information</option>
                                  <option value="last-work" >Last Work</option>
                                  <option value="journal" >Journal</option>
                                  <option value="urgent" >Urgent</option>
                                  <option value="cancelled" >Cancelled</option>
                                </select>
                              </td>
                            </tr>
                          )
                        })
                      }
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  )
}
export default Web_dataList
