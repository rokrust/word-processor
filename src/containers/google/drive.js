const fs = window.require('fs');

export default class Drive{
    constructor(){
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

    createFile = (file) => {
        var fp = fs.createReadStream(file)
        //window.gapi.client.drive.files.create()
        /*var reader = new FileReader();
        reader.readAsBinaryString(fileData);
        reader.onload = function(e) {
            var contentType = fileData.type || 'application/octet-stream';
            var metadata = {
                'title': fileData.fileName,
                'mimeType': contentType
            };
      
        
        var request = gapi.client.request({
            'path': '/upload/drive/v3/files',
            'method': 'POST',
            'params': {'uploadType': 'resumable'},
            'body': fileData});
        
        if (!callback) {
            callback = function(file) {
                console.log(file)
            };
        }
          
            request.execute(callback);
        }*/
    }

    getFile = (fileId) => {
        var dest = fs.createWriteStream('pythonfile.ipynb');
        console.log(fileId)
        window.gapi.client.drive.files.get({
            fileId: fileId,
            alt: 'media'
        }).execute(function(err, result) {result.pipe(dest); console.log("Fetching file"); console.log(result)})

        /*.on('end', function () {
            console.log('Done');
        })
        .on('error', function (err) {
            console.log('Error during download', err);
        })
        .pipe(dest);*/
        
        /*let dest = fs.createWriteStream('pythonfile.ipynb')
        window.gapi.client.drive.files.get({fileId: file, alt: 'media'})
        .on('end', () => {console.log('Done')})
        .on('error', () => {console.log('Error')})
        .pipe(dest)*/
    }
}