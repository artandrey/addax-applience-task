import React, { useRef } from 'react';
import styled from 'styled-components';
import Button from '../Button';

interface SearchFormProps {
  handleSearch?: (value: string) => void;
}

const Wrapper = styled.div`
  padding: 1rem;
  display: flex;
  justify-content: center;
  gap: 1rem;
`;

const SearchBar = styled.input`
  padding: 0.5rem 1rem;
  border-radius: 0.2rem;
  border: solid 1px #222;
`;

const SearchForm: React.FC<SearchFormProps> = ({ handleSearch }) => {
  const searchbarRef = useRef<HTMLInputElement>(null);

  function handleSubmit() {
    const value = searchbarRef.current?.value;
    handleSearch && handleSearch(value ?? '');
  }

  function handleReset() {
    const target = searchbarRef.current;
    if (!target) return;
    target.value = '';
    handleSearch && handleSearch('');
  }

  return (
    <Wrapper>
      <SearchBar ref={searchbarRef} type="search" placeholder="Search..." />
      <Button onClick={handleSubmit}>Search</Button>
      <Button onClick={handleReset}>Reset</Button>
    </Wrapper>
  );
};

export default SearchForm;
