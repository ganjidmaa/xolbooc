/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useMemo, useState } from 'react';
import { useDropzone } from 'react-dropzone';

const baseStyle = {
  display: 'flex',
  alignItems: 'center',
  padding: '15px',
  borderWidth: 2,
  borderRadius: 2,
  borderColor: '#eeeeee',
  borderStyle: 'dashed',
  color: '#bdbdbd'
};

const activeStyle = {
  borderColor: '#2196f3'
};

const acceptStyle = {
  borderColor: '#00e676'
};

const rejectStyle = {
  borderColor: '#ff1744'
};

type Props = {
  setAcceptedImg: (field: string, value: any)=>void,
  data: any
}

const DropzoneComponent: React.FC<Props> = ({setAcceptedImg, data}) => {
    const [files, setFiles] = useState(data);

    const onDrop = useCallback((acceptedFiles: any) => {
        setAcceptedImg('file', acceptedFiles)

        setFiles(acceptedFiles.map((file: any) => Object.assign(file, {
            preview: URL.createObjectURL(file)
        })));
    }, []);

    const {
        getRootProps,
        getInputProps,
        isDragActive,
        isDragAccept,
        isDragReject
    } = useDropzone({
        onDrop,
        accept: {'image/*': ['.jpeg', '.png', '.jpg']}
    });

    const style = useMemo(() => ({
        ...baseStyle,
        ...(isDragActive ? activeStyle : {}),
        ...(isDragAccept ? acceptStyle : {}),
        ...(isDragReject ? rejectStyle : {})
    }), [
        isDragActive,
        isDragReject,
        isDragAccept
    ]);
    
    const thumbs = files.map((file: any) => (
        <div key={file.name} className='image-input image-input-outline'>
          <img
            className='image-input-wrapper'
            src={file.preview}
            alt={file.name}
            style={{maxHeight: '125px'}}
          />
        </div>
    ));

    return (
        <div {...getRootProps({style})}>
            <input {...getInputProps()} />
            <div>Энд дарж зураг сонгоно уу</div>
          <ul>{thumbs}</ul>
        </div>
    )
}

export {DropzoneComponent};