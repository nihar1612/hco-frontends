import { render } from '@testing-library/react';
import Footer from './Footer';

// We need to mock useRouter() as it is used in <Link /> component
jest.mock('next/router', () => ({
  useRouter() {
    return {
      route: '/',
      pathname: '',
      query: '',
      asPath: '',
    };
  },
}));

describe('Footer', () => {
  it('should render', () => {
    const screen = render(<Footer />);
    expect(screen.getByText('Terms')).toBeInTheDocument();
    expect(screen.getByText('Privacy')).toBeInTheDocument();
    expect(screen.getByText('Jobs')).toBeInTheDocument();
    expect(screen.getByText('Contact')).toBeInTheDocument();
    expect(screen.getByText(`© ${new Date().getFullYear()} Sleepedy, Inc`)).toBeInTheDocument();
  });
});
