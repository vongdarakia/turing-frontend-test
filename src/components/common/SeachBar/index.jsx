import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import InputBase from '@material-ui/core/InputBase';
import InputAdornment from '@material-ui/core/InputAdornment';
import Fab from '@material-ui/core/Fab';
import Icon from '@material-ui/core/Icon';

const Wrapper = styled.div`
    max-width: 240px;
    width: 100%;

    .input-search-bar {
        color: white;
        width: 100%;
        background-color: #b4b4b4;
        border-radius: 24px;
    }

    #search-bar {
        font-size: 14px;
        font-weight: 500;

        &::placeholder {
            color: #f7f7f7;
            opacity: 0.8;
        }
    }

    .search-adornment {
        margin-left: 8px;

        .icon-search {
            font-size: 20px;
        }
    }

    .clear-adornment {
        .btn-clear-search {
            background: transparent;
            box-shadow: none;
            width: 24px;
            height: 24px;
            min-height: unset;
            margin-right: 8px;
        }
        .icon-clear {
            font-size: 12px;
            font-weight: 600;
            color: white;
        }
    }
`;

const SearchAdornment = () => (
    <InputAdornment className="search-adornment" position="start">
        <Icon className="icon-search">search_icon</Icon>
    </InputAdornment>
);

const ClearAdornment = ({ onClick }) => (
    <InputAdornment className="clear-adornment" position="end">
        <Fab
            aria-label="Remove"
            className="btn-clear-search"
            size="small"
            onClick={onClick}
        >
            <Icon className="icon-clear">clear_icon</Icon>
        </Fab>
    </InputAdornment>
);

ClearAdornment.propTypes = {
    onClick: PropTypes.func.isRequired,
};

const SearchBar = (props) => {
    const { search, onClickClearSearch, onChangeSearch } = props;
    return (
        <Wrapper className="section-search-bar">
            <InputBase
                id="search-bar"
                className="input-search-bar"
                startAdornment={<SearchAdornment />}
                endAdornment={
                    search ? (
                        <ClearAdornment onClick={onClickClearSearch} />
                    ) : (
                        undefined
                    )
                }
                placeholder="search anything"
                value={search}
                onChange={onChangeSearch}
            />
        </Wrapper>
    );
};

SearchBar.propTypes = {
    search: PropTypes.string.isRequired,
    onClickClearSearch: PropTypes.func.isRequired,
    onChangeSearch: PropTypes.func.isRequired,
};

export default SearchBar;
