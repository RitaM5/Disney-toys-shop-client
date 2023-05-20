import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../Providers/AuthProvider';
import MyToysRows from './MyToysRows';
import { FiArrowDown } from 'react-icons/fi';
const MyToys = () => {
    const { user } = useContext(AuthContext);
    const [addToys, setAddToys] = useState([]);
    const [sortData, setSortData] = useState(false);
    const url = `https://disney-dolls-server.vercel.app/sellerToys?email=${user?.email}`;
    useEffect(() => {
        fetch(url)
            .then(res => res.json())
            .then(data => {
                setAddToys(data)
            }
            )
    }, [url]);
    const sortToysData = () => {
        setSortData(true)
        console.log(sortData);
    }
    const handleDelete = id => {
        const proceed = confirm('Are you sure you want to delete');
        if (proceed) {
            fetch(`https://disney-dolls-server.vercel.app/product/${id}`, {
                method: 'DELETE'
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    if (data.deletedCount > 0) {
                        alert('deleted successfully');
                        const remaining = addToys.filter(addToy => addToy._id !== id);
                        setAddToys(remaining);
                    }
                })
        }
    }
    return (
        <div className=' bg-gray-300'>
            <div className='my-container'>
                <h1 className='text-center text-2xl font-semibold underline underline-offset-4 mt-3 text-white'>My Tyos</h1>
                <div className="w-full my-8 rounded p-4">
                    <table className="overflow-x-auto overflow-hidden table w-full">
                        {/* head */}
                        <thead className=''>
                            <tr className='text-center'>
                                <th>No</th>
                                <th>Seller Name</th>
                                <th>Toys Name</th>
                                <th>IMAGE</th>
                                <th>CATEGORY</th>
                                <th>QUANTITY</th>
                                <th className='inline-flex items-center'>PRICE<FiArrowDown onClick={sortToysData} className='ml-1' /></th>
                                <th>DETAILS</th>
                                <th>ACTION</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                addToys.map((toy, index) => <MyToysRows
                                    key={toy._id}
                                    toy={toy}
                                    index={index}
                                    handleDelete={handleDelete}
                                ></MyToysRows>)
                            }
                        </tbody>

                    </table>
                </div>
            </div>
        </div>
    );
};

export default MyToys;