import React from 'react'

const Temperature = (props) => {
    return (
        <div className="temp">
            {/* Temperature: {(Math.floor(((props - 273) * 1.8) + 32))} */}
            {props}
        </div>
    )
}

export default Temperature
