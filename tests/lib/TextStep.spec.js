import React from 'react';
import { describe, it } from 'mocha';
import { expect } from 'chai';
import { mount } from 'enzyme';
import { TextStep } from '../../lib/steps/steps';
import Bubble from '../../lib/steps/text/Bubble';
import Image from '../../lib/steps/text/Image';

const CustomComponent = () => (
  <div />
);

describe('TextStep', () => {
  describe('Bot text', () => {
    const settings = {
      step: {
        id: '1',
        audio: false,
        message: 'Hello',
        delay: 1000,
        bubbleColor: '#eee',
        fontColor: '#000',
        avatar: '',
      },
      isFirst: true,
      isLast: true,
      avatarStyle: {},
      bubbleStyle: {},
      triggerNextStep: () => {},
    };

    const wrapper = mount(<TextStep {...settings} />);
    wrapper.setState({ loading: false });

    it('should render', () => {
      expect(wrapper.hasClass('rsc-ts')).to.be.equal(true);
    });

    it('should render bubble with background color equal \'#eee\'', () => {
      expect(wrapper.props().step.bubbleColor).to.be.equal('#eee');
    });

    it('should render bubble with font color equal \'#000\'', () => {
      expect(wrapper.props().step.fontColor).to.be.equal('#000');
    });

    it('should render image', () => {
      expect(wrapper.find(Image).exists()).to.be.equal(true);
    });

    it('should render bubble with message equal \'Hello\'', () => {
      expect(wrapper.find(Bubble).text()).to.be.equal('Hello');
    });

    it('should render a first bubble (but not last)', () => {
      const tsWrapper = mount(<TextStep {...settings} isFirst={true} isLast={false} />);
      tsWrapper.setState({ loading: false });

      expect(tsWrapper.find(Image).exists()).to.be.equal(true);
    });

    it('should render a middle bubble', () => {
      const tsWrapper = mount(<TextStep {...settings} isFirst={false} isLast={false} />);
      tsWrapper.setState({ loading: false });

      expect(tsWrapper.find(Image).exists()).to.be.equal(false);
    });
  });

  describe('User text', () => {
    const settings = {
      step: {
        id: '1',
        message: 'Hello',
        delay: 1000,
        user: true,
        bubbleColor: '#eee',
        fontColor: '#000',
        avatar: '',
      },
      isFirst: false,
      isLast: true,
      avatarStyle: {},
      bubbleStyle: {},
      triggerNextStep: () => {},
    };

    const wrapper = mount(<TextStep {...settings} />);
    wrapper.setState({ loading: false });

    it('should render bubble without image (not first)', () => {
      expect(wrapper.find(Image).exists()).to.be.equal(false);
    });

    it('should render a first bubble', () => {
      const tsWrapper = mount(<TextStep {...settings} isFirst={true} isLast={false} />);
      tsWrapper.setState({ loading: false });

      expect(tsWrapper.find(Image).exists()).to.be.equal(true);
    });

    it('should render a middle bubble', () => {
      const tsWrapper = mount(<TextStep {...settings} isFirst={false} isLast={false} />);
      tsWrapper.setState({ loading: false });

      expect(tsWrapper.find(Image).exists()).to.be.equal(false);
    });
  });

  describe('Component text', () => {
    const settings = {
      step: {
        id: '1',
        component: <CustomComponent />,
        waitUser: true,
      },
      isFirst: false,
      isLast: true,
      avatarStyle: {},
      bubbleStyle: {},
      triggerNextStep: () => {},
    };

    const wrapper = mount(<TextStep {...settings} />);
    wrapper.setState({ loading: false });

    it('should render bubble with component', () => {
      expect(wrapper.find(CustomComponent).exists()).to.be.equal(true);
    });
  });
});
