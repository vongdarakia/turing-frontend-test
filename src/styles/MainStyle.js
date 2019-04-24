import styled from 'styled-components';
import {
    PRIMARY_FONT_FAMILY,
    SECONDARY_FONT_FAMILY,
    TITLE_FONT_FAMILY,
} from './settings';

const MainStyles = styled.div`
    font-family: ${PRIMARY_FONT_FAMILY};
    font-weight: 300;
    font-size: 16px;
    color: #6c6c6c;

    small {
        font-size: 12px;
    }

    h1 {
        font-family: ${TITLE_FONT_FAMILY};
        font-size: 48px;
        color: #2e2e2e;
        line-height: 150%;
    }

    h2 {
        font-family: ${SECONDARY_FONT_FAMILY};
        font-size: 24px;
        color: #2e2e2e;
        line-height: 150%;
    }

    h3 {
        font-family: ${SECONDARY_FONT_FAMILY};
        font-size: 16px;
        color: #2e2e2e;
        line-height: 150%;
    }

    .topbar {
        font-family: ${SECONDARY_FONT_FAMILY};
        font-weight: 600;
        font-size: 15px;
        color: #2e2e2e;
        line-height: 240%;
    }

    .sub-header {
        font-family: ${SECONDARY_FONT_FAMILY};
        font-weight: 600;
        font-size: 15px;
        color: #2e2e2e;
    }

    .facebook-auto-login {
        display: none;
    }
`;

export default MainStyles;
