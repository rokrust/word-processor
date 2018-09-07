import React, {Component} from 'react'
const fs = window.require('fs'); 
//https://stackoverflow.com/questions/35428639/how-can-i-use-fs-in-react-with-electron

//Mostly works as a wrapper class for the fs module, simplifying some functions
export default class FileService extends Component {
    constructor() {
        super();
        this.bulk = new Bulk()
    }
}

//Unsafe as of now. Does not await read/write async operation
export class Bulk extends Component {
    constructor() {
        super();
    }

    //Reads data from fileDir and supplies it to the callback function
    readFile(fileDir, encoding = 'utf-8') {
        return fs.readFileSync(fileDir, encoding);
    }

    //Creates a file at fileDir and writes data to it
    //Sends an alert if the file already exists
    createFile(fileDir, data = "") {
        if(fs.existsSync(fileDir)) {
            alert("File " + fileDir + " already exists")
            return;
        }
        fs.writeFileSync(fileDir, data, (err)=>{})
    }

    //Replaces the content at fileDir
    writeFile(fileDir, data, overwrite=false){
        if(overwrite) {
            fs.writeFileSync(fileDir, data, (err)=>{})
        }
        else{
            fs.appendFileSync(fileDir, data)
        }
    }
}