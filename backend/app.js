import express from 'express';
import { firebaseStorage } from './firebase-config.js';
import { newUpload, getDetails, getURL } from '././database/firebaseDatabase.js';
import {
    ref,
    getDownloadURL,
    uploadBytesResumable,
} from 'firebase/storage'
import multer from 'multer';
import { v4 } from 'uuid';
import cors from 'cors';

const app = express();
const port = 5000;

const upload = multer();

app.use(cors());

app.post('/upload', upload.single("theFile"), async (req, res) => {
    try {
        const file = req.file;
        console.log(file);
        console.log('log line');
        const { originalname, mimetype, buffer } = file;
        const storageRef = ref(firebaseStorage, `files/${v4() + originalname}`);

        const metadata = {
            contentType: mimetype,
        }

        const snapshot = await uploadBytesResumable(storageRef, buffer, metadata);

        const downloadURL = await getDownloadURL(snapshot.ref);
        const numericCode = Math.floor(100000 + Math.random() * 900000);

        const fileData = {
            name: originalname,
            downloadURL: downloadURL,
            numericCode: numericCode,
        }

        newUpload(fileData);

        console.log("file uploaded");
        res.send(fileData);
    }
    catch (error) {
        res.status(400).send(error.message);
    }
});

app.get('/download/:numericCode', async (req, res) => {
    const fileID = req.params.numericCode;

    await getDetails(fileID);
    const fileInfo = getURL();

    console.log("after request")
    // console.log(theURL.url)

    const sendData = {
        url: fileInfo.url,
        name: fileInfo.name,
    };
    console.log(sendData)
    res.send(sendData);
});

app.listen(port, () => console.log(`Server started on port ${port}`));