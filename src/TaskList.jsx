import { useState } from 'react';
import { useTasks, useTasksDispatch } from './TasksContext';

// TaskList 元件，用於顯示任務列表
export default function TaskList() {
  // 使用 useTasks hook 取得 tasks 的狀態
  const tasks = useTasks();

  return (
    <ul>
      {/* 使用 map 函數遍歷每個 task，並將其渲染為 li 元素 */}
      {tasks.map(task => (
        <li key={task.id}>
          {/* 使用 Task 元件來顯示單個任務的詳細內容 */}
          <Task task={task} />
        </li>
      ))}
    </ul>
  );
}

// Task 元件，用於顯示單個任務的詳細內容及編輯功能
function Task({ task }) {
  // 使用 useState hook 建立一個狀態變數 isEditing，用於追蹤任務是否處於編輯狀態
  const [isEditing, setIsEditing] = useState(false);

  // 使用 useTasksDispatch hook 取得 tasks 的 dispatch 函數
  const dispatch = useTasksDispatch();

  let taskContent;
  if (isEditing) {
    // 如果處於編輯狀態，顯示編輯用的輸入框和保存按鈕
    taskContent = (
      <>
        <input
          value={task.text}
          // 編輯用輸入框的 onChange 事件處理函數
          onChange={e => {
            dispatch({
              type: 'changed',
              // 更新 task 物件的 text 屬性
              task: {
                ...task,
                text: e.target.value
              }
            });
          }} />
        <button onClick={() => setIsEditing(false)}>
          Save
        </button>
      </>
    );
  } else {
    // 如果非編輯狀態，顯示任務的文字內容和編輯按鈕
    taskContent = (
      <>
        {task.text}
        <button onClick={() => setIsEditing(true)}>
          Edit
        </button>
      </>
    );
  }

  return (
    // 使用 label 元素包裹任務內容，使得點擊任務文字時能夠同時切換任務的完成狀態
    <label>
      <input
        type="checkbox"
        checked={task.done}
        // checkbox 的 onChange 事件處理函數
        onChange={e => {
          dispatch({
            type: 'changed',
            // 更新 task 物件的 done 屬性
            task: {
              ...task,
              done: e.target.checked
            }
          });
        }}
      />
      {taskContent}
      {/* 刪除按鈕設置 onClick 事件，用於刪除任務 */}
      <button onClick={() => {
        dispatch({
          type: 'deleted',
          id: task.id
        });
      }}>
        Delete
      </button>
    </label>
  );
}
