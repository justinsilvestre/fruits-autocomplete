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
const OptionsListItem = styled.li<{ highlightedIndex: number, index: number, item: Fruit }>`
  padding: .2em;
  background-color: ${props => props.highlightedIndex === props.index ? "#eeeeee" : "white"};
  color: ${props => props.item.value ? 'initial' : '#dddddd'}
  transition: .2s all;
`
const GreyText = styled.span`color: #AAAAAA;`

const fuzzySortFormattedFruits = fruits.map((fruit) => ({ obj: fruit, indexes: [] as number[] })) as unknown as Fuzzysort.KeyResults<Fruit>

export default function FruitInput({ initialSelectedItem, onChange, label }: FruitInputProps) {
  return <Downshift
    initialSelectedItem={initialSelectedItem || undefined}
    onChange={onChange}
    itemToString={item => (item?.value || "")}
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
      getRootProps,
    }) => (
        <Container>
          <Label {...getLabelProps()}>{label}</Label>
          <InputWrapper
            {...getRootProps(undefined, { suppressRefError: true })}
          >
            <Input {...getInputProps()} placeholder={highlightedIndex ? fruits[highlightedIndex]?.value : undefined} />
          </InputWrapper>
          {isOpen
            && <OptionsList {...getMenuProps()}>
              {(inputValue ? fuzzysort.go(inputValue, fruits, { key: FRUITS_SORT_KEY }) : fuzzySortFormattedFruits)
                .map((result: { obj: Fruit, indexes: number[] }, index: number) => (
                  <OptionsListItem
                    {...getItemProps({
                      key: result.obj?.value || 'None',
                      index,
                      item: result.obj,
                    })}
                    selectedItem={selectedItem}
                    item={result}
                    index={index}
                    highlightedIndex={highlightedIndex}
                  >
                    {result.obj.value ?
                      <HighlightedMatches text={result.obj.value} highlightedIndexes={result.indexes} /> : <GreyText>None</GreyText>}
                  </OptionsListItem>
                ))
              }
            </OptionsList>}
        </Container>
      )}
  </Downshift>
}

function HighlightedMatches({ text, highlightedIndexes }: { text: string, highlightedIndexes: number[] }) {
  if (!highlightedIndexes.length) return <>{text}</>

  const chars = []
  for (const index of highlightedIndexes) {
    const precedingExtraMatchText = text.slice(chars.length, index)
    const matchText = <b key={index + text[index]}>{text[index]}</b>
    chars.push(...precedingExtraMatchText)
    chars.push(matchText)
  }
  if (chars.length !== text.length) {
    chars.push(...text.slice(chars.length))
  }
  return <>{chars}</>
}