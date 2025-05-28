import {CRUD_RESPONSES, objectHasAttr} from '../../../../../_metronic/helpers'
import {getCustomerImages} from '../../core/_requests'
import {useMasterData} from '../../customers-list/provider/MasterDataProvider'
import {ImagesIndex} from './ImagesIndex'
import {CustomerImageData} from '../../core/_models'
import {useEffect, useState} from 'react'
import {useQuery} from 'react-query'
import {WarningAlert} from '../../../../../_metronic/helpers/alerts/Warning'
import {ErrorAlert} from '../../../../../_metronic/helpers/alerts/Error'
import {ImageItem} from './ImageItem'

export const ImagesWrapper = () => {
  const {customer} = useMasterData()
  const [dataImage, setDataImage] = useState<Array<CustomerImageData>>([])
  const {refetch, data} = useQuery(
    `images-${customer.id}`,
    () => {
      return getCustomerImages(customer.id)
    },
    {
      cacheTime: 0,
      enabled: true,
      onError: (err: any) => {
        console.error('getMembers error', err)
        err.response?.status === 403
          ? WarningAlert(CRUD_RESPONSES.failed_authorization)
          : ErrorAlert(CRUD_RESPONSES.error)
      },
      retryOnMount: false,
      retry: false,
    }
  )

  useEffect(() => {
    if (data && data.data) {
      const images = data.data
      setDataImage(images)
    }
  }, [data])

  if (objectHasAttr(customer)) {
    return (
      <div className='card mb-5 mb-xl-8' id='kt_customer_view_appointment_tab'>
        <div className='card-body p-9'>
          <div style={{display: 'flex', flexWrap: 'wrap', marginBottom: 15}}>
            {dataImage.map((item, index) => (
                <ImageItem key={index} item={item} refetch={refetch} />
            ))}
          </div>

          <ImagesIndex customer={customer} refetch={refetch} />
        </div>
      </div>
    )
  }

  return (
    <>
      {!objectHasAttr(customer) && (
        <div>
          <div className='card-px text-center pt-0 pb-15'>
            <p className='text-gray-400 fs-4 fw-bold py-7'>Эмчлүүлэгч ийн мэдээлэл олдсонгүй.</p>
          </div>
          <div className='text-center pb-0 px-5'>
            <img
              src='/media/illustrations/sketchy-1/4.png'
              alt=''
              className='mw-100 h-200px h-sm-325px'
            />
          </div>
        </div>
      )}
    </>
  )
}
