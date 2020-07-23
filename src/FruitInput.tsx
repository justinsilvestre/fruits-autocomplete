import React, { ReactNode } from 'react';
import Downshift, { DownshiftProps } from 'downshift';
import fuzzysort from 'fuzzysort'
import styled from 'styled-components'
import fruits, { Fruit, FRUITS_SORT_KEY } from './fruits'

type FruitInputProps = {
  initialSelectedItem: Fruit | null
  onChange: DownshiftProps<Fruit>['onChange']
  label: ReactNode
}

const Container = styled.div`
  max-width: 15em;
  position: relative;
`
const InputWrapper = styled.div`
  display: block;
`
const Input = styled.input`
  width: 100%;
  box-sizing: border-box;
  font-size: inherit;
`
const Label = styled.label`
  display: block;
  font-size: .8em;
  margin-bottom: .4em
`
const OptionsList = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
  width: 100%;
  box-sizing: border-box;
  position: absolute;
  z-index: 99999;
  left: 0;
  max-height: 9.5em;
  overflow-y: auto;
  box-shadow: 1px 2px 3px rgba(0, 0, 0, .3);
`
const OptionsListItem = styled.li<{ highlightedIndex: number, index: number, selectedItem: Fruit | null, item: Fruit }>`
  padding: .2em;
  background-color: ${props => props.highlightedIndex === props.index ? "#eeeeee" : "white"};
  font-weight: ${props => props.selectedItem === props.item ? "bold" : "normal"};f
`

export default function FruitInput({ initialSelectedItem, onChange, label }: FruitInputProps) {
  return <Downshift
    initialSelectedItem={initialSelectedItem || undefined}
    onChange={onChange}
    itemToString={item => (item ? item.value : "")}
  >
    {({
      getInputProps,
      getItemProps,
      getLabelProps,
      getMenuProps,
      isOpen,
      inputValue,
      highlightedIndex,
      selectedItem,
      getRootProps
    }) => (
        <Container>
          <Label {...getLabelProps()}>{label}</Label>
          <InputWrapper
            {...getRootProps(undefined, { suppressRefError: true })}
          >
            <Input {...getInputProps()} />
          </InputWrapper>
          {isOpen
            ? <OptionsList {...getMenuProps()}>
              {(inputValue ? fuzzysort.go(inputValue, fruits, { key: FRUITS_SORT_KEY }).map(r => r.obj) : fruits)
                .map((item, index) => (
                  <OptionsListItem
                    {...getItemProps({
                      key: item.value,
                      index,
                      item,
                    })}
                    selectedItem={selectedItem}
                    item={item}
                    index={index}
                    highlightedIndex={highlightedIndex}
                  >
                    {item.value}
                  </OptionsListItem>
                ))
              }
            </OptionsList> : null}
        </Container>
      )}
  </Downshift>
}

