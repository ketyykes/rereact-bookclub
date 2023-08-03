// 引入 React 的 createContext, useContext 和 useReducer 這三個函式
import { createContext, useContext, useReducer } from 'react';

// 創建一個任務的 context
const TasksContext = createContext(null);

// 創建一個分派任務的 context
const TasksDispatchContext = createContext(null);

// 定義一個 TasksProvider 元件
export function TasksProvider({ children }) {
  // 使用 useReducer 來管理任務的狀態
  const [tasks, dispatch] = useReducer(
    tasksReducer,
    initialTasks
  );

  return (
    // 提供一個上下文給下面的子元件，可以取得當前的任務
    <TasksContext.Provider value={tasks}>
      {/* // 提供一個上下文給下面的子元件，可以分派任務的操作 */}
      <TasksDispatchContext.Provider value={dispatch}>
        {children}
      </TasksDispatchContext.Provider>
    </TasksContext.Provider>
  );
}

// 提供一個 hook，讓其他元件可以獲取任務的狀態
export function useTasks() {
  return useContext(TasksContext);
}

// 提供一個 hook，讓其他元件可以分派任務的操作
export function useTasksDispatch() {
  return useContext(TasksDispatchContext);
}

// 定義任務的 reducer
function tasksReducer(tasks, action) {
  switch (action.type) {
    // 增加任務
    case 'added': {
      return [...tasks, {
        id: action.id,
        text: action.text,
        done: false
      }];
    }
    // 更改任務
    case 'changed': {
      return tasks.map(t => {
        if (t.id === action.task.id) {
          return action.task;
        } else {
          return t;
        }
      });
    }
    // 刪除任務
    case 'deleted': {
      return tasks.filter(t => t.id !== action.id);
    }
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}

// 初始化的任務
const initialTasks = [
  { id: 0, text: 'Philosopher’s Path', done: true },
  { id: 1, text: 'Visit the temple', done: false },
  { id: 2, text: 'Drink matcha', done: false }
];
