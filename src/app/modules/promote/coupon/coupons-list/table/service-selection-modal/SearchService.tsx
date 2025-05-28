/* eslint-disable react-hooks/exhaustive-deps */
import { FC, useEffect, useState } from "react"
import { KTSVG, useDebounce } from "../../../../../../../_metronic/helpers"
import { useQueryRequest } from "../../core/QueryRequestProvider"
import { Service } from "../../core/_models"

type Props = {
    services: Array<Service>
}

const SearchService: FC<Props> = ({services}) => {
    const {updateState} = useQueryRequest()
    const [searchTerm, setSearchTerm] = useState<string>('')
    const debouncedSearchTerm = useDebounce(searchTerm, 150)
    
    useEffect(() => {
        if (debouncedSearchTerm !== undefined && searchTerm !== undefined) {
            updateState({search: debouncedSearchTerm})
        }
    }, [debouncedSearchTerm])
    
    return (
        <div className="mb-5 w-100">
            <div className="input-group input-group-solid">
                <span className="input-group-text" id="basic-addon1">
                    <KTSVG
                        path='/media/icons/duotune/general/gen021.svg'
                        className='svg-icon-2 svg-icon-lg-1 svg-icon-primary'
                    />
                </span>
                <input type="text"
                    className="form-control"
                    placeholder="Үйлчилгээ хайх"
                    aria-label="Service"
                    aria-describedby="basic-addon1"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
      </div>
    )
}

export {SearchService}