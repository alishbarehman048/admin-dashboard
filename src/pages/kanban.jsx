import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

const initialData = {
  todo: {
    title: 'To Do',
    tasks: [
      { id: '1', content: 'Master Next.js' },
      { id: '2', content: 'Master Web Development' },
    ],
  },
  inprogress: {
    title: 'In Progress',
    tasks: [{ id: '3', content: 'Master React' }],
  },
  done: {
    title: 'Done',
    tasks: [{ id: '4', content: 'Master JavaScript' }],
  },
};


const themeColors = {
  slate: {
    bg: 'bg-slate-100',
    headerBg: 'bg-slate-400',
    headerText: 'text-white',
    buttonBg: 'bg-slate-600',
    buttonHoverBg: 'hover:bg-slate-700',
  },
  indigo: {
    bg: 'bg-indigo-100',
    headerBg: 'bg-indigo-400',
    headerText: 'text-white',
    buttonBg: 'bg-indigo-600',
    buttonHoverBg: 'hover:bg-indigo-700',
  },
  emerald: {
    bg: 'bg-emerald-100',
    headerBg: 'bg-emerald-400',
    headerText: 'text-white',
    buttonBg: 'bg-emerald-600',
    buttonHoverBg: 'hover:bg-emerald-700',
  },
  rose: {
    bg: 'bg-rose-100',
    headerBg: 'bg-rose-400',
    headerText: 'text-white',
    buttonBg: 'bg-rose-600',
    buttonHoverBg: 'hover:bg-rose-700',
  },
 violet: {
    bg: 'bg-violet-100',
    headerBg: 'bg-violet-400',
    headerText: 'text-white',
    buttonBg: 'bg-violet-600',
    buttonHoverBg: 'hover:bg-violet-700',
  },
};

export default function Kanban({ colorTheme = 'slate' }) {
  const [columns, setColumns] = useState(initialData);
  const [newTasks, setNewTasks] = useState({ todo: '', inprogress: '', done: '' });
  const [showInputs, setShowInputs] = useState({ todo: false, inprogress: false, done: false });

  const colors = themeColors[colorTheme] || themeColors['slate'];

  const handleAddTask = (columnId) => {
    const content = newTasks[columnId].trim();
    if (!content) return;

    const newTask = {
      id: Date.now().toString(),
      content,
    };

    setColumns((prev) => ({
      ...prev,
      [columnId]: {
        ...prev[columnId],
        tasks: [...prev[columnId].tasks, newTask],
      },
    }));

    setNewTasks({ ...newTasks, [columnId]: '' });
    setShowInputs({ ...showInputs, [columnId]: false });
  };

  const handleRemoveInput = (columnId) => {
    setShowInputs({ ...showInputs, [columnId]: false });
    setNewTasks({ ...newTasks, [columnId]: '' });
  };

  const onDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return;

    const sourceCol = columns[source.droppableId];
    const destCol = columns[destination.droppableId];
    const sourceTasks = [...sourceCol.tasks];
    const destTasks = [...destCol.tasks];

    const [movedTask] = sourceTasks.splice(source.index, 1);

    if (source.droppableId === destination.droppableId) {
      sourceTasks.splice(destination.index, 0, movedTask);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceCol,
          tasks: sourceTasks,
        },
      });
    } else {
      destTasks.splice(destination.index, 0, movedTask);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceCol,
          tasks: sourceTasks,
        },
        [destination.droppableId]: {
          ...destCol,
          tasks: destTasks,
        },
      });
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Kanban Board</h2>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {Object.entries(columns).map(([columnId, column]) => (
            <div key={columnId} className={`${colors.bg} rounded-xl shadow p-4 flex flex-col`}>
              <div className={`flex items-center justify-between mb-3 ${colors.headerBg} ${colors.headerText} rounded px-3 py-2`}>
                <h3 className="text-xl font-bold">{column.title}</h3>
                <div className="flex items-center space-x-2">
                  {!showInputs[columnId] && (
                    <button
                      onClick={() => setShowInputs((prev) => ({ ...prev, [columnId]: true }))}
                      className={`text-xl font-bold ${colors.headerText} hover:opacity-80`}
                      title="Add Task"
                    >
                      +
                    </button>
                  )}
                  {showInputs[columnId] && (
                    <button
                      onClick={() => handleRemoveInput(columnId)}
                      className={`text-xl font-bold ${colors.headerText} hover:opacity-80`}
                      title="Close Input"
                    >
                      &times;
                    </button>
                  )}
                </div>
              </div>

              <Droppable droppableId={columnId}>
                {(provided) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="space-y-2 min-h-[100px] flex-1"
                  >
                    {column.tasks.map((task, index) => (
                      <Draggable key={task.id} draggableId={task.id} index={index}>
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className={`p-3 rounded bg-white shadow hover:shadow-md transition ${
                              snapshot.isDragging ? 'bg-slate-100' : ''
                            }`}
                          >
                            {task.content}
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>

             
              {showInputs[columnId] && (
                <div className="mt-4">
                  <input
                    type="text"
                    placeholder="New task..."
                    className="w-full p-2 rounded border text-sm"
                    value={newTasks[columnId]}
                    onChange={(e) =>
                      setNewTasks({ ...newTasks, [columnId]: e.target.value })
                    }
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleAddTask(columnId);
                    }}
                  />
                  <button
                    className={`${colors.buttonBg} ${colors.buttonHoverBg} mt-2 w-full text-white py-1 rounded text-sm`}
                    onClick={() => handleAddTask(columnId)}
                  >
                    Add Task
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
}
