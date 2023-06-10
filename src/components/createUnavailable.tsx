import { Link } from "react-router-dom"

function CreateMobile() {
    return(
        <div className="flex items-center justify-center flex-col mt-10">
            <div className="text-white mb-10 text-center p-2">Schedule Builder is unavailable on mobile, please switch to a tablet or computer</div>
            <Link to = "/" className="bg-nav text-white p-4 rounded-md">Go back to homepage</Link>
        </div>
    )
}

export default CreateMobile