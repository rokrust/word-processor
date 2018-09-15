

export default class Drive{
    constructor(){
    }

    *list() {
        let request = window.gapi.client.drive.files.list();
        let token = true

        while(token){ //Until last paged reached
            request.execute(resp => {
                //yield* resp.items;
            })
        }
    }

    listFiles = () => {        
        console.log("Retrieving files")

        var retrievePageOfFiles = function(request, result) {
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