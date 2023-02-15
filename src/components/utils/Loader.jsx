import React from 'react'
import { StyledLoader } from '../../styleComponent/StyledLoader'
export default function Loader() {

    return (
        <div>
            <StyledLoader>
                <div className="load">
                    {/* <img src="./img/load.png" alt="" /> */}
                    <div className="loader">
                        
                    </div>
                </div>
            </StyledLoader>

        </div>
    )
}
