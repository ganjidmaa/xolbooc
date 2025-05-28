import clsx from "clsx"
import React from "react"

type Props = {
    formik: any
}

const ServiceDetailAside: React.FC<Props> = ({formik}) => {
    return (
        <div className="d-flex flex-column gap-7 gap-lg-10 mb-7 me-lg-10 w-md-100 w-lg-400px">
            <div className="card card-flush py-4">
                <div className="card-header">
                    <div className="card-title">
                        <h2>Төлөв</h2>
                    </div>
                    <div className="card-toolbar">
                        <div className={
                            clsx("rounded-circle w-15px h-15px", 
                            {'bg-success': formik.values.status > 0 },
                            {'bg-danger': formik.values.status == 0})}>
                        </div>
                    </div>
                </div>
                <div className="card-body pt-0">
                    <select className="form-select mb-2" data-control="select2" 
                        {...formik.getFieldProps('status')}
                    >
                        <option></option>
                        <option value="1">Идэвхтэй</option>
                        <option value="0">Идэвхгүй</option>
                    </select>
                    {/* <div className="text-muted fs-7">Set the category status.</div> */}
                </div>
            </div>	
        </div>
    )
}

export {ServiceDetailAside}