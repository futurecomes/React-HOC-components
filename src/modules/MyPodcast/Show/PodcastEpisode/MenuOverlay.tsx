import * as React from 'react';
import { Menu } from 'antd';

import { deletePodcast } from 'src/actions/old/editor';

interface Props {
    deletePodcast: typeof deletePodcast;
    unpublishPodcast: () => void;
    openSettings: () => void;
    url: string;
    released: boolean;
}

export const MenuOverlay: React.FC<Props> = ({ deletePodcast, unpublishPodcast, openSettings, url, released }) => (
    <Menu>
        <Menu.Item>
            <a href={url} download title="Download episode">
                Download
            </a>
        </Menu.Item>
        <Menu.Item onClick={deletePodcast}>Delete</Menu.Item>
        <Menu.Item onClick={unpublishPodcast}>{`${released ? 'Unpublish' : 'Publish'} episode`}</Menu.Item>
        <Menu.Item onClick={openSettings}>Edit</Menu.Item>
    </Menu>
);
