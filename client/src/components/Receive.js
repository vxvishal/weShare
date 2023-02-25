"use client";

import { useState } from "react";
import axios from "axios";

export default function Receive() {
    const downloadURL = process.env.NEXT_PUBLIC_DOWNLOAD_URL;
    const [code, setCode] = useState(null);
    const [fileURL, setFileURL] = useState(null);
    const [fileName, setFileName] = useState(null);

    const handleRequest = async () => {
        await axios.get(downloadURL + "/" + code)
            .then((response) => {
                console.log(response.data.url)
                setFileURL(response.data.url)
                setFileName(response.data.name)
            })

        var xhr = new XMLHttpRequest();
        xhr.responseType = 'blob';
        xhr.onload = (event) => {
            var blob = xhr.response;
            //create a file from the returned blob
            var file = new File([blob], fileName, { type: blob.type });

            let a = document.createElement("a");
            // a.style = "display: none";
            document.body.appendChild(a);
            //grab the a tag
            // a = document.getElementById('tagID');
            //set the download attribute of the a tag to the name stored in the file
            a.download = file.name;
            //generate a temp url to host the image for download
            a.href = URL.createObjectURL(file);
            a.click();
        };
        xhr.open('GET', fileURL);
        xhr.send();


        // xhr.setRequestHeader('Access-Control-Allow-Origin', '*')

    }

    return (
        <>
            <h1>Receive</h1>
            <form>
                <input type="text" onChange={(e) => { setCode(e.target.value) }} />
            </form>
            <button type="submit" onClick={handleRequest}>Submit</button>
            {/* {(fileURL !== null) ?
                <img src={fileURL} download />
                : null
            } */}
        </>
    )
}