import { Howl } from 'howler';

import { format } from 'src/config/settings';

export function getDuration(url) {
    return new Promise(
        resolve =>
            new Howl({
                src: [url],
                format,
                onload: function onload() {
                    resolve(this.duration() * 1000);
                },
            }),
    );
}
