import React, { useEffect, useRef, useState } from 'react';
import Nav from '../components/nav';
import { SummaryType } from '../types/summary';
import { useNavigate } from 'react-router-dom';

const AllSummaries: React.FC = () => {
    const [ summaries, setSummaries ] = useState<SummaryType[]>([])
    const deleteRef = useRef(false);
    const navigate = useNavigate();

    const handleDelete = async(id: number) => {
        await fetch("http://localhost:3000/api/deleteSummary", {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id: id.toString() }),
        });
        deleteRef.current = true;
    }

    const fetchSummaries = async () => {
        const response = await fetch("http://localhost:3000/api/getSummaries", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const summaries = await response.json();
        setSummaries(summaries);
    };

    useEffect(()=> {
        fetchSummaries();
        const interval = setInterval(fetchSummaries, 2000); 
        return () => clearInterval(interval); 
    }, [])

    useEffect(() => {
        if(deleteRef.current){
            fetchSummaries();
        }
    }, [deleteRef.current]);

    return (
        <>
            <Nav/> 
            <ul className="flex flex-col items-center mb-20">
                {summaries.map(summary => (
                    <li key={summary.id} className="w-full flex justify-center">
                        <div className='w-10/12 bg-[#1C1E23] text-[#9198A1] rounded-lg p-5 mt-10 flex justify-between items-center'>
                            <div 
                                className='w-full'
                                onClick={()=> {
                                    navigate(`/summary?id=${summary.id}`)
                                }}
                            >
                                <h2 className='mb-5'>{summary.link}</h2>
                                {summary.isComplete ? (
                                    <img src={summary.image} alt="summary" className='rounded-lg'/>
                                ) : (
                                    <p>Creating Summary...</p>
                                )}
                            </div>
                            {summary.isComplete && (
                                <button 
                                    className='bg-[#ED5E69] text-white rounded-lg p-2 ml-4'
                                    onClick={() => handleDelete(summary.id)}
                                >
                                    Delete
                                </button>
                            )}
                        </div>
                    </li>
                )).reverse()}
            </ul>
        </>
    );
};

export default AllSummaries;