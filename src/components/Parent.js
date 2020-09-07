import React, { useState, useEffect } from 'react'
import Child from './Child.js'
import SelectIcon from './icons/menu.png'
import './css/MyStyles.css'

function Parent() {

    // ************ USE STATE *********************
    const [countries, setCountries] = useState([])
    const [selectedCountry, setSelectedCountry] = useState('');
    const [showDropdown, setShowDropdown] = useState(false)


    // ************ USE EFFECT *********************
    useEffect(() => {
        // Mock Get
        fetch("http://localhost:3001/countries", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
        }).then(res => res.json())
        .then(result => setCountries(result))
    }, [])


    // ************ VARIABLES *********************

    const maxDisplay = 4;



    // ************ EVENT HANDLERS *********************

    const addAndSelect = (val) => {
    
        let newEntry = val.charAt(0).toUpperCase() + val.slice(1);

        let data = {
            id: newEntry.toUpperCase(),
            name: newEntry
        }

        // Mock post
        fetch("http://localhost:3001/countries", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }).then(() =>{

            countries.push(data);

            setSelectedCountry(data.name);
            setShowDropdown(false);
    
            logCountry(data.name);
        }            
        );

    }

    const setParentValue = (eve) => {        

        let tempVal = eve.target.innerHTML;

        setSelectedCountry(tempVal);
        setShowDropdown(false);

        logCountry(tempVal);
    }

    function logCountry(country) {
        console.log(country)
    }

    

    // ************ RENDER *********************
    return (
        <div style={{margin:'0 auto', marginTop:'20px', width:'220px'}} >

            <div className='dropDown'>
                <input type="text" className='mainText' value={selectedCountry} readOnly={true} />
                <button style={{height:'30px', float:'right'}} onClick={() => setShowDropdown(!showDropdown)}><img src={SelectIcon} /></button>
            </div>

            {showDropdown && <Child countries={countries} setParentValue={setParentValue} maxDisplay={maxDisplay} addAndSelect={addAndSelect}/>}
        </div>
    )


}

export default Parent
