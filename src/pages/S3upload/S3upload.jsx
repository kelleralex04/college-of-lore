import { useState } from "react"

export default function UploadImage() {
    const [files, setFiles] = useState([])
    const [imgArr, setImgArr] = useState([])

    async function handleSubmit(evt) {
        evt.preventDefault()

        if (files.length === 0) {
            alert('Please select an image')
            return
        }

        if (files.length > 2) {
            alert('Maximum 2 files at a time')
            return
        }

        const formData = new FormData();
        for (const file of files) {
            formData.append('s3Images', file)
        }

        const result = await fetch('http://localhost:3000/image/upload', {method: 'POST', body: formData})
        const data = await result.json()
        console.log(data)
    }

    function onImageChange(evt) {
        const selectedFiles = evt.target.files
        setFiles(selectedFiles)
    }

    async function fetchImages() {
        const result = await fetch('http://localhost:3000/image/fetchall', {method: 'GET'})
        const data = await result.json()
        setImgArr(data.urlArr)
    }

    return (
        <div className="uploadImageContainer">
            <form method="post" onSubmit={handleSubmit}>
                <input onChange={onImageChange} type="file" accept="image/*" alt='gg' name="image" multiple></input>
                <button type="submit">Upload</button>
                <button type="button" onClick={fetchImages}>Fetch</button>
            </form>
            <div>
                {imgArr.map((img, idx) => {
                    return <img src={img} key={idx} alt="" />
                }
                    )}
            </div>
        </div>
    )
}