import React from 'react';
import MathJax from './Mathshow.min.js';

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