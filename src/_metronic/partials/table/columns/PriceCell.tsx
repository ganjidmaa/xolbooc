import {FC} from 'react'
import { NumericFormat as NumberFormat } from 'react-number-format'

type Props = {
  price?: string
  number?: string
}

const PriceCell: FC<Props> = ({price = '0', number = '0'}) => (
  <> 
  {price != '0' && <div className='align-self-start'>
      <NumberFormat
          className="pt-2"
          value={price} 
          displayType={'text'}
          thousandSeparator={true}
      />
      <span className='pt-2'>{' ₮'} </span>
    </div>
  }
  {number != '0' && <div className='align-self-start'>
    <NumberFormat
        className="pt-2"
        value={number} 
        displayType={'text'}
        thousandSeparator={true}
    />
  </div>
}
  </>
)

export {PriceCell}
