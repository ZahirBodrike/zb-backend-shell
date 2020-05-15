### 列表看板（可拖拽）

基本使用：
```
<Kanban :key="1" :list="list1" :group="group" class="kanban todo" header-text="Todo" />
<Kanban :key="2" :list="list2" :group="group" class="kanban working" header-text="Working" />
<Kanban :key="3" :list="list3" :group="group" class="kanban done" header-text="Done" />

group: 'mission',
list1: [
  { name: 'Mission', id: 1 },
  { name: 'Mission', id: 2 },
  { name: 'Mission', id: 3 },
  { name: 'Mission', id: 4 }
],
list2: [
  { name: 'Mission', id: 5 },
  { name: 'Mission', id: 6 },
  { name: 'Mission', id: 7 }
],
list3: [
  { name: 'Mission', id: 8 },
  { name: 'Mission', id: 9 },
  { name: 'Mission', id: 10 }
]
```