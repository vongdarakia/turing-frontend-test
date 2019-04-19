import { getBasicHeaders, apiUrl } from './config';

export default {
    getAllDepartments: async () => {
        try {
            const response = await fetch(`${apiUrl}/departments`, {
                method: 'get',
                headers: getBasicHeaders(),
            });

            const departments = await response.json();
            return departments;
        } catch (error) {
            return { error };
        }
    },

    getDepartmentById: async ({ department_id } = {}) => {
        try {
            const response = await fetch(
                `${apiUrl}/departments/${department_id}`,
                {
                    method: 'get',
                    headers: getBasicHeaders(),
                },
            );

            const department = await response.json();
            return department;
        } catch (error) {
            return { error };
        }
    },
};
