### 基于element的tag多选下拉框可拖拽换位

```
<el-drag-select v-model="value" style="width:500px;" multiple placeholder="请选择">
  <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
</el-drag-select>

import ElDragSelect from '@/components/DragSelect'
components: { ElDragSelect },
```