import React from 'react';

const FloodLight = () => {
	return (
		<div style={{ height: 'calc(92vh + 18px)' }}>
			<iframe
				width="100%"
				height="100%"
				src="https://pak-flood.ushahidi.io/views/map"
				frameborder="0"
				allowfullscreen
				title="Floodlight Map"
			></iframe>
		</div>
	);
};

export default FloodLight;
