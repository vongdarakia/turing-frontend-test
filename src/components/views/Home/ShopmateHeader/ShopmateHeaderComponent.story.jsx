import React from 'react';

import ShopmateHeaderComponent from './ShopmateHeaderComponent';
import storiesOf from '../../../../stories/stories-of';

storiesOf('ShopmateHeaderComponent', module).add('default', () => (
    <div>
        <ShopmateHeaderComponent
            departments={[
                {
                    name: 'Women',
                    department_id: 1,
                },
                {
                    name: 'Men',
                    department_id: 2,
                },
                {
                    name: 'Kids',
                    department_id: 3,
                },
                {
                    name: 'Shoes',
                    department_id: 4,
                },
                {
                    name: 'Brand',
                    department_id: 5,
                },
            ]}
            selectedDepartmentId={4}
        />

        <ShopmateHeaderComponent
            search="Shirt"
            departments={[
                {
                    name: 'Women',
                    department_id: 1,
                },
                {
                    name: 'Men',
                    department_id: 2,
                },
                {
                    name: 'Kids',
                    department_id: 3,
                },
                {
                    name: 'Shoes',
                    department_id: 4,
                },
                {
                    name: 'Brand',
                    department_id: 5,
                },
            ]}
        />
    </div>
));
