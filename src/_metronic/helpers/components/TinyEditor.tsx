import { Editor } from '@tinymce/tinymce-react'
import { FC, useRef } from 'react'

interface TinyEditorProps {
  value: string
  setValue: (content: string) => void
  height?: number
}

export const TinyEditor: FC<TinyEditorProps> = ({ 
  value, 
  setValue, 
  height = 500 
}) => {
  const editorRef: any = useRef(null)

  return (
    <Editor
      apiKey='nw04gx45ydwh4yr20o4desyfdbmx8rs157r916ekc5tef2qc'
      onInit={(evt, editor) => editorRef.current = editor}
      onEditorChange={(content) => setValue(content)}
      value={value}
      init={{
        height: height,
        width: '100%',
        // menubar: false,
        menu: {
          table: {
            title: 'Table',
            items:
              'inserttable | cell row column | table tabledelete | ' + 
              'tableprops tablerowprops tablecellprops | tableinsertrowbefore tableinsertrowafter tabledeleterow | ' +
              'tableinsertcolbefore tableinsertcolafter tabledeletecol',
          },
        },
        plugins: [
          'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
          'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
          'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
        ],
        extended_valid_elements:
        'iframe[src|frameborder|style|scrolling|class|width|height|name|align]',
        toolbar: 'undo redo | formatselect | fontsizeselect | blocks | ' +
          'bold italic forecolor | alignleft aligncenter ' +
          'alignright alignjustify | bullist numlist outdent indent | ' +
          'removeformat | image | blockquote | help',
        content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
      }}
    />
  )
}