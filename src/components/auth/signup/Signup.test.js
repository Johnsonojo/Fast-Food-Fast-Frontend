import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { render, fireEvent, waitForDomChange } from 'react-testing-library';
import { Provider } from 'react-redux';
import MockAdapter from 'axios-mock-adapter';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import thunk from 'redux-thunk';
import 'react-testing-library/cleanup-after-each';
import 'jest-dom/extend-expect';
import axiosInstance from '../../../utils/axiosInstance';
import reducers from '../../../reducers';
import Signup from './Signup';

const axiosMock = new MockAdapter(axiosInstance, { delayResponse: 500 });
const store = createStore(reducers, applyMiddleware(thunk));
const history = createMemoryHistory({ initialEntries: ['/', '/signup'] });
history.push = jest.fn();

const renderWithRedux = (ui, reduxStore) => ({
  ...render(<Provider store={reduxStore}>{ui}</Provider>),
  store,
});

describe('Signup Component', () => {
  let emailInput;
  let usernameInput;
  let passwordInput;
  let confirmPasswordInput;
  let submitButton;
  let SignupComponent;

  beforeEach(() => {
    const ui = (
      <Router history={history}>
        <Signup history={history} />
      </Router>
    );

    SignupComponent = renderWithRedux(ui, store);
    const { getByLabelText, container } = SignupComponent;

    usernameInput = getByLabelText('Username');
    emailInput = getByLabelText('Email');
    passwordInput = getByLabelText('Password');
    confirmPasswordInput = getByLabelText('Confirm Password');
    submitButton = container.querySelector('button[type=submit]');
  });

  afterEach(axiosMock.restore);
  afterAll(history.push.mockRestore);

  const fillSignupForm = () => {
    fireEvent.change(usernameInput, { target: { value: 'Adesewa' } });
    fireEvent.change(emailInput, { target: { value: 'adesewa@gmail.com' } });
    fireEvent.change(passwordInput, { target: { value: 'Adesewa123' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'Adesewa123' } });
  };

  test('Signup component should render all inputs and labels', () => {
    expect(usernameInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(confirmPasswordInput).toBeInTheDocument();
    expect(submitButton.textContent).toBe('Sign Up');
  });

  test('should signup a user successfully', async () => {
    const { getByText, container } = SignupComponent;

    axiosMock.onPost().replyOnce(200, {
      data: {
        id: 6,
        username: 'johnwick',
        email: 'johnwik@gmail.com',
        token: 'eynewToken',
      },
      message: 'You signed up successfully',
    });

    fillSignupForm();
    fireEvent.click(submitButton);
    await waitForDomChange({ container });
    expect(getByText('You signed up successfully')).toBeInTheDocument();
  });

  test('should not signup a user successfully', async () => {
    const { getByText, container } = SignupComponent;

    await axiosMock.onPost().replyOnce(500, {
      data: [{ msg: 'signup not successful' }],
    });
    fillSignupForm();
    fireEvent.click(submitButton);
    await waitForDomChange({ container });
    expect(getByText('signup not successful')).toBeInTheDocument();
  });
  test('should throw an error for unmatched password', async () => {
    const { getByText, queryByText } = SignupComponent;

    fireEvent.keyUp(confirmPasswordInput);

    fireEvent.change(passwordInput, { target: { value: 'numjij' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'numjijbcsvhj' } });

    fireEvent.keyUp(confirmPasswordInput);

    expect(getByText(/passwords does not match!/i)).toBeInTheDocument();

    fireEvent.change(confirmPasswordInput, { target: { value: 'numjij' } });

    fireEvent.keyUp(confirmPasswordInput);

    expect(queryByText(/passwords does not match!/i)).not.toBeInTheDocument();
  });
});
