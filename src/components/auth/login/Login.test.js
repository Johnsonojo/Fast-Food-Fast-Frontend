// import React from 'react';
// import { createStore, applyMiddleware } from 'redux';
// import {
//   render, fireEvent, wait, waitForDomChange,
// } from 'react-testing-library';
// import { Provider } from 'react-redux';
// import MockAdapter from 'axios-mock-adapter';
// import { createMemoryHistory } from 'history';
// import { Router } from 'react-router-dom';
// import thunk from 'redux-thunk';
// import 'react-testing-library/cleanup-after-each';
// import 'jest-dom/extend-expect';
// import axiosInstance from '../../../utils/axiosInstance';
// import reducers from '../../../reducers';
// import * as authUtils from '../../../utils/auth';
// import Login from './Login';

// const axiosMock = new MockAdapter(axiosInstance, { delayResponse: 500 });
// const store = createStore(reducers, applyMiddleware(thunk));
// const history = createMemoryHistory({ initialEntries: ['/', '/login'] });
// history.push = jest.fn();

// const renderWithRedux = (ui, reduxStore) => ({
//   ...render(<Provider store={reduxStore}>{ui}</Provider>),
//   store,
// });

// describe('Login Component', () => {
//   let emailInput;
//   let passwordInput;
//   let submitButton;
//   let LoginComponent;

//   beforeEach(() => {
//     const ui = (
//       <Router history={history}>
//         <Login history={history} />
//       </Router>
//     );

//     LoginComponent = renderWithRedux(ui, store);
//     const { getByLabelText, container } = LoginComponent;

//     emailInput = getByLabelText('Email');
//     passwordInput = getByLabelText('Password');
//     submitButton = container.querySelector('button[type=submit]');
//   });

//   afterEach(axiosMock.reset);
//   afterAll(() => {
//     history.push.mockRestore();
//     axiosMock.restore();
//   });

//   const fillLoginForm = () => {
//     fireEvent.change(emailInput, { target: { value: 'adesewa@gmail.com' } });
//     fireEvent.change(passwordInput, { target: { value: 'Adesewa123' } });
//   };

//   test('Login component should render all inputs and labels', () => {
//     expect(emailInput).toBeInTheDocument();
//     expect(passwordInput).toBeInTheDocument();
//     expect(submitButton.textContent).toBe('Login');
//   });

//   test('fill and submit form with success', async () => {
//     await axiosMock.onPost().replyOnce(201, { token: 'ThisIsNotArealToken' });

//     fillLoginForm();
//     fireEvent.click(submitButton);

//     await wait(() => expect(authUtils.getToken()).toBe('ThisIsNotArealToken'));
//     expect(authUtils.getToken()).toBe('ThisIsNotArealToken');
//     expect(history.push).toHaveBeenCalledTimes(1);
//     // await waitForDomChange({ container });
//   });
//   //   test('fill and submit form with error', async () => {
//   //     const { getByText, container } = LoginComponent;

//   //     await axiosMock.onPost().replyOnce(500, {
//   //       data: [{ msg: 'login not successful' }],
//   //     });
//   //     fillLoginForm();
//   //     fireEvent.click(submitButton);
//   //     await waitForDomChange({ container });
//   //     expect(getByText('Not successful')).toBeInTheDocument();
//   //   });
// });
