import { render, screen, fireEvent} from '@testing-library/react';
import { unmountComponentAtNode } from 'react-dom';
import App from './App';

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});
 

 test('test that App component doesn\'t render duplicate Task', () => {
  render(<App />);
  const inputTask = screen.getByRole('textbox', {name: /Add New Item/i});
  const inputDate = screen.getByPlaceholderText("mm/dd/yyyy");
  const addButton = screen.getByRole('button', {name: /Add/i});
  const taskName = "History Test";
  const dueDate = "03/17/2022";

  fireEvent.change(inputTask, { target: { value: taskName } });
  fireEvent.change(inputDate, { target: { value: dueDate } });
  fireEvent.click(addButton);
  fireEvent.change(inputTask, { target: { value: taskName } });
  fireEvent.change(inputDate, { target: { value: dueDate } });
  fireEvent.click(addButton);

  // Check that the task appears only once (not date sensitive) 
  const taskElements = screen.getAllByText(new RegExp(taskName, "i"));
  expect(taskElements.length).toBe(1);

 });


 test('test that App component doesn\'t add a task without task name', () => {
  render(<App />);
   
  const inputTask = screen.getByRole('textbox', { name: /Add New Item/i });
  const inputDate = screen.getByPlaceholderText("mm/dd/yyyy");
  const addButton = screen.getByRole('button', { name: /Add/i });
  
  const dueDate = "07/30/2024";
  fireEvent.change(inputDate, { target: { value: dueDate }});
  fireEvent.click(addButton);
  
  const tasks = screen.queryAllByTestId('content');
  expect(tasks.length).toBe(0);

 });
 
 test('test that App component doesn\'t add a task without date', () => {
  render(<App />);
   
  const inputTask = screen.getByRole('textbox', { name: /Add New Item/i });
  const inputDate = screen.getByPlaceholderText("mm/dd/yyyy");
  const addButton = screen.getByRole('button', { name: /Add/i });
  
  const taskName = "Sample Test";
  fireEvent.change(inputTask, { target: { value: taskName }});
  fireEvent.click(addButton);
  
  const tasks = screen.queryAllByTestId('content');
  expect(tasks.length).toBe(0);

 });


 test('test that App component can be deleted thru checkbox', () => {
  render(<App />);
  const inputTask = screen.getByRole('textbox', {name: /Add New Item/i});
  const inputDate = screen.getByPlaceholderText("mm/dd/yyyy");
  const addButton = screen.getByRole('button', {name: /Add/i});
  const taskName = "History Test";
  const dueDate = "07/17/2025";

  fireEvent.change(inputTask, { target: { value: taskName } });
  fireEvent.change(inputDate, { target: { value: dueDate } });
  fireEvent.click(addButton);

  const checkboxes = screen.getAllByRole('checkbox');
  fireEvent.click(checkboxes[checkboxes.length - 1]);

  const tasks = screen.queryAllByTestId('content');
  expect(tasks.length).toBe(0);

 });


 test('test that App component renders different colors for past due events', () => {
  render(<App />);

  const inputTask = screen.getByRole('textbox', {name: /Add New Item/i});
  const inputDate = screen.getByPlaceholderText("mm/dd/yyyy");
  const addButton = screen.getByRole('button', {name: /Add/i});
  const taskName = "History Test";
  const dueDate = "04/15/1394";

  fireEvent.change(inputTask, { target: { value: taskName } });
  fireEvent.change(inputDate, { target: { value: dueDate } });
  fireEvent.click(addButton);

  const historyCheck = screen.getByTestId('content').style.backgroundColor
  expect(historyCheck).toBe("rgb(255, 129, 115)");

});
