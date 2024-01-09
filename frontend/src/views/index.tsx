import Wrapper from '../components/Index/Wrapper'
import PopularDishes from '../components/Index/PopularDishes'
import Partners from '../components/Index/Partners'
import Reviews from '../components/Index/Reviews'
import Footer from '../components/Index/Footer'
import React, { useEffect, useState } from 'react'
import { getWebSettings } from '../helpers/web'

export interface webSettingsProps {
  MainPhoto: string
  MainTitle: string
  MainDesc: string
  RestaurantDesc: string
}
export const initWebSettings: webSettingsProps = {
  MainPhoto: '',
  MainTitle: '',
  MainDesc: '',
  RestaurantDesc: '',
}

function Index() {
  const [loading, setLoading] = useState(false)
  const [webSettings, setWebSettings] =
    useState<webSettingsProps>(initWebSettings)

  const fetchSettings = async () => {
    setLoading(false)
    try {
      const res: any = await getWebSettings()
      if (res && res.status !== 200) {
        throw new Error('Failed to fetch settings.')
      }

      const result = await res.data.webSettings
      setWebSettings(result)
      setLoading(true)
    } catch (e: any) {
      console.log(e && e.message)
    }
  }

  useEffect(() => {
    fetchSettings().then()
  }, [])

  return (
    <>
      <Wrapper loading={loading} webSettings={webSettings} />
      <PopularDishes />
      <Partners loading={loading} webSettings={webSettings} />
      <Reviews />
      <Footer />
    </>
  )
}

export default Index
