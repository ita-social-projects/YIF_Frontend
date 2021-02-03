import React from 'react';
import { render, fireEvent, wait } from '@testing-library/react';
import ImageUploader from './index';
import { store } from '../../store/store';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import userReducer from '../../store/reducers/setUserReducer';

function renderWithRedux(
  ui,
  {
    initialState,
    store = createStore(userReducer, initialState),
    ...renderOptions
  } = {}
) {
  function Wrapper({ children }) {
    return <Provider store={store}>{children}</Provider>;
  }
  return render(ui, { wrapper: Wrapper, ...renderOptions });
}

describe('IMAGE UPLOADER AVATAR', () => {
  it('should render component with redux photo', async () => {
    const handleClick = jest.fn();

    const { container } = renderWithRedux(
      <MemoryRouter>
        <ImageUploader onClick={handleClick()} additionalStyles={{}} />
      </MemoryRouter>,
      {
        initialState: {
          user: {
            surname: '',
            name: '',
            middleName: '',
            email: '',
            phoneNumber: '',
            schoolName: '',
            photo: './test.jpg',
          },
        },
      }
    );

    const div = container.querySelector('div');
    expect(div).toBeInTheDocument();
    fireEvent.click(div);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('should render component without seted photo', async () => {
    const handleClick = jest.fn();

    const { container } = render(
      <Provider store={store}>
        <MemoryRouter>
          <ImageUploader onClick={handleClick()} additionalStyles={{}} />
        </MemoryRouter>
      </Provider>
    );

    const div = container.querySelector('div');
    expect(div).toBeInTheDocument();
    fireEvent.click(div);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
