import {useEffect, useState} from 'react'
import {MenuComponent} from '../../../../../../_metronic/assets/ts/components'
import {initialQueryState, KTSVG} from '../../../../../../_metronic/helpers'
import {useQueryRequest} from '../../core/QueryRequestProvider'
import {useQueryResponse} from '../../core/QueryResponseProvider'

const CommentFilter = () => {
  // ...existing code remains exactly the same, just renamed component...
  const {updateState} = useQueryRequest()
  const {isLoading} = useQueryResponse()
  const [role, setRole] = useState<string | undefined>()
  const [lastLogin, setLastLogin] = useState<string | undefined>()

  useEffect(() => {
    MenuComponent.reinitialization()
  }, [])

  const resetData = () => {
    updateState({filter: undefined, ...initialQueryState})
  }

  const filterData = () => {
    updateState({
      filter: {role, last_login: lastLogin},
      ...initialQueryState
    })
  }

  return (
    <div>
      {/* Add your JSX elements here */}
    </div>
  )
}

export {CommentFilter}
