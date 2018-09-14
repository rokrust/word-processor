

export default class Drive{
    constructor(){

    }

    *list() {
        let request = window.gapi.client.drive.files.list();
        let token = true

        while(token){ //Until last paged reached
            yield* request.execute(resp => {
                return resp.items;
            })
        }
    }

    listFiles = () => {
        /*let request = window.gapi.client.drive.files.list();
        console.log(request)
        let yolo = request.execute(resp => {console.log(resp)});
        console.log(yolo)*/
        
        console.log("Retrieving files")
        var retrievePageOfFiles = function(request, result) {
            request.execute(function(resp) {
                result = result.concat(resp.items);
                var nextPageToken = resp.nextPageToken;
                if (nextPageToken) {
                    request = window.gapi.client.drive.files.list({
                    'pageToken': nextPageToken
                });
                console.log(resp)
                retrievePageOfFiles(request, result);
              
                } else {
                    console.log(result);
                }
            });
        }
        
        var initialRequest = window.gapi.client.drive.files.list();  
        retrievePageOfFiles(initialRequest, []);
    }

    createFile = (fileData) => {

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