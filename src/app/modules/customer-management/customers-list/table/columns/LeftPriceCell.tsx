import {FC} from 'react'
import {NumericFormat as NumberFormat} from 'react-number-format';

type Props = {
  price?: string
}

const LeftPriceCell: FC<Props> = ({price}) => (
  <> {price && <div className='badge badge-light-danger fw-bold fs-7 align-self-start'>
      <NumberFormat
          className="pt-2"
          value={price} 
          displayType={'text'}
          thousandSeparator={true}
      />
      <span className='pt-2'>{' ₮'} </span>
    </div>
  }</>
)

export {LeftPriceCell}
