import { Quill } from 'react-quill'
let Inline = Quill.import('blots/inline')

class Clickable extends Inline {
    static create(path, ) {
        let node = super.create()

        node.setAttribute('path', path)
        node.addEventListener('click', e => console.log("Clicked text"))
        node.addEventListener('contextmenu', e => console.log("Right clicked text"))
        node.addEventListener('mouseover', e => console.log("Mouseover text"))
        return node
    }

    static formats(node) {
        return node.getAttribute('clickable')
    }

    format(name, value) {
        if (name === 'clickable' && value) {
            this.domNode.setAttribute('path', value);
        } else {
            super.format(name, value);
        }
    }
    
    formats() {
        let formats = super.formats();
        formats['path'] = Clickable.formats(this.domNode);
        return formats;
      }
}
Clickable.blotName = 'clickable'
Clickable.tagName = 'clk'

export default Clickable