import {useEffect} from 'react'
import { CommentEditModalFormWrapper } from './CommentEditModalFormWrapper'
import { CommentEditModalHeader } from './CommentEditModalHeader'

const CommentEditModal = () => {
  useEffect(() => {
    document.body.classList.add('modal-open')
    return () => {
      document.body.classList.remove('modal-open')
    }
  }, [])

  return (
    <>
      <div
        className='modal fade show d-block'
        id='kt_modal_add_comment'
        role='dialog'
        tabIndex={-1}
        aria-modal='true'
      >
        {/* begin::Modal dialog */}
        <div className='modal-dialog modal-dialog-centered mw-650px'>
          <div className='modal-content'>
            <CommentEditModalHeader />
            <div className='modal-body scroll-y mx-5 mx-xl-15 my-7'>
              <CommentEditModalFormWrapper />
            </div>
          </div>
        </div>
      </div>
      <div className='modal-backdrop fade show'></div>
    </>
  )
}

export {CommentEditModal}
