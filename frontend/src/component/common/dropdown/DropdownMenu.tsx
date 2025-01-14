import { ReactNode, useContext, useRef, useEffect } from 'react';
import classNames from 'classnames';
import { ToggleContext } from '@/context/DropdownContext.tsx';
import { DropdownInstanceContext } from '@/context/DropdownInstanceContext';

interface IDropdownMenuProps {
  /** 드롭다운 메뉴가 열려있는지 여부 */
  children: ReactNode | ReactNode[];
}

/**
 * 드롭다운 메뉴 컴포넌트입니다.
 *
 *  @param {ReactNode} children - 드롭다운 메뉴에 들어갈 컨텐츠
 *  @return {JSX.Element} 드롭다운 메뉴 컴포넌트
 *
 *  @remarks
 *  - 드롭다운 메뉴 컴포넌트는 드롭다운 컴포넌트 내부에서 사용되어야 합니다.
 *  - 드롭다운 메뉴 컴포넌트는 드롭다운 메뉴 역할을 수행합니다.
 *
 * @example
 *  ```tsx
 *  <Dropdown.Menu>
 *    <Dropdown.Item>메뉴 항목 1</Dropdown.Item>
 *    <Dropdown.Item>메뉴 항목 2</Dropdown.Item>
 *  </Dropdown.Menu>
 *  ```
 */

export const DropdownMenu = (props: IDropdownMenuProps) => {
  const { openDropdownId, setOpenDropdownId } = useContext(ToggleContext);
  const dropdownId = useContext(DropdownInstanceContext);
  const isOpen = openDropdownId === dropdownId;
  const ref = useRef<HTMLUListElement | null>(null);

  const handleOutSideClick = (event: MouseEvent) => {
    const { target } = event;

    if (!(target instanceof HTMLElement)) {
      return;
    }

    if (
      ref.current &&
      target &&
      !ref.current.contains(target) &&
      target.dataset.component !== 'DropdownTrigger'
    ) {
      setOpenDropdownId(null); // 외부 클릭 시 드롭다운 닫기
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('click', handleOutSideClick);
    } else {
      document.removeEventListener('click', handleOutSideClick);
    }
    return () => {
      document.removeEventListener('click', handleOutSideClick);
    };
  }, [isOpen]);

  return (
    isOpen && (
      <ul
        ref={ref}
        className={classNames(
          'align-center',
          'animate-smoothAppear',
          'absolute',
          'right-0',
          'top-8',
          'z-[6000]',
          'flex',
          'flex-col',
          'justify-center',
          'gap-2.5',
          'rounded-xl',
          'p-2.5',
          'shadow-2xl',
          'w-fit',
          'bg-white',
          'list-none',
        )}
      >
        {props.children}
      </ul>
    )
  );
};
