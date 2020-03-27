import React from 'react';
import Table from "./Table";
import {TABLE} from "../styles/busList";
import { shallow } from 'enzyme';

const vehicleId = "LK65EBV";
const buses = [];
const setup = () => {
  return shallow(<Table vehicleId={vehicleId} buses={buses}/>);
};
 
describe('Table', () => {
  let result;
  beforeAll(() => {
    result = setup();
    return result;
  });
  
  it('should have a parent div whose key attribute is set to the vehiclId', () => {
    const element = result.find('div');
    expect(element.findWhere(node => node.key() === vehicleId));
  }); 
  describe('table', () => {
    it('should contain one table element', () => {
      const element = result.find(TABLE);
      expect(element).toHaveLength(1);
    });
  });
  describe('thead', () => {
    it('should contain one thead element', () => {
      const element = result.find('thead');
      expect(element).toHaveLength(1);
    });
    it('should contain vehicleId', () => {
      const element = result.find('thead');
      expect(element.text()).toContain(vehicleId);
    });
  });
  describe('tbody', () => {
    it('should contain one tbody element', () => {
      const element = result.find('tbody');
      expect(element).toHaveLength(1);
    });
  });
});