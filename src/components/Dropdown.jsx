import { useEffect, useState } from 'react';
import Select from 'react-select';

function Dropdown() {
    const [datas, setDatas] = useState([]);
    const [userSelect, setUserSelect] = useState("");
    const [isShow, setIsShow] = useState(false);


    const getBerries = async() => {
        const berries = await fetch('https://pokeapi.co/api/v2/berry/')
        const value = await berries.json()
        let result = value.results.map(data => {
            return{
                value: data.url,
                label: data.name
            }
        })
        setDatas(result.sort((a,b) => a.label.localeCompare(b.label)))
    };
    
    useEffect(() => {
        getBerries()
    },[]);

    const handleSubmit = () => {
        setIsShow(state => !state)
    };

    const handleChange = (value) => {
        setUserSelect(value)
    };

    return(
        <div>
            <Select options={datas} onChange={(e) => handleChange(e.value)}></Select>
            <br />
            <button onClick={() => handleSubmit() } disabled={!userSelect}>{isShow ? "Hide Button" : "Search"}</button>
            <h1>{isShow ? userSelect : " "}</h1>
        </div>
    )

}

export default Dropdown;