// Core service to rebuild
import request from 'src/api/core';

class SingleEpisodeHTTPRequestsService {
    constructor(requestService) {
        this.singleEpisodeHTTPRequestsService = requestService;
    }

    getEpisode(guid) {
        return this.singleEpisodeHTTPRequestsService.get(`episode/${guid}`).then(({ data }) => data[0]);
    }
}

export default new SingleEpisodeHTTPRequestsService(request);
