import request from 'src/api/core'

const fetchExtrasDetails = () => request.get('vip_extras').then(({ data }) => data)

const vipExtrasPayment = (token, paymentDetails) =>
    request
        .auth(token)
        .post('vip_extras/payment', paymentDetails)
        .then(({ data }) => data)

export const vipExtrasApi = {
    fetchExtrasDetails,
    vipExtrasPayment,
}
