import React, { ReactNode } from 'react';
import Downshift, { DownshiftProps } from 'downshift';
import fruits, { Fruit } from './fruits'

type FruitInputProps = {
  initialSelectedItem: Fruit | null
  onChange: DownshiftProps<Fruit>['onChange']
  label: ReactNode
}

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
        <div>
          <label {...getLabelProps()}>{label}</label>
          <div
            style={{ display: "inline-block" }}
            {...getRootProps(undefined, { suppressRefError: true })}
          >
            <input {...getInputProps()} />
          </div>
          <ul {...getMenuProps()}>
            {isOpen
              ? fruits
                .filter(item => !inputValue || item.value.includes(inputValue))
                .map((item, index) => (
                  <li
                    {...getItemProps({
                      key: item.value,
                      index,
                      item,
                      style: {
                        backgroundColor:
                          highlightedIndex === index ? "lightgray" : "white",
                        fontWeight: selectedItem === item ? "bold" : "normal"
                      }
                    })}
                  >
                    {item.value}
                  </li>
                ))
              : null}
          </ul>
        </div>
      )}
  </Downshift>
}

