const { notEmpty } = require('../utils.js')

module.exports = {
  description: 'generate a view - table',
  prompts: [{
    type: 'input',
    name: 'name',
    message: '新建位置是：src/views/(名字)',
    validate: notEmpty('name')
  },
  {
    type: 'input',
    name: 'subName',
    message: '新建位置是：views/(已写)/（子名字）.vue',
    validate: notEmpty('subName')
  },
  {
    type: 'checkbox',
    name: 'blocks',
    message: 'Blocks:',
    choices: [{
      name: '<template>',
      value: 'template',
      checked: true
    },
    {
      name: '<script>',
      value: 'script',
      checked: true
    },
    {
      name: 'style',
      value: 'style',
      checked: true
    }
    ],
    validate(value) {
      if (value.indexOf('script') === -1 && value.indexOf('template') === -1) {
        return 'View require at least a <script> or <template> tag.'
      }
      return true
    }
  }
  ],
  actions: (data) => {
    const name = '{{name}}'
    const subName = '{{subName}}'
    const actions = [{
      type: 'add',
      path: `src/views/${name}/${subName}.vue`,
      templateFile: 'plop-templates/viewTable/index.hbs',
      data: {
        name: name,
        template: data.blocks.includes('template'),
        script: data.blocks.includes('script'),
        style: data.blocks.includes('style')
      }
    }]

    return actions
  }
}
