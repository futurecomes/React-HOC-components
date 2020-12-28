import React from 'react'

import SearchBarContainer from 'src/containers/common/Table/Bars/SearchBar'

import Input from 'src/shared/components/old/form/Input'

import { css } from 'src/styles/old'
import styles from './styles'

const handleSubmit = e => {
    e.preventDefault()
    e.stopPropagation()
}

const SearchBar = ({ handleSearch }) => (
    <form className={css(styles.form)} onSubmit={handleSubmit}>
        <div className={css(styles.searchInputContainer)}>
            <Input
                name="search"
                label=""
                placeholder="Search"
                onChange={(_, searchText) => handleSearch(searchText)}
            />
        </div>
    </form>
)

export default SearchBarContainer(SearchBar)
