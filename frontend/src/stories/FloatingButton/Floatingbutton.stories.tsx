import { Meta, Story } from '@storybook/react';
import { FloatingButton } from '@/component/common/floatingButton/FloatingButton'; // 경로에 맞게 수정하세요.
import { ButtonState } from '@/component/common/enums';
import { useFloatingButton } from '@/hooks/useFloatingButton';

export default {
  title: 'Components/FloatingButton',
  component: FloatingButton,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'FloatingButton은 열기와 닫기 상태를 관리하는 버튼입니다. 상태에 따라 버튼의 텍스트가 변경됩니다.',
      },
    },
  },
  argTypes: {
    isMenuOpen: {
      control: 'boolean',
      description: '메뉴가 열려 있는지 여부를 나타냅니다.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    toggleMenu: {
      action: 'toggleMenu',
      description: '메뉴를 토글하는 함수입니다.',
      table: {
        type: { summary: 'function' },
      },
    },
    toolType: {
      control: 'select',
      options: Object.values(ButtonState),
      description: '도구 버튼의 상태를 나타냅니다.',
      table: {
        type: { summary: 'ButtonState' },
        defaultValue: { summary: 'CLOSE' },
      },
    },
    handleMenuClick: {
      action: 'handleMenuClick',
      description: '도구를 선택할 수 있는 함수입니다.',
      table: {
        type: { summary: 'function' },
      },
    },
  },
} as Meta<typeof FloatingButton>;

const Template2: Story<typeof FloatingButton> = args => <FloatingButton {...args} />;

const Template: Story = () => {
  const { isMenuOpen, toolType, toggleMenu, handleMenuClick } = useFloatingButton();

  return (
    <div>
      <FloatingButton
        isMenuOpen={isMenuOpen}
        toolType={toolType}
        toggleMenu={toggleMenu}
        handleMenuClick={handleMenuClick}
      />
    </div>
  );
};
export const CloseState = Template2.bind({});
CloseState.argTypes = {
  isMenuOpen: { table: { disable: true } }, // isMenuOpen을 테이블에서 제외
  toolType: { table: { disable: true } }, // toolType을 테이블에서 제외
};
CloseState.args = {
  isMenuOpen: false, // 닫힘 상태
  toolType: ButtonState.CLOSE, // 닫기 상태
};
CloseState.parameters = {
  docs: {
    description: {
      story:
        '이 버튼은 닫힌 상태를 나타냅니다. 메뉴는 열려 있지 않으며, 버튼은 "열기"로 변경됩니다.',
    },
  },
};

export const OpenState = Template2.bind({});
OpenState.argTypes = {
  isMenuOpen: { table: { disable: true } }, // isMenuOpen을 테이블에서 제외
  toolType: { table: { disable: true } }, // toolType을 테이블에서 제외
};
OpenState.args = {
  isMenuOpen: true, // 열림 상태
  toolType: ButtonState.OPEN, // 열기 상태
};
OpenState.parameters = {
  docs: {
    description: {
      story: '이 버튼은 열린 상태를 나타냅니다. 메뉴는 열려 있으며, 버튼은 "닫기"로 변경됩니다.',
    },
  },
};

// ToggleState에서는 control을 사용 가능하게 설정
export const ToggleState = Template.bind({});
ToggleState.args = {
  isMenuOpen: false, // 초기 상태는 닫힘
  toolType: ButtonState.CLOSE, // 닫기 상태
};
ToggleState.parameters = {
  docs: {
    description: {
      story:
        '이 버튼은 상태를 토글할 수 있는 버튼입니다. 클릭하면 메뉴가 열리고 닫히며 버튼 상태도 변경됩니다.',
    },
  },
};