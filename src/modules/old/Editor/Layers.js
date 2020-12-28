import React from 'react';

import container from 'src/containers/editor/Layers';
import Layer from './Layer';

const Layers = ({ layers, sectionWidth, numSections }) => (
    <div>
        {layers.map((layer, i) => (
            <Layer key={layer.frontendId} layer={layer} index={i} width={sectionWidth * numSections} />
        ))}
    </div>
);

export default container(Layers);
