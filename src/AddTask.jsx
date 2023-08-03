import { useState } from 'react';
import { useTasksDispatch } from './TasksContext';

export default function AddTask() {
  // 使用 useState hook 建立一個狀態變數 text，初始值為空字串
  const [text, setText] = useState('');

  // 使用 useTasksDispatch hook 取得 tasks 的 dispatch 函數
  const dispatch = useTasksDispatch();

  return (
    <>
      {/* 輸入框，用於新增任務，onChange 事件觸發時更新 text 狀態 */}
      <input
        placeholder="Add task"
        value={text}
        onChange={e => setText(e.target.value)}
      />
      {/* 按鈕，用於新增任務，點擊時將 text 狀態重置為空字串並執行 dispatch 函數 */}
      <button onClick={() => {
        setText('');
        dispatch({
          type: 'added',
          id: nextId++,
          text: text,
        });
      }}>Add</button>
    </>
  );
}

// 初始的 nextId 設為 3
let nextId = 3;
