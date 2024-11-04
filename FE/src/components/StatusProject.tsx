import { IoLogoAndroid } from "react-icons/io"
interface IProps {
    responsive: boolean
    dummy: boolean
    real: boolean
}

const StatusProject = ({ responsive = false, dummy = false, real = false }: IProps) => {

    return (
        <div style={{ clipPath: "polygon(0 0, 0% 100%, 100% 0)" }} className={`fixed w-20 h-20 z-50 status_project ${real ? "bg-red-600 text-white" : ""} ${dummy ? "bg-blue-600 text-white" : ""}`}>
            <div className='p-2'>{responsive ? <IoLogoAndroid size={30} /> : ""}</div>
        </div>
    )
}

export default StatusProject