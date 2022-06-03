import axios from 'axios'

export const BASE_PATH = process.env.REACT_APP_REST_CONTEXT

export default class RestApi {
    static processResponse(response) {
        if (response.status >= 200 && response.status < 400) {
            return response.data
        }

        const newError = new Error(`Error calling REST API: ${response.status}`)

        throw newError
    }

    static processError(error) {
        const newError = new Error(error)

        throw newError
    }

    static async call(method, url, data, params, headers) {
        try {
            const response = await axios({
                method,
                url,
                data,
                params,
                headers,
            })

            return RestApi.processResponse(response)
        } catch (error) {
            return RestApi.processError(error)
        }
    }
}
