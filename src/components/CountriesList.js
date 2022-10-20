import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

function CountriesList() {

  const [countries, setCountries] = useState([])  

  useEffect(() => {
    async function makeRequest(){
       let res =  await axios.get('https://ih-countries-api.herokuapp.com/countries')
       let cloneData = structuredClone(res.data)
       cloneData.sort((a, b) => {
            if (a.name.common > b.name.common) {
                return 1
            }
            else if (a.name.common < b.name.common) {
                return -1
            }
            else {
                return 0
            }
       })
       setCountries(cloneData)
    }
    makeRequest()
  }, [])
  

  return (
    <div>
        {
          countries.map((country) => {
            return (
                <div key={country.alpha3Code}>
                    <img src={`https://flagpedia.net/data/flags/icon/72x54/${country.alpha2Code.toLowerCase()}.png`} />
                    <Link to={`/${country.alpha3Code}`}>{country.name.common}</Link>
                </div>
            )
          })  
        }
    </div>
  )
}

export default CountriesList