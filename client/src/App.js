import React, { useEffect, useState } from 'react';
import axios from 'axios'

//setup axios
axios.defaults.baseURL = process.env.REACT_APP_API + ""
axios.defaults.withCredentials = true

export default function App() {
    const [count, setCount] = useState(0)
    useEffect(() => {
        get()
    }, [])

    const get = async () => {
        const get = await axios.get('/')
        console.log(get.data);
        setCount(get.data.count ?? 0)
    }

    const add = async () => {
        const add = await axios.post('/')
        console.log(add.data);
        setCount(add.data.count ?? 0)
    }

    console.log("rendering....");

    return <div>
        <button onClick={add}>Increment</button>
        <h1>{count}</h1>
    </div>;
}
