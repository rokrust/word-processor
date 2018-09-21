import {Bulk} from './../storage/local'
const fs = window.require('fs');
//UI list => google picker

export default class Drive{
    constructor(){
        this.fp = new Bulk()
    }

    listFile = function*() {
        let nextPageToken = ''

        do{
            yield new Promise((resolve) => {
                let request = window.gapi.client.drive.files.list({pageToken: nextPageToken, pageSize: 10})
                request.execute((resp) => {
                    nextPageToken = resp.nextPageToken
                    return resolve(resp)
                })
            })
        } while(nextPageToken)
    }()

    //https://stackoverflow.com/questions/40600725/google-drive-api-v3-javascript-update-file-contents
    updateFile = (file) => {
        let data = this.fp.readFile(file.dir)
        var request = window.gapi.client.request({
            path: '/upload/drive/v3/files',
            method: 'PATCH',
            headers: {
                id: file.id
            },
            params: {
                uploadType: 'resumable',
                alt: 'media'
            },
            body: data
        });
        
        request.execute(res => console.log(res));
        
        /*window.gapi.client.drive.files.update({
            fileId: file.id,
            uploadType: 'resumable',
            body: data
        }).then(response => console.log(response))*/
    }

    //https://github.com/googleapis/google-api-nodejs-client
    createFile = (name) => {        
        return new Promise((resolve, reject) => {
            window.gapi.client.drive.files.create({
                name: name,
                media: {
                    mimeType: 'text/plain',
                },
            }).then((resp) => resolve(resp))
        })

        /*var request = window.gapi.client.request({
            path: '/upload/drive/v3/files',
            method: 'POST',
            headers: {
                name: "filler"
            },
            params: {
                uploadType: 'multipart',
            },
            data: {
                name: "filler"
            },
            body: data
        });
        
        request.execute(res => console.log(res));*/
    }


    //https://stackoverflow.com/questions/23406391/basic-file-download-example
    //https://github.com/googleapis/google-api-nodejs-client
    //https://github.com/googleapis/google-api-nodejs-client/blob/master/samples/drive/download.js
    getFile = (file) => {
        console.log(file)
        window.gapi.client.drive.files.get({
            fileId: file.id,
            alt: 'media',
        }).then(response => this.fp.writeFile(file.dir, response.body))
    }
}