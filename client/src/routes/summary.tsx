import React, { useState, useEffect } from 'react';
import Nav from '../components/nav';
import { useLocation } from 'react-router-dom';
import { SummaryType } from '../types/summary';

const Summary: React.FC = () => {
    const [ summary, setSummary ] = useState<SummaryType>({ 
        id: 0,
        link: "",
        image: "",
        isComplete: false,
        summary: "",
    });
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const id = queryParams.get('id');

    const getData = async() => {
        const data = await fetch("http://localhost:3000/api/getSummary", {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id:  id}),
        })
        const summary = await data.json();
        setSummary(summary)
    }

    useEffect(()=> {
        if(id){ getData() }
    }, [])

    return (
        <>
            <Nav/> 
            <div className='flex justify-center'>
                <div className='w-10/12 bg-[#1C1E23] text-[#9198A1] rounded-lg p-10 my-10 flex justify-between items-center'>
                    <div>
                        <h2 className='mb-10'>{summary.link}</h2>
                        {summary.isComplete ? (
                            <>
                                <img src={summary.image} alt="summary" className='rounded-lg'/>
                                <p className='mt-10'>{summary.summary}</p>
                            </>
                        ) : (
                            <p>Creating Summary...</p>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Summary;