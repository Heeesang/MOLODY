import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Button from './button';

describe('Button 컴포넌트', () => {
  it('올바른 텍스트를 가지고 렌더링되어야 한다', () => {
    // Arrange
    render(<Button text="테스트 버튼" />)

    // Act & Assert
    const buttonElement = screen.getByText('테스트 버튼');
    expect(buttonElement).toBeInTheDocument();
  });

  it('클릭했을 때 onClick 함수가 호출되어야 한다', async () => {
    // Arrange
    const handleClick = jest.fn();
    render(<Button text="클릭" onClick={handleClick} />);
    const buttonElement = screen.getByText('클릭');

    // Act
    await userEvent.click(buttonElement);

    // Assert
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('className prop으로 추가적인 스타일을 적용할 수 있어야 한다', () => {
    // Arrange
    const customClass = 'bg-blue-500';
    render(<Button text="스타일 테스트" className={customClass} />);

    // Act
    const buttonElement = screen.getByText('스타일 테스트');

    // Assert
    expect(buttonElement).toHaveClass(customClass);
  });
});
