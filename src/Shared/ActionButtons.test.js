import React from 'react';
import { shallow } from 'enzyme';
import { mountWithIntl } from '../Shared/Helpers/intl-enzyme-test-helper';
import toJson from 'enzyme-to-json';
import { ActionButtons, ConditionalButton } from './ActionButtons';
import Button from 'material-ui/Button';

const fakePrimaryButtonProps = { textId: 'save' };
const fakeCancelButtonProps = { onClick: jest.fn() };

const defaultProps = {
  classes: {},
};

const setup = setupProps => {
  const allProps = { ...defaultProps, ...setupProps };
  return shallow(<ActionButtons {...allProps} />);
};

describe('<ActionButtons />', () => {
  it('renders primary button without cancel button', () => {
    const buttons = setup({ primaryButtonProps: fakePrimaryButtonProps });
    expect(toJson(buttons)).toMatchSnapshot();
  });

  it('renders cancel button without primary button', () => {
    const buttons = setup({ cancelButtonProps: fakeCancelButtonProps });
    expect(toJson(buttons)).toMatchSnapshot();
  });

  it('renders cancel button before primary button', () => {
    const buttons = setup({
      primaryButtonProps: fakePrimaryButtonProps,
      cancelButtonProps: fakeCancelButtonProps,
    });

    expect(
      buttons
        .find(ConditionalButton)
        .at(0)
        .prop('buttonProps').onClick
    ).toEqual(fakeCancelButtonProps.onClick);
    expect(
      buttons
        .find(ConditionalButton)
        .at(1)
        .prop('buttonProps').textId
    ).toEqual(fakePrimaryButtonProps.textId);
    expect(toJson(buttons)).toMatchSnapshot();
  });

  it('renders with extraButtons', () => {
    const buttons = setup({
      primaryButtonProps: fakePrimaryButtonProps,
      cancelButtonProps: fakeCancelButtonProps,
      extraButtons: [{ textId: 'extra1' }, { textId: 'extra2' }],
    });

    expect(toJson(buttons)).toMatchSnapshot();
  });
});

describe('<ConditionalButton />', () => {
  it('does not render when condition is falsy', () => {
    expect(
      shallow(
        <ConditionalButton
          condition={false}
          buttonProps={fakePrimaryButtonProps}
        />
      ).getNode()
    ).toBeNull();
  });

  it('renders when condition is undefined', () => {
    expect(
      shallow(<ConditionalButton buttonProps={fakePrimaryButtonProps} />).find(
        Button
      )
    ).toHaveLength(1);
  });

  it('renders expected button', () => {
    expect(
      toJson(
        mountWithIntl(
          <ConditionalButton buttonProps={fakePrimaryButtonProps} />
        )
      )
    ).toMatchSnapshot();
  });
});
