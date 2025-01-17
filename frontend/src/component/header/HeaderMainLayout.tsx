import { ReactNode } from 'react';
import { Header } from '@/component/header/Header.tsx';

interface IHeaderMainLayoutProps {
  leftButton?: string;
  rightButton?: string;
  title?: ReactNode;
}

export const HeaderMainLayout = (props: IHeaderMainLayoutProps) => {
  const chooseButton = (buttonName: string) => {
    switch (buttonName) {
      case 'back':
        return <Header.BackButton />;
      case 'dropdown':
        return <Header.Dropdown />;
      default:
        return null;
    }
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-1">
        {props.leftButton && chooseButton(props.leftButton)}
        {props.title}
      </div>
      {props.rightButton && chooseButton(props.rightButton)}
    </div>
  );
};
