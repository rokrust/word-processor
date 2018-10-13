//UI list => google picker
//import {promisify} from 'util'

//Needed for promisify to work
const fs = window.require('fs')
const util = require('util')
require('util.promisify').shim();

export default class DriveV3{
    constructor(drive){
        this.drive = drive
        this.fields = new Set(['id', 'name'])
    }

    addFields = (fields) => {
        if(fields instanceof Array) fields.forEach((elem) => this.fields.add(elem))
        else this.fields.add(fields)
    }

    removeFields = (fields) => {
        if(fields instanceof Array) fields.forEach((elem) => this.fields.delete(elem))
        else this.fields.delete(fields)
    }

    _spreadFields = () => {
        return Array.from(this.fields).join(', ')
    }

    listFolders = (pageSize, q, fields) => {
        if(q) q = `mimeType='application/vnd.google-apps.folder' and ${q}`
        else q = `mimeType='application/vnd.google-apps.folder'`
        
        return this.listFiles(pageSize, q, fields)
    }

    listFiles = (pageSize, q, fields) => {
        return new Promise((resolve, reject) => {
            this.drive.files.list({
                q,
                pageSize,
                pageToken: this.nextPageToken,
                fields: `nextPageToken, files(${fields || this._spreadFields()})`
            }, (err, res) => {
                if (err) reject(err)
                else {
                    this.nextPageToken = res.data.nextPageToken
                    console.log(this.nextPageToken)
                    resolve(res.data.files)
                }
            })
        })
    }

    //https://stackoverflow.com/questions/40600725/google-drive-api-v3-javascript-update-file-contents
    updateFile = (file) => {

    }

    //https://github.com/googleapis/google-api-nodejs-client
    createFile = (name) => {        

    }



    //https://stackoverflow.com/questions/23406391/basic-file-download-example
    //https://github.com/googleapis/google-api-nodejs-client
    //https://github.com/googleapis/google-api-nodejs-client/blob/master/samples/drive/download.js
    getFile = (file) => {
        console.log(file)
        const dest = fs.createWriteStream(file.name);
        let progress = 0;
        this.drive.files.get({
            fileId: file.id,
            alt: 'media'
        }, {
            responseType: 'stream'
        }, (err, res) => {
        
            res.data.on('end', () => {
                console.log('Done downloading file.');
            })
            .on('error', err => {
                console.error('Error downloading file.');
            })
            .on('data', d => {
                progress += d.length;
                console.log("Progress", progress)
            })
            .pipe(dest)})
    }
}