import React, { useState, useEffect } from "react";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin7Line } from "react-icons/ri";

import Data from '../Data/Data.json';

export default function Pagination() {
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;
  const [tableData, setTableData] = useState(Data);
  const [selectedRows, setSelectedRows] = useState(new Set());
  const [editIndex, setEditIndex] = useState(null);

  const[totalSelected,setTotalSelected] = useState(0);

  const [checked, setChecked] = useState(false); // Add this line

  const [records, setRecords] = useState([]);

  const npage = Math.ceil(tableData.length / recordsPerPage); 

  const numbers = [...Array(npage + 1).keys()].slice(1);

  const [selectedRowIds, setSelectedRowIds] = useState(new Set());
  

  const [checkboxes, setCheckboxes] = useState(
    Array(tableData.length).fill(false)
  );



  useEffect(() => {
    const firstIndex = (currentPage - 1) * recordsPerPage;
    const lastIndex = currentPage * recordsPerPage;
    const updatedRecords = tableData.slice(firstIndex, lastIndex);
    setRecords(updatedRecords);
  }, [currentPage, tableData]);

  const handleEdit = (index) => {
    setEditIndex(index);
  };

  const handleUpdate = (updatedData) => {
    const updatedTableData = [...tableData];
    updatedTableData[editIndex] = updatedData;
    setTableData(updatedTableData);
    setSelectedRows([]);
    setEditIndex(null);
  };

  const handleDelete = (index) => {
    const updatedData = tableData.filter((_, i) => i !== index);
    setTableData(updatedData);
    setSelectedRows([]);
    setEditIndex(null);
  };

  const handleCheckboxChange = (index) => {
    setSelectedRows((prevSelected) => {
      const updatedSelected = new Set(prevSelected);
      if (updatedSelected.has(index)) {
        updatedSelected.delete(index);
        setTotalSelected(totalSelected-1);
      } else {
        updatedSelected.add(index);
        setTotalSelected(totalSelected+1);
      }
      
      return updatedSelected;
    });

    setSelectedRowIds((prevSelectedRowIds) => {
      const updatedSelectedRowIds = new Set(prevSelectedRowIds);
      if (updatedSelectedRowIds.has(tableData[index].id)) {
        updatedSelectedRowIds.delete(tableData[index].id);
      } else {
        updatedSelectedRowIds.add(tableData[index].id);
      }
      return updatedSelectedRowIds;
    });
  };


  const handleInputChange = (e, field) => {
    const updatedValue = e.target.value;
    setTableData((prevData) => {
      const newData = [...prevData];
      newData[editIndex] = {
        ...newData[editIndex],
        [field]: updatedValue,
      };
      return newData;
    });
  };
  

  const handleDeleteSelected = () => {
  const updatedData = tableData.filter((_, index) => !selectedRows.has(index));
  setTableData(updatedData);
  setSelectedRows(new Set());
  setTotalSelected(0);
  setSelectedRowIds(new Set());
  setEditIndex(null);
};
  
  

  const PrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const ChangeCPage = (currentpage) => {
    setCurrentPage(currentpage);
  };

  const NextPage = () => {
    if (currentPage < Math.ceil(tableData.length / recordsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };


  const handleApplyChanges = () => {
    // Apply changes to the server or perform other necessary actions
    // Here, I'm calling handleUpdate to update the state and clear the editIndex
    handleUpdate(tableData[editIndex]);
    setEditIndex(null);
  };

    return(
        <>
        <section class="mx-auto w-full max-w-7xl px-4 py-4">
            <div className="flex justify-between pt-4">
                <input type="text" placeholder="Enter Value..." style={{all:"unset",border:"0.1rem solid lightgray",borderRadius:"0.3rem",padding:"0.3rem",width:"18rem"}} 
                onChange={(e)=>setSearch(e.target.value)}
                ></input>
                <RiDeleteBin7Line onClick={handleDeleteSelected} className="bg-red-400 text-white text-4xl p-2 rounded-md cursor-pointer"/>
            </div>
            <div class="mt-6 flex flex-col">
                <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                    <div class="overflow-hidden border border-gray-200 md:rounded-lg">
                    <table class="min-w-full divide-y divide-gray-200">
                        <thead class="bg-gray-50">
                        <tr>
                            <th
                                scope="col"
                                class="px-4 py-3.5 text-left text-sm font-normal text-gray-700"
                                >
                                <span>
                                <input
                                    type="checkbox"
                                    checked={checked}
                                    onChange={() => setChecked(prev => !prev)}
                                    className="cursor-pointer"
                                />
                                </span>
                                <span class="ml-4"></span>
                                <span>Name</span>
                                </th>
                                <th
                                scope="col"
                                class="px-12 py-3.5 text-left text-sm font-normal text-gray-700"
                                >
                                Email
                                </th>
                                <th
                                scope="col"
                                class="px-4 py-3.5 text-left text-sm font-normal text-gray-700"
                                >
                                Role
                                </th>
                                <th
                                scope="col"
                                class="px-4 py-3.5 text-left text-sm font-normal text-gray-700"
                                >
                                Actions
                                </th>
                                <th scope="col" class="relative px-4 py-3.5">
                            </th>
                        </tr>
                        </thead>
                        <tbody class="divide-y divide-gray-200 bg-white">
                        {
                        records.filter((item)=> {
                            return search.trim() === '' || item.name.toLowerCase().includes(search.toLowerCase());
                        }).map((item, i) => (
                            <tr key={i}>
                                <td class="whitespace-nowrap px-4 py-4">
                                    <div class="flex items-center">
                                        <div>
                                            <input type="checkbox" id={`checkbox-${item.id}`} onChange={() => handleCheckboxChange(i)}  checked={selectedRowIds.has(item.id)} className="cursor-pointer" />
                                        </div>
                                        <div class="ml-4">
                                            <div class="text-sm font-medium text-gray-900">
                                                {item.name}
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td class="whitespace-nowrap px-12 py-4">
                                    <div class="text-sm font-medium text-gray-900">{item.email}</div>
                                </td>
                                <td class="whitespace-nowrap px-4 py-4">
                                    <span class="inline-flex px-2 text-sm font-medium text-gray-900 leading-5">
                                        {item.role}
                                    </span>
                                </td>
                                <td class="whitespace-nowrap px-4 py-4 text-sm text-gray-700">
                                    <div className="flex gap-2">
                                        <div onClick={() => handleEdit(i)} className="border-2 p-2 rounded-md cursor-pointer"><FaEdit/></div>
                                        <div onClick={() => handleDelete(i)}  className="border-2 p-2 rounded-md text-red-500 cursor-pointer"><RiDeleteBin7Line /></div>
                                    </div>
                                </td>
                                <td class="whitespace-nowrap px-4 py-4 text-right text-sm font-medium">
                                </td>
                            </tr>
                        ))}
                     </tbody>
                    </table>
                    </div>
                </div>
                </div>
            </div>
            </section>
        
     {editIndex !== null && (
  <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-500 bg-opacity-75">
    <div className="bg-white p-4 rounded-md shadow-md">
      {/* Inline Edit Form */}
      <div className="flex flex-col gap-4">
        {/* Assuming you have an input for each property */}
        <input
          type="text"
          value={tableData[editIndex].name}
          onChange={(e) => handleInputChange(e, 'name')}
          placeholder="Name"
          className="border rounded-md px-3 py-2"
        />
        <input
          type="text"
          value={tableData[editIndex].email}
          onChange={(e) => handleInputChange(e, 'email')}
          placeholder="Email"
          className="border rounded-md px-3 py-2"
        />
        <input
          type="text"
          value={tableData[editIndex].role}
          onChange={(e) => handleInputChange(e, 'role')}
          placeholder="Role"
          className="border rounded-md px-3 py-2"
        />
        <div className="flex justify-end">
          <button
            onClick={handleApplyChanges}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Apply Changes
          </button>
        </div>
      </div>
    </div>
  </div>
)}


        <div class="flex justify-between max-w-[88rem] mx-auto">
            <div className="max-w-[88rem] px-4 text-gray-500">
                {totalSelected} of 46 row(s) selected.
            </div>
            <div className="flex items-center justify-between">
                <a href="#" className="mx-1 cursor-pointer text-sm font-semibold text-gray-900" onClick={PrevPage}>
                    ← Previous
                </a>

                {numbers.map((n) => (
                    <a href="#"  className={`mx-1 flex items-center rounded-md border px-3 py-1 text-gray-900 ${
      n === currentPage ? 'bg-red-400 text-white' : 'border-gray-400 hover:scale-105'
    }`} onClick={() => ChangeCPage(n)}>
                        {n}
                    </a>
                ))}

                <a href="#" className="mx-2 text-sm font-semibold text-gray-900" onClick={NextPage}>
                    Next →
                </a>
            </div>
        </div>
        <div className="py-4"></div>
        </>
    )
}