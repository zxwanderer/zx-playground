console.log('Hello World from console')

// import { EditorState } from '@codemirror/state'
// import { EditorView, keymap } from '@codemirror/view'
// import { markdown, markdownKeymap } from '@codemirror/lang-markdown'
// import { defaultKeymap, history, historyKeymap } from '@codemirror/commands'
// import { defaultHighlightStyle, syntaxHighlighting } from '@codemirror/language'
// // import doc from './doc.md'

import {basicSetup, EditorView} from "codemirror"
import {keymap} from "@codemirror/view"
import {defaultKeymap} from "@codemirror/commands"

const doc = 'Hello world 123'

const extensions = [
  basicSetup,
  // markdown(),
  // history(),
  // syntaxHighlighting(defaultHighlightStyle),
  // keymap.of([defaultKeymap, markdownKeymap, historyKeymap]),
  keymap.of([defaultKeymap]),
  EditorView.updateListener.of((update) => {
      console.log(update)
  })
]

const onLoad = () => {
  // const state = EditorState.create({ extensions })
  const editorView = new EditorView({
    doc,
    extensions,
    parent: document.body
   })
  // const editorDom = document.querySelector('#editor')
  // editorDom.append(editorView.dom)

  // editor.addEventListener('click', () => {
  //   // const data = view.getValue()
  //   // console.log('click', data)
  // })
}

window.addEventListener('load', () => onLoad()) 
