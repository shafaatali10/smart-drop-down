import React, { useState, useEffect } from 'react'
import SearchIcon from './icons/search.png'

function Child(props) {

    // ************ USE EFFECT *********************
    useEffect(() => {
        // Mock Get
        fetch("http://localhost:3001/currentUser", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
        }).then(res => res.json())
        .then(result => setIsAdmin(result.name==='admin'))
    }, [])

    // ************ USE STATES *********************
    const [sliceCount, setSliceCount] = useState(props.maxDisplay);
    const [filterValue, setFilterValue] = useState('');
    const [displayCountries, setDisplayCountries] = useState(props.countries)
    const [isAdmin, setIsAdmin] = useState(false)

    // ************ VALUES FROM PROPS *********************
    const setParentValue = props.setParentValue;
    const addAndSelect = props.addAndSelect;
    const maxDisplay = props.maxDisplay;
    const hiddenDisplay = displayCountries.length - maxDisplay;


    // ************ EVENT HANDLERS *********************
    const onFilterChange = (eve) => {
        setFilterValue(eve.target.value);

        if (!eve.target.value || eve.target.value.length === 0) {
            setDisplayCountries(displayCountries);
            setSliceCount(maxDisplay);
        } else {
            let tempArray = [];

            if (eve.target.value && eve.target.value.length > 0) {
                tempArray = props.countries.filter(allCountries => allCountries.name.toUpperCase().includes(eve.target.value.toUpperCase()))
            }
            setDisplayCountries(tempArray);
            setSliceCount(displayCountries.length);
        }
    }

    const showAll = (eve) => {
        setSliceCount(displayCountries.length);
    }

    
    // ************ RENDER *********************

    return (
        displayCountries && 
        <div style={{ border: '1px solid gray', width: '220px', margin: '0 auto' }}>
            <div className='searchField'><img src={SearchIcon} />&nbsp;<input type="text" value={filterValue} onChange={onFilterChange} placeholder='Search...' /></div>
            {displayCountries.slice(0, sliceCount).map((country) =>
                <div key={country.id} className='countryStyle' onClick={setParentValue}>
                    {country.name}
                </div>,
            )}
            {displayCountries.length < 1 && isAdmin && <div> "{filterValue}" not found <button onClick={()=>addAndSelect(filterValue)}>Add &amp; Select</button></div>}
            {(sliceCount < displayCountries.length) && <div onClick={showAll} className='showAllStyle'> {hiddenDisplay} more...</div>}
        </div>
    )
}

export default Child
