import React from 'react'

function ButtonFill({ title }: {
    title: string
}) {
    return (
        <button
            type="submit"
            className="items-center gap-2 rounded-md bg-primary border   hover:border-primary hover:text-primary hover:bg-white px-5 py-2.5 text-sm font-medium text-white shadow w-full transition-all duration-300 cursor-pointer"
        >
            {title}
        </button>
    )
}

export default ButtonFill
