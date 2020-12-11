import useStorage from "../hooks/useStorage"
import {useUser} from "../context/context"
import {useEffect} from "react"
const ProgressBar = ({setImageUrl, file, setFile}) => {
    const {url, progress} = useStorage(file)
    const { setCredentials} = useUser()
    useEffect(() => {
        if (url) {
            setFile(null)
            setImageUrl(url)
            setCredentials(currCredentials =>  ({...currCredentials, imageUrl: url}))
        }
    }, [url, setFile, setImageUrl, setCredentials])
    return (<div style={{width: progress + "%"}} className="progress-bar"></div>)
}

export default ProgressBar