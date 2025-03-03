import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
    const [ inputValue, setInputValue] = useState<String>();
    return (
        <div className="">
            <div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 flex justify-center bg-[#1C1E23] text-white w-1/2 p-10 rounded-lg gap-5">
                    <input className="w-full bg-[#20242b] rounded-lg pl-5 text-[#9198A1] outline-none" type="text" onChange={(e) => setInputValue(e.target.value)} />
                    <button className="bg-[#2B7FFF] rounded-lg p-3 text-gray-200" type="submit">Submit</button>
                </div>
            </div>
        </div>
    );
};

export default Home;