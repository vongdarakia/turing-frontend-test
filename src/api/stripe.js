import { getBasicHeaders, getAuthHeaders, apiUrl } from './config';
import prepareRequestParams from '../utils/prepare-request-params';
import prepareRequestBody from '../utils/prepare-request-body';

export default {
    stripeCharge: async ({
        stripeToken,
        order_id,
        description,
        amount,
        currency,
    } = {}) => {
        try {
            const response = await fetch(`${apiUrl}/stripe/charge`, {
                method: 'post',
                headers: getBasicHeaders(),
                body: prepareRequestBody({
                    stripeToken,
                    order_id,
                    description,
                    amount,
                    currency,
                }),
            });

            const result = await response.json();
            console.log({ result });
            return result;
        } catch (error) {
            return { error };
        }
    },
};
