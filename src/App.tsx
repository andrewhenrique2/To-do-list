import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 50px;
    margin: 0 auto;
    justify-content: center;
    align-items: center;
    text-align: center;
`;

const Input = styled.input`
  padding: 10px;
  font-size: 16px;
  margin-bottom: 20px;
`;

const TaskList = styled.ul`
  width: 100% ;
  list-style: none;
  padding: 0;
`;

const TaskItem = styled.li<{ completed: boolean }>`
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  text-decoration: ${(props) => (props.completed ? 'line-through' : 'none')};
`;

const DeleteButton = styled.button`
  margin-left: 10px;
`;

const ToggleButton = styled.button`
  margin-left: 10px;
`;

const App: React.FC = () => {
  interface Task {
    text: string;
    completed: boolean;
  }

  const [tasks, setTasks] = useState<Task[]>([]);
  const [currentTask, setCurrentTask] = useState<string>('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentTask(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (currentTask.trim() !== '') {
      setTasks([...tasks, { text: currentTask, completed: false }]);
      setCurrentTask('');
    }
  };

  const handleDeleteTask = (index: number) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  const handleToggleTask = (index: number) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  return (
    <Container>
      <h1>To-Do List</h1>
      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="Add a new task"
          value={currentTask}
          onChange={handleInputChange}
        />
        <button type="submit">Add Task</button>
      </form>
      <TaskList>
        {tasks.map((task, index) => (
          <TaskItem key={index} completed={task.completed}>
            <span>{task.text}</span>
            <DeleteButton onClick={() => handleDeleteTask(index)}>❌</DeleteButton>
            <ToggleButton onClick={() => handleToggleTask(index)}>✅</ToggleButton>
          </TaskItem>
        ))}
      </TaskList>
    </Container>
  );
};

export default App;
