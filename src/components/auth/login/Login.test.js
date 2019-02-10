import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import {
  render, fireEvent, wait, waitForDomChange,
} from 'react-testing-library';
import { Provider } from 'react-redux';
import MockAdapter from 'axios-mock-adapter';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import thunk from 'redux-thunk';
import axiosInstance from '../../../utils/axiosInstance';
import reducers from '../../../reducers';
import * as authUtils from '../../../utils/auth';
import Login from './Login';

const axiosMock = new MockAdapter(axiosInstance, { delayResponse: 500 });
const store = createStore(reducers, applyMiddleware(thunk));
const history = createMemoryHistory({ initialEntries: ['/', '/login'] });
history.push = jest.fn();

const renderWithRedux = (ui, reduxStore) => ({
  ...render(<Provider store={reduxStore}>{ui}</Provider>),
  store,
});

describe('Login Component', () => {
  let emailInput;
  let passwordInput;
  let submitButton;
  let LoginComponent;

  beforeEach(() => {
    const ui = (
      <Router history={history}>
        <Login history={history} />
      </Router>
    );

    LoginComponent = renderWithRedux(ui, store);
    const { getByLabelText, container } = LoginComponent;

    emailInput = getByLabelText('Email');
    passwordInput = getByLabelText('Password');
    submitButton = container.querySelector('button[type=submit]');
  });

  afterEach(axiosMock.restore);
  afterAll(history.push.mockRestore);

  const fillLoginForm = () => {
    fireEvent.change(emailInput, { target: { value: 'adesewa@gmail.com' } });
    fireEvent.change(passwordInput, { target: { value: 'Adesewa123' } });
  };

  test('Login component should render all inputs and labels', () => {
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(submitButton.textContent).toBe('Login');
  });

  test('fill and submit form with success', async () => {
    const { getByText, container } = LoginComponent;

    await axiosMock.onPost().replyOnce(201, {
      data: {
        token: 'ThisIsNotArealToken',
      },
      status: 'success',
    });

    fillLoginForm();
    fireEvent.click(submitButton);

    await wait(() => expect(authUtils.getToken()).toBe('ThisIsNotArealToken'));
    expect(authUtils.getToken()).toBe('ThisIsNotArealToken');
    expect(history.push).toHaveBeenCalledTimes(1);
  });

  // test('Throws error for incomplete credential', async () => {
  //   const fillLogin = () => {
  //     fireEvent.change(emailInput, { target: { value: 'adesewa@gmail.com' } });
  //     fireEvent.change(passwordInput, { target: { value: '' } });
  //   };

  //   await axiosMock.onPost().replyOnce(500, {
  //     status: 'failure',
  //   });
  //   const { getByText, container } = LoginComponent;

  //   fillLogin();
  //   fireEvent.click(submitButton);

  //   expect(getByText(/Login not successful/i)).toBeInTheDocument();
  //   // await waitForDomChange({});
  //   console.log(container.innerHTML);
  // });
});
