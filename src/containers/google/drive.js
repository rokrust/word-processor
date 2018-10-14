//UI list => google picker
//import {promisify} from 'util'

//Needed for promisify to work
const fs = window.require('fs')
const util = require('util')
require('util.promisify').shim();

export default class DriveV3{
    constructor(drive){
        this.drive = drive
        this.fields = new Fields(['id', 'name'])
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
                fields: `nextPageToken, files(${fields || this.fields.join(', ')})`
            }, (err, res) => {
                if (err) reject(err)
                else {
                    this.nextPageToken = res.data.nextPageToken
                    resolve(res.data.files)
                }
            })
        })
    }

    listAllFiles = async (q, fields) => {
        this.nextPageToken = ''
        let files = []
        do{
            const res = await this.listFiles(20, q, fields)
            files = files.concat(res)
        } while(this.nextPageToken)
            
        return files
    }

    listAllFolders = (q, fields) => {
        if(q) q = `mimeType='application/vnd.google-apps.folder' and ${q}`
        else q = `mimeType='application/vnd.google-apps.folder'` 
        
        return this.listAllFiles(q)
    }

    insertFileInFolderByName = async (file, folderName) => {
        try{
            const folder = await this.listAllFolders(`name contains '${folderName}'`)
            console.log(folder)
            if(folder.length > 1) throw 'Multiple folders by the same name'
            if(folder.length === 0) throw `No folder found matching name ${folderName}`

            this.createFile(file, [folder[0].id])
        } catch (error){
            throw error
        }
    }

    createFolder = (name, parents) => {
        return new Promise((resolve, reject) => {
            this.drive.files.create({
                resource: {
                    name,
                    mimeType: 'application/vnd.google-apps.folder',
                    parents
                }
            }, (err, res) => {
                if(err) reject(err)
                else resolve(res)
            })
        })
    }

    createFile = (file, parents) => {        
        return new Promise((resolve, reject) => {
            this.drive.files.create({
                resource: {
                    name: file.name,
                    parents
                },
                uploadType: "resumable",
                media: {
                    body: fs.createReadStream(file.path)
                }
            }, (err, res) => {
                if(err) reject(err)
                else resolve(res)
            })
        })
    }

    getFile = (file) => {
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
                console.error('Error downloading file.', err);
            })
            .on('data', d => {
                progress += d.length;
                console.log("Progress", progress)
            })
            .pipe(dest)})
    }
}


class Fields {
    constructor(fields) {
        this.fields = new Set(fields)
    }

    add = (fields) => {
        if(fields instanceof Array) fields.forEach((elem) => this.fields.add(elem))
        else this.fields.add(fields)
    }

    remove = (fields) => {
        if(fields instanceof Array) fields.forEach((elem) => this.fields.delete(elem))
        else this.fields.delete(fields)
    }

    clear = () => {
        this.fields = new Set()
    }

    replace = (fields) => {
        this.clear()
        this.add(fields)
    }

    join = (delimiter) => {
        return Array.from(this.fields).join(delimiter)
    }

    get = () => {
        return this.fields
    }
}