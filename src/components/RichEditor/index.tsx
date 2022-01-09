import React from 'react';
import { EditorProps } from './type';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from 'ckeditor5-custom-build';
import { MyUploadAdapter } from 'common/adapter';
import './style.css';

// plugins

const cutTagHtml = (str: string) => {
  let newStr;
  newStr = str.replace('/(<)([ws]+)(>)/g', ' ');
  newStr = str.replace('/(</)([ws]+)(>)/g', ' ');
  return newStr;
};

export const RichEditor = ({ data, hintText, handleChange }: EditorProps) => {
  return (
    <CKEditor
      editor={ClassicEditor}
      data={data || ''}
      config={{
        placeholder: hintText,
      }}
      onReady={(editor: any) => {
        editor.plugins.get('FileRepository').createUploadAdapter = (loader: any) => {
          // console.log(loader);
          return new MyUploadAdapter(loader);
        };
        // You can store the "editor" and use when it is needed.
        // console.log('Editor is ready to use!', editor);
      }}
      onChange={(event: any, editor: any) => {
        const data = editor.getData();
        handleChange(cutTagHtml(data));
      }}
    />
  );
};
