import React from 'react';
import MathJax from './Mathshow.min.js';




const jsDemoImagesTransform = document.createElement('script');
jsDemoImagesTransform.type = 'text/javascript';
jsDemoImagesTransform.src = 'https://www.wiris.net/demo/plugins/app/WIRISplugins.js?viewer=image';
document.head.appendChild(jsDemoImagesTransform);
// This needs to be included before the '@wiris/mathtype-tinymce6' is loaded synchronously
//  window.$ = $;
window.tinymce = require('tinymce');  // Expose the TinyMCE to the window.
// Load wiris plugin synchronously.
require('@wiris/mathtype-tinymce6');
const MathShow = (props) => {
	const { text } = props;
	return (
		text && text.includes('<math') ?
			<MathJax math={text} className='my-MathJax'
				config={{
					extensions: ["tex2jax.js"],
					"HTML-CSS": { scale: 150, linebreaks: { automatic: true } },
					SVG: { linebreaks: { automatic: true } },
					displayAlign: "left"
				}}
			// style={{fontSize: '2em',color:'red'}}
			/>
			: <div dangerouslySetInnerHTML={{ __html: text }} />
	);
}
export default MathShow;