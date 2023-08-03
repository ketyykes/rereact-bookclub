import AddTask from './AddTask';
import TaskList from './TaskList';
import { TasksProvider } from './TasksContext';

// TaskApp 元件，整個應用的主要元件
export default function TaskApp() {
  return (
    // 使用 TasksProvider 包裹整個應用，提供 tasks 的狀態和 dispatch 函數給子元件使用
    <TasksProvider>
      {/* 標題 */}
      <h1>Day off in Kyoto</h1>
      {/* AddTask 元件，用於新增任務 */}
      <AddTask />
      {/* TaskList 元件，用於顯示任務列表 */}
      <TaskList />
    </TasksProvider>
  );
}
