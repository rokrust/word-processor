export default class QuillIndexing {
    constructor(quillRef) {
        this.quill = quillRef
    }

    addPrevWordToSelection = (currentSelection) => {
        let firstWord = this.getWordSelection(currentSelection.index)
        let end = this.getEndIndex(currentSelection)
        let lastWord = this.getWordSelection(end ? end - 1 : end)

        //Set prev word based on if a whole word has been selected or not
        let nextWord = firstWord.index !== currentSelection.index ? firstWord : this.getPrevWordSelection(currentSelection.index)

        this.quill.setSelection({
            index: nextWord.index,
            length: this.getEndIndex(lastWord) - nextWord.index
        })
    }

    addNextWordToSelection = (currentSelection) => {
        let firstWord = this.getWordSelection(currentSelection.index)
        let end = this.getEndIndex(currentSelection)
        let lastWord = this.getWordSelection(end ? end - 1 : end)   //Handles index of 0
        
        //Set nextword based on if a whole word has been selected or not
        let nextWord = end !== this.getEndIndex(lastWord) ? lastWord : this.getNextWordSelection(end - 1)

        this.quill.setSelection({
            index: firstWord.index,
            length: this.getEndIndex(nextWord) - firstWord.index
        })

    }

    removeFirstWordFromSelection = (currentSelection) => {
        let secondWord = this.getNextWordSelection(currentSelection.index)

        this.quill.setSelection({
            index: secondWord.index,
            length: this.getEndIndex(currentSelection) - secondWord.index
        })
    }

    removeLastWordFromSelection = (currentSelection) => {
        let lastWord = this.getWordSelection(this.getEndIndex(currentSelection) - 1)
        let secondLastWord = this.getPrevWordSelection(this.getEndIndex(lastWord) - 1)

        this.quill.setSelection({
            index: currentSelection.index,
            length: this.getEndIndex(secondLastWord) - currentSelection.index
        })
    }

    remove = (currentSelection) => {
        
    }

    getNextWordSelection(index) {
        let thisWord = this.getWordSelection(index)
        for(let i = this.getEndIndex(thisWord); i < 50; i++){
            var currChar = this.quill.getText(i, 1)
            
            //Next word reached
            if(!this._isSepChar(currChar)) {
                return this.getWordSelection(i)
            }
        }
    }

    getPrevWordSelection(index) {
        let thisWord = this.getWordSelection(index)
        for(let i = thisWord.index - 1; i > -1; i--){
            var currChar = this.quill.getText(i, 1)

            //Prev word reached
            if(!this._isSepChar(currChar)) {
                return this.getWordSelection(i)
            }
        }
    }

    getEndIndex(range){
        return range.index + range.length
    }

    _isSepChar(char) {
        return /[^a-zA-Z0-9|^$]/.test(char) || char === ''
    }

    getWordSelection(index){
        let selection = {}

        //Find start index
        for(let i = 0; true; i++){
            let char = this.quill.getText(index-i, 1)
            if(this._isSepChar(char)){
                selection.index = index - i + 1
                break;
            }
        }

        //Find end index
        for(let i = 0; true; i++){
            let char = this.quill.getText(index+i, 1)
            if(this._isSepChar(char)){
                selection.length = index - selection.index + i
                break;
            }
        }

        return selection
    }

    //Will select a word at wordPos
    selectWordByIndex = (wordPos) => {
        let selection = this.getWordSelection(wordPos)
        this.quill.setSelection(selection)
    }

    selectWordAtCursor = () => {
        let cursorPos = this.quill.getSelection()
        this.selectWordByIndex(cursorPos)
    }

    isCursor = (selection) => {
        if(!selection) selection = this.quill.getSelection()
        return !this.isSelection(selection)
    }

    //Check if the user has selected a piece of text or not
    isSelection = (selection) => {
        if(!selection) selection = this.quill.getSelection()
        return selection.length > 0
    }
}