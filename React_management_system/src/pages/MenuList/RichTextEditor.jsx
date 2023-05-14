// import React, { useEffect, useState, forwardRef } from 'react';
// import { EditorState, convertToRaw, ContentState } from 'draft-js';
// import { Editor } from 'react-draft-wysiwyg';
// import draftToHtml from 'draftjs-to-html';
// import htmlToDraft from 'html-to-draftjs'
// import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css"


// export default function RichTextEditor(props) {
    
//     const {detail} = props
//     const [editorState, setEditorState] = useState(EditorState.createEmpty())
//     useEffect(()=>{
//         if (detail) {
//             const contentBlock = htmlToDraft(detail)
//             const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks)
//             const editorState = EditorState.createWithContent(contentState)
//             setEditorState(editorState)
//         }
//     },[detail])
    
//     const onEditorStateChange = (editorState) => {
//         setEditorState(editorState);
//     };
//     const getDetail=()=>{
//         return draftToHtml(convertToRaw(editorState.getCurrentContent()))
//     }
//   return (
//       <div>
//           <Editor
//               editorState={editorState}
//               editorStyle={{border:'1px solid lightgrey',minHeight:'200px',paddingLeft:'10px'}}
//               wrapperClassName="demo-wrapper"
//               editorClassName="demo-editor"
//               onEditorStateChange={onEditorStateChange}
//           />
//           {/* <textarea
//               disabled
//               value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
//           /> */}
//       </div>
//   )
// }
import React, { useEffect, useState, forwardRef, useImperativeHandle } from 'react';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs'
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css"

const RichTextEditor = forwardRef((props, ref) => {
    const { detail } = props
    const [editorState, setEditorState] = useState(EditorState.createEmpty())
    useEffect(() => {
        if (detail) {
            const contentBlock = htmlToDraft(detail)
            const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks)
            const editorState = EditorState.createWithContent(contentState)
            setEditorState(editorState)
        }
    }, [detail])

    const onEditorStateChange = (editorState) => {
        setEditorState(editorState);
    };

    const getDetail = () => {
        return draftToHtml(convertToRaw(editorState.getCurrentContent()))
    }

    // 使用 ref 来提供 getDetail 函数
    useImperativeHandle(ref, () => ({
        getDetail,
    }));

    return (
        <div>
            <Editor
                editorState={editorState}
                editorStyle={{ border: '1px solid lightgrey', minHeight: '200px', paddingLeft: '10px' }}
                wrapperClassName="demo-wrapper"
                editorClassName="demo-editor"
                onEditorStateChange={onEditorStateChange}
            />
            {/* <textarea
                disabled
                value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
            /> */}
        </div>
    )
});

export default RichTextEditor;
