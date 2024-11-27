import { useEffect, useState } from "react"
import { getCityName, getWeather } from "../services/API"
import SAMPLE_DATA from '../SampleData.json'

const SAMPLE_LOCATION = {
	results: [
		{
			address_components: [
				{
					long_name: 'Jacksonville',
					short_name: 'Jacksonville',
					types: ['locality', 'political'],
				},
			],
		},
	],
}

interface UseDataProps {
  metric: string,
  devMode?: boolean
}

const useData = ({
  metric,
  devMode = false
}: UseDataProps) => {
  const [weather, setWeather] = useState<any>({})
  const [location, setLocation] = useState<any>({})

  useEffect(() => {
    if (devMode) {
      setWeather(SAMPLE_DATA)
      setLocation(SAMPLE_LOCATION)
      return
    }
    
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords
        const lat = parseFloat(latitude.toFixed(2))
        const lon = parseFloat(longitude.toFixed(2))
        getWeather(lat, lon)
          .then((data: any) => {
            setWeather(data)
          })
          .catch((err: any) => {
            console.log(err)
          })
        getCityName(lat, lon)
          .then((data: any) => {
            setLocation(data)
          })
          .catch((err: any) => {
            console.log(err)
          })
      },
      (err) => {
        console.log(err)
        setWeather(SAMPLE_DATA)
        setLocation(SAMPLE_LOCATION)
      }
    )
  }, [devMode])

  return {
    weather,
    location
  }
}


export default useData