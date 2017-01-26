import React from 'react'
import { shallow } from 'enzyme'
import Picker from '../components/Picker'
import assert from 'power-assert'

describe('Picker', () => {
  it('should render self', () => {
    const props = {
      value: 'yahho',
      onChange: (value) => {
        console.log(value)
      }.
      options: ['hoge', 'fuga'],
    }
    const wrapper = shallow(<Picker {...props}/>)
    assert(wrapper.find('span').exists() === true)
  })
})
