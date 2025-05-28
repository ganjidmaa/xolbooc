import {FC,} from 'react'
import {CustomerImageData} from '../../core/_models'
import {deleteCustomerImage} from '../../core/_requests'
import { arrow } from '@popperjs/core'
type Props = {
  item: CustomerImageData
  refetch: any
}
const ImageItem: FC<Props> = ({item, refetch}) => {
  const APP_URL = process.env.REACT_APP_URL
  var image_url = APP_URL + 'storage/thumb-' + item.image_name
  
  async function ClickHandler(): Promise<void> {
    try {
      const response = await deleteCustomerImage(item.id);
      if (response) 
        refetch()
    } catch (error) {
      console.error(error);
    }
  }

  const imgClick = () => {
    window.open(APP_URL + 'storage/' + item.image_name)
  }

  return (
    <>
      <div className={`card`} style={{height: 225, width: 150, margin: 10}}>
            <span className='card-label fw-bold mb-1' style={{fontSize: 12}}>{item.caption +''} </span>
        
          <img style={{height: 150, width: 150, borderRadius: 6.175, marginBottom: 10}} onClick={imgClick} src={image_url} alt={item.caption}/>
        <button type='button' onClick={ClickHandler} className='btn btn-danger'>
        <i className="bi bi-trash" style={{fontSize: 20}}></i>
        </button>
      </div>
    </>
  )
}

export {ImageItem}
