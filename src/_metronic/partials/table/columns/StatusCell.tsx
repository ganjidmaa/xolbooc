import {FC} from 'react'
import clsx from "clsx"
import { statusMasterInfo, LightColor, AppointmentStatus, couponClasses, couponStatusNames } from "../../../../_metronic/helpers"

type Props = {
  data?: number | string
}

const StatusCell: FC<Props> = ({data}) => {

return (<> 
    {data !== undefined && <div className={clsx('badge', 
        (
          statusMasterInfo.filter(status => status.value === String(data))[0]?.label ||
          LightColor.filter(status => status.value === data)[0]?.label ||
          couponClasses.filter(status => status.status === data)[0]?.class 
        )
      )}
    >
      {(
        statusMasterInfo.filter(status => status.value === String(data))[0]?.name ||
        AppointmentStatus.filter(status => status.value === data)[0]?.name ||
        couponStatusNames.filter(status => status.status === data)[0]?.name 
      )}
    </div>}

  </>)
}
export {StatusCell}
