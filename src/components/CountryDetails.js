import React, {useEffect, useState} from 'react'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios'


function CountryDetails() {

  const [detail, setDetail] = useState(null)

  const {alpha3code} = useParams()

  useEffect(() => {
    async function makeRequest(){
        let res =  await axios.get(`https://ih-countries-api.herokuapp.com/countries/${alpha3code}`)
        let data = {
            capital: res.data.capital[0],
            area: res.data.area,
            bordersAlpha: res.data.borders,
            borders: []
        }

        let borderPromises = []

        data.bordersAlpha.forEach(async (borderAlpha) => {
            borderPromises.push(axios.get(`https://ih-countries-api.herokuapp.com/countries/${borderAlpha}`))
            
        })

        let countriesResponse = await Promise.all(borderPromises)
        data.borders = countriesResponse.map((country) => {
            return country.data.name.common
        })        
        setDetail(data)


     }
     makeRequest()

  }, [alpha3code])
  


  if (!detail){
    return <p>Loading . . .</p>
  }

  const {capital, area, borders, bordersAlpha} = detail

  return (
    <div>
        <h3>Capital: {capital}</h3>
        <h5>Area: {area}km<sup>2</sup></h5>
        {
            borders.map((country, index) => {
                return (
                    <div>
                          <Link to={`/${bordersAlpha[index]}`}>{country}</Link>
                    </div>
                )
            })
        }
    </div>
  )
}

export default CountryDetails