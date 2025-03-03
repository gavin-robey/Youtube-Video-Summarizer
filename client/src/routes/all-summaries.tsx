import React from 'react';
import Nav from '../components/nav';

const AllSummaries: React.FC = () => {
    const summaries = [
        { id: 1, title: 'Summary 1', content: 'This is the first summary.' },
        { id: 2, title: 'Summary 2', content: 'This is the second summary.' },
        { id: 3, title: 'Summary 3', content: 'This is the third summary.' },
    ];

    return (
        <>
            <Nav/> 
            <h1>All Summaries</h1>
            <ul>
                {summaries.map(summary => (
                    <li key={summary.id}>
                        <h2>{summary.title}</h2>
                        <p>{summary.content}</p>
                    </li>
                ))}
            </ul>
        </>
    );
};

export default AllSummaries;