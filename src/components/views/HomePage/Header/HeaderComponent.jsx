import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import Badge from '@material-ui/core/Badge';
import Icon from '@material-ui/core/Icon';

import { PRIMARY_COLOR } from '../../../../styles/settings';

const Wrapper = styled.div`
    padding: 12px 18px;
    display: flex;
    background-color: white;
    font-size: 12px;
    font-weight: bold;

    .auth-link {
        color: ${PRIMARY_COLOR};

        :hover {
            text-decoration: underline;
            cursor: pointer;
        }
    }

    .options {
        display: flex;
        flex: 1;
        justify-content: center;

        a {
            margin: 0 12px;
            color: #2e2e2e;
            text-decoration: unset;

            :hover {
                text-decoration: underline;
            }
        }
    }

    .section-cart {
        .bag-badge {
            margin-right: 16px;
            :hover {
                cursor: pointer;
            }
        }
        .badge {
            height: 18px;
            min-width: 18px;
            font-size: 10px;
        }
        .basket-icon {
            font-size: 20px;
        }
    }
`;

const HeaderComponent = (props) => {
    const {
        numItems,
        onClickLogin,
        onClickRegister,
        onClickCart,
        subtotal,
    } = props;

    return (
        <Wrapper>
            <div className="section-auth">
                Hi!{' '}
                <span className="auth-link" onClick={onClickLogin}>
                    Sign in
                </span>{' '}
                or{' '}
                <span className="auth-link" onClick={onClickRegister}>
                    Register
                </span>
            </div>
            <div className="options">
                <Link to="/dailydeals">Daily Deals</Link>
                <Link to="/sell">Sell</Link>
                <Link to="/help">Help & Contact</Link>
            </div>

            <div className="section-cart">
                <Badge
                    className="bag-badge"
                    color="secondary"
                    badgeContent={numItems}
                    classes={{ badge: 'badge' }}
                    onClick={onClickCart}
                >
                    <Icon className="basket-icon">shopping_basket</Icon>
                </Badge>
                Your bag: <span>{`$${subtotal || '0.00'}`}</span>
            </div>
        </Wrapper>
    );
};

HeaderComponent.propTypes = {
    subtotal: PropTypes.string.isRequired,
    numItems: PropTypes.number.isRequired,
    onClickLogin: PropTypes.func.isRequired,
    onClickRegister: PropTypes.func.isRequired,
    onClickCart: PropTypes.func.isRequired,
};

export default HeaderComponent;
