import Wrapper from '../components/Index/Wrapper.tsx'
import PopularDishes from '../components/Index/PopularDishes.tsx'
import Partners from '../components/Index/Partners.tsx'
import Reviews from '../components/Index/Reviews.tsx'
import Footer from '../components/Index/Footer.tsx'
import React, { useEffect, useState } from 'react'
import { getWebSettings } from '../helpers/web.tsx'
import { initWebSettings, webSettingsProps } from '../helpers/types.tsx'

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
