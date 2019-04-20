import { getBasicHeaders, getAuthHeaders, apiUrl } from './config';
import prepareRequestParams from '../utils/prepare-request-params';

export default {
    stripeCharge: async ({
        stripeToken,
        order_id,
        description,
        amount,
        currency,
    } = {}) => {
        try {
            const response = await fetch(
                `${apiUrl}/stripe${prepareRequestParams({
                    stripeToken,
                    order_id,
                    description,
                    amount,
                    currency,
                })}`,
                {
                    method: 'post',
                    headers: getBasicHeaders(),
                },
            );

            const result = await response.json();
            console.log({ result });
            return result;
        } catch (error) {
            return { error };
        }
    },
};
