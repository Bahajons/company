import { Editor } from '@tinymce/tinymce-react';
import 'tinymce/tinymce';
import 'tinymce/themes/silver';
import 'tinymce/icons/default';
import 'tinymce/skins/ui/oxide/skin.min.css';

// importing the plugin js.
import 'tinymce/plugins/advlist';
import 'tinymce/plugins/autolink';
import 'tinymce/plugins/link';
import 'tinymce/plugins/image';
import 'tinymce/plugins/lists';
import 'tinymce/plugins/charmap';
// import 'tinymce/plugins/hr';
import 'tinymce/plugins/anchor';
// import 'tinymce/plugins/spellchecker';
import 'tinymce/plugins/searchreplace';
import 'tinymce/plugins/wordcount';
import 'tinymce/plugins/code';
import 'tinymce/plugins/fullscreen';
import 'tinymce/plugins/insertdatetime';
import 'tinymce/plugins/media';
import 'tinymce/plugins/nonbreaking';
import 'tinymce/plugins/table';
import 'tinymce/plugins/template';
import 'tinymce/plugins/help';
// import 'tinymce/plugins/paste';

import 'tinymce/plugins/code'
import { useEffect } from 'react';
import { useState } from 'react';
import { API } from './API';
// import 'tinymce/plugins/codesample';
// import 'tinymce/plugins/preview';

// import contentCss from 'tinymce/skins/content/default/content.min.css';
// import contentUiCss from 'tinymce/skins/ui/oxide/content.min.css';
// import { getToken } from '../../helpers/tokenStorge';
// import { API_URL, FILE_URL } from '../../helpers/api';




const jsDemoImagesTransform = document.createElement('script');
jsDemoImagesTransform.type = 'text/javascript';
jsDemoImagesTransform.src = 'https://www.wiris.net/demo/plugins/app/WIRISplugins.js?viewer=image';
document.head.appendChild(jsDemoImagesTransform);
// This needs to be included before the '@wiris/mathtype-tinymce6' is loaded synchronously
// window.$ = $;
window.tinymce = require('tinymce');  // Expose the TinyMCE to the window.
// Load wiris plugin synchronously.
require('@wiris/mathtype-tinymce6');

export default function MathEditor(props) {
  const [load, setLoad] = useState(false)
  let API_URL = API, FILE_URL = API + 'media/'
  function getToken() {
    return localStorage.getItem('token')
  }
  const handleEditorChange = (content) => {
    // console.log(content);
    // props.setValueE('');
    if (load) {
      props.setValue(content);
    }
    else {
      setLoad(true)
    }
  }
  document.addEventListener('load', () => {
    setLoad(true)
  })

  function example_image_upload_handler(blobInfo, success, failure, progress) {
    let formData;
    const xhr = new XMLHttpRequest();
    xhr.withCredentials = false;
    xhr.upload.onprogress = (e) => {
      progress((e.loaded / e.total) * 100);
    };
    xhr.open('POST', API_URL + 'api/v1/utils/upload/file/');
    xhr.setRequestHeader('Authorization', 'Bearer ' + getToken());
    console.log(xhr.upload);
    xhr.onload = () => {
      let json;
      if (xhr.status === 403) {
        failure('HTTP Error: ' + xhr.status, { remove: true });
        return;
      }
      if (xhr.status < 200 || xhr.status >= 300) {
        failure('HTTP Error: ' + xhr.status);
        return;
      }

      json = JSON.parse(xhr.responseText);
      if (!json || typeof json.data != 'string') {
        failure('Invalid JSON: ' + xhr.responseText);
        return;
      }
      success(FILE_URL + json.data);
    };
    xhr.onerror = () => { failure('Image upload failed due to a XHR Transport error. Code: ' + xhr.status); };
    formData = new FormData();
    formData.append('file', blobInfo.blob(), blobInfo.filename());
    xhr.send(formData);
  };

  return (
    <>
      <Editor
        value={props.value ? props.value : ''}
        // initialValue={props.value ? props.value : ''}
        onEditorChange={handleEditorChange}
        apiKey={'c5d5f21e638402a6719a675c085491829c54c6c13bd18b8f17927c84e7368158'}
        init={{
          external_plugins: { tiny_mce_wiris: './wiris/wirisplugin.js' },
          skin: false,
          content_css: false,
          height: 500,
          // content_style: [contentCss, contentUiCss].join('\n'),
          menubar: 'edit view insert format tools help',
          paste_as_text: true,
          plugins: 'tiny_mce_wiris codesample advlist autolink link image lists charmap anchor searchreplace wordcount code fullscreen insertdatetime media nonbreaking table template help',
          toolbar: [
            {
              name: 'history', items: ['undo', 'redo']
            },
            {
              name: 'fontselect', items: ['fontselect',]
            },
            {
              name: 'fontsizeselect', items: ['fontsizeselect',],
              className: 'asdfdsagf'
            },
            // {
            // name: 'formatselect', items: [   'formatselect' ]
            // },
            {
              name: 'formatting', items: ['bold', 'italic', 'underline', 'strikethrough']
            },
            {
              name: 'indentation', items: ['outdent', 'indent']
            },
            {
              name: 'alignment', items: ['alignleft', 'aligncenter', 'alignright', 'alignjustify']
            },
            {
              name: 'list', items: ['numlist', 'bullist', 'checklist']
            },
            {
              name: 'table', items: ['table']
            },
            {
              name: 'colors', items: ['forecolor', 'backcolor', 'casechange', 'permanentpen', 'formatpainter', 'removeformat']
            },
            {
              name: 'math', items: ['subscript', 'superscript']
            },
            {
              name: 'viris-math', items: ['tiny_mce_wiris_formulaEditor'],
            },
            {
              name: 'viris-chem', items: ['tiny_mce_wiris_formulaEditorChemistry'],
            },
            {
              name: 'chars', items: ['charmap']
            },
            {
              name: 'file', items: ['image', 'link',  /*'codesample'*/]
            },
            {
              name: 'full', items: ['fullscreen',  /*'preview'*/ 'code']
            },
          ],
          toolbar_mode: 'wrap',
          /* we override default upload handler to simulate successful upload*/
          images_upload_handler: example_image_upload_handler,
        }}
      />
    </>);
}
