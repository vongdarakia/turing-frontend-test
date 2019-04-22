import styled from 'styled-components';
import MaterialButton from '@material-ui/core/Button';
import {
    PRIMARY_COLOR,
    SECONDARY_COLOR,
    PRIMARY_FONT_FAMILY,
} from '../../../styles/settings';

export default styled(MaterialButton)`
    border-radius: 24px !important;
    text-transform: unset !important;
    padding: 8px 24px !important;
    font-size: 15px !important;
    font-weight: 600 !important;
    min-width: 140px !important;

    span {
        font-family: ${PRIMARY_FONT_FAMILY} !important;
        text-transform: unset;
    }

    &.primary {
        background-color: ${PRIMARY_COLOR};
        color: ${SECONDARY_COLOR};
    }

    &.secondary {
        background-color: ${SECONDARY_COLOR};
        color: ${PRIMARY_COLOR};
    }

    &.btn-large {
        padding: 16px 48px !important;
        border-radius: 48px !important;
        min-width: 160px !important;
    }
`;
