import { getBasicHeaders, apiUrl } from './config';

export default {
    getAllShippingRegions: async () => {
        try {
            const response = await fetch(`${apiUrl}/shipping/regions`, {
                method: 'get',
                headers: getBasicHeaders(),
            });

            const taxes = await response.json();
            return taxes;
        } catch (error) {
            return { error };
        }
    },

    getShippingOptionsByRegionId: async ({ shipping_region_id } = {}) => {
        try {
            const response = await fetch(
                `${apiUrl}/shipping/regions/${shipping_region_id}`,
                {
                    method: 'get',
                    headers: getBasicHeaders(),
                },
            );

            const shippingRegions = await response.json();
            return shippingRegions;
        } catch (error) {
            return { error };
        }
    },
};
