import React from 'react';
import styles from '../superAdminAccount.module.scss';
import { ReactComponent as IconSearch } from '../icons/iconSearch.svg';
const iconClose = 'assets/icons/close.svg';

interface Props {
  searchValue: string;
  handlerSearch: Function;
  clearInput: Function;
  textInput: any;
}

const Search: React.FC<Props> = (props) => {
  const { searchValue, handlerSearch, clearInput, textInput } = props;
  return (
    <div className={styles.search}>
      <label>
        <IconSearch />
        <input
          type='text'
          placeholder='Пошук'
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handlerSearch(e)
          }
          ref={textInput}
        />
        <img
          src={iconClose}
          className={`${styles.clearInput} ${searchValue && styles.active}`}
          alt='close'
          onClick={() => clearInput()}
        />
      </label>
    </div>
  );
};
export default Search;
