import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
    const [ inputValue, setInputValue] = useState<String>();
    const navigate = useNavigate();

    const isValidLink = (link: String | undefined) : boolean => {
        const regex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/;
        return link ? regex.test(link as string) : false;
    }

    const submitLink = async() => {
        if(isValidLink(inputValue)){
            navigate(`/all-summaries`);
            await fetch("http://localhost:3000/api/send", {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({ link: inputValue }),
            });
        }else{
            alert("Must input a valid youtube link")
        }
    }

    return (
        <>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 bg-[#1C1E23] text-[#9198A1] w-1/2 p-10 rounded-lg">
                <h1 className='mb-5'>Input YouTube Link: </h1>
                <div className="flex justify-center gap-5">
                    <input className="w-full bg-[#20242b] rounded-lg pl-5 outline-none" type="text" onChange={(e) => setInputValue(e.target.value)} />
                    <button className={`rounded-lg p-3 ${inputValue ? 'bg-[#2B7FFF] text-gray-200' : 'bg-[#282C34]'}`} type="submit" disabled={!inputValue} onClick={submitLink}>Submit</button>
                </div>
            </div>
        </>
    );
};

export default Home;