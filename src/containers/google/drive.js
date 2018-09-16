

export default class Drive{
    constructor(){
    }

    *test(){
        yield 10;
        yield 20;
        yield 30;
    }

    *list() {
        console.log("Retrieving files")
        let nextPageToken = ""
        let result = {}
        let request = window.gapi.client.drive.files.list()
        yield new Promise(resolve => {
            let request = window.gapi.client.drive.files.list({pageSize: 10})
            request.execute((resp) => {
                nextPageToken = resp.nextPageToken
                return resolve(resp)
            })
        })

        while(nextPageToken){
            console.log(nextPageToken)
            yield new Promise((resolve, reject) => {
                let request = window.gapi.client.drive.files.list({pageToken: nextPageToken, pageSize: 10})
                request.execute((resp) => {
                    nextPageToken = resp.nextPageToken
                    return resolve(resp)
                })
            })
        }
    }

    listFiles = () => {        
        let nextPageToken = ""
        let result = {}
        let request = window.gapi.client.drive.files.list()

        return new Promise(resolve => {
            let request = window.gapi.client.drive.files.list()
            request.execute((resp) => {return resolve(resp)})
        })
        /*var retrievePageOfFiles = function(request, result) {
            request.execute(function(resp) {
                result = result.concat(resp.items);
                var nextPageToken = resp.nextPageToken;
                if (nextPageToken) {
                    request = window.gapi.client.drive.files.list({
                    pageToken: nextPageToken
                });
                retrievePageOfFiles(request, result);
              
                } else {
                    console.log(result);
                }
            });
        }
        
        var initialRequest = window.gapi.client.drive.files.list();
        retrievePageOfFiles(initialRequest, []);*/
    }

    createFile = (fileData) => {
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

    getFile = (file) => {
        var accessToken = window.gapi.auth.getToken().access_token;
        var xhr = new XMLHttpRequest();
        xhr.open('GET', file.downloadUrl);
        xhr.setRequestHeader('Authorization', 'Bearer ' + accessToken);
        
        xhr.onload = function() {
            console.log(xhr.responseText);
        };
        
        xhr.onerror = function() {
            alert("Download of file ", file.downloadUrl, " failed");
        };
        
        xhr.send();
    }
}