
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SongForm from './songForm';
import { User } from '@supabase/supabase-js';
import { insertSongAction } from '@/app/actions/songInsertAction';

// 서버 액션(DB호출)을 가짜 함수(mock)로 대체
jest.mock('@/app/actions/songInsertAction', () => ({
  insertSongAction: jest.fn(),
}));

// useFormStatus 훅의 pending 상태를 제어하기 위해 mock 처리
jest.mock('react-dom', () => ({
  ...jest.requireActual('react-dom'),
  useFormStatus: () => ({ pending: false }),
}));

describe('SongForm 컴포넌트', () => {
  const mockUser = { id: 'test-user-id' } as User;
  const mockedInsertSongAction = insertSongAction as jest.Mock;
  const user = userEvent.setup();

  beforeEach(() => {
    // 각 테스트 독립성 보장을 위해 mock 기록 초기화
    mockedInsertSongAction.mockClear();
  });

  it('사용자가 로그인하지 않았을 때 입력 필드와 버튼이 비활성화되어야 한다', () => {
    render(<SongForm user={null} />);
    expect(screen.getByPlaceholderText('YouTube URL 입력')).toBeDisabled();
    expect(screen.getByRole('button', { name: '로그인 후 이용 가능' })).toBeDisabled();
  });

  it('사용자가 로그인했을 때 입력 필드와 버튼이 활성화되어야 한다', () => {
    render(<SongForm user={mockUser} />);
    expect(screen.getByPlaceholderText('YouTube URL 입력')).toBeEnabled();
    expect(screen.getByRole('button', { name: '확인' })).toBeEnabled();
  });

  it('분위기 버튼을 클릭하면 숨겨진 input의 값이 변경되어야 한다', async () => {
    const { container } = render(<SongForm user={mockUser} />);
    
    const hiphopButton = screen.getByRole('button', { name: '힙합' });
    const genreInput = container.querySelector('input[name="genre"]');

    expect(genreInput).toBeInTheDocument();
    expect(genreInput).toHaveValue('팝'); // 초기 값 확인

    await user.click(hiphopButton);

    expect(genreInput).toHaveValue('힙합'); // 값 변경 확인
  });

  it('폼 제출 실패 시 에러 메시지를 표시해야 한다', async () => {
    const errorMessage = '서버에서 에러 발생';
    // 액션이 에러를 반환하는 상황을 시뮬레이션
    mockedInsertSongAction.mockResolvedValue({ error: errorMessage });

    render(<SongForm user={mockUser} />);

    await user.type(screen.getByPlaceholderText('YouTube URL 입력'), 'https://www.youtube.com/watch?v=test');
    await user.click(screen.getByRole('button', { name: '확인' }));

    // 에러 메시지가 화면에 표시되는지 확인
    expect(await screen.findByText(errorMessage)).toBeInTheDocument();
  });

  it('폼 제출 성공 시 에러 메시지가 없어야 한다', async () => {
    const successMessage = '서버에서 에러 발생';
    // 액션이 성공(에러 없음)을 반환하는 상황을 시뮬레이션
    mockedInsertSongAction.mockResolvedValue({ error: null });

    render(<SongForm user={mockUser} />);

    await user.type(screen.getByPlaceholderText('YouTube URL 입력'), 'https://www.youtube.com/watch?v=test');
    await user.click(screen.getByRole('button', { name: '확인' }));

    // 에러 메시지가 화면에 없는지 확인
    await waitFor(() => {
      expect(screen.queryByText(successMessage)).not.toBeInTheDocument();
    });
  });
});
