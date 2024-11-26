<script setup>
import { EditorContent, Editor } from '@tiptap/vue-3'
import { Highlight } from '@tiptap/extension-highlight'
import { TextAlign } from '@tiptap/extension-text-align'
import { StarterKit } from '@tiptap/starter-kit'
import css from 'highlight.js/lib/languages/css'
import js from 'highlight.js/lib/languages/javascript'
import ts from 'highlight.js/lib/languages/typescript'
import html from 'highlight.js/lib/languages/xml'
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight' // eslint-disable-line
import { createLowlight } from 'lowlight'
import IconBulletList from '~icons/streamline/bullet-list-solid'
import IconCodeBlock from '~icons/oui/editor-code-block'
import IconHorizontalRule from '~icons/ic/outline-horizontal-rule'
import IconHightLight from '~icons/bx/highlight'
import IconTextLeft from '~icons/bi/text-left'
import IconTextRight from '~icons/bi/text-right'
import IconTextCenter from '~icons/bi/text-center'
import IconTextJustify from '~icons/quill/text-justify'
import IconUndo from '~icons/lucide/undo'
import IconRedo from '~icons/lucide/redo'
// load all highlight.js languages

const props = defineProps({
  modelValue: {
    type: String,
    default: '',
    required: true,
  },
  editable: {
    type: Boolean,
    default: true,
  },
})

const editor = ref()

const lowlight = createLowlight()
lowlight.register('html', html)
lowlight.register('css', css)
lowlight.register('js', js)
lowlight.register('ts', ts)
watch(
  () => props.modelValue,
  (value) => {
    const isSame = editor.value.getHTML() === value
    if (!isSame) {
      editor.value.commands.setContent(value, false)
    }
  },
)

const emit = defineEmits(['update:modelValue'])

onMounted(() => {
  editor.value = new Editor({
    content: props.modelValue,
    editable: props.editable,
    editorProps: {
      attributes: {
        class: '',
      },
    },
    extensions: [
      StarterKit,
      Highlight,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      CodeBlockLowlight.configure({ lowlight }),
    ],
    onUpdate: () => {
      emit('update:modelValue', editor.value?.getHTML())
    },
  })
})

onBeforeUnmount(() => {
  editor.value?.destroy()
  editor.value = null
})

const options = computed(() => [
  {
    id: 'h1',
    label: 'H1',
    active: editor.value.isActive('heading', { level: 1 }),
    action: () => {
      editor.value.chain().focus().toggleHeading({ level: 1 }).run()
    },
  },
  {
    id: 'h2',
    label: 'H2',
    active: editor.value.isActive('heading', { level: 2 }),
    action: () => {
      editor.value.chain().focus().toggleHeading({ level: 2 }).run()
    },
  },
  {
    id: 'h3',
    label: 'H3',
    active: editor.value.isActive('heading', { level: 3 }),
    action: () => {
      editor.value.chain().focus().toggleHeading({ level: 3 }).run()
    },
  },
  {
    id: 'h4',
    label: 'H4',
    active: editor.value.isActive('heading', { level: 4 }),
    action: () => {
      editor.value.chain().focus().toggleHeading({ level: 4 }).run()
    },
  },
  {
    id: 'h5',
    label: 'H5',
    active: editor.value.isActive('heading', { level: 5 }),
    action: () => {
      editor.value.chain().focus().toggleHeading({ level: 5 }).run()
    },
  },
  {
    id: 'h6',
    label: 'H6',
    active: editor.value.isActive('heading', { level: 6 }),
    action: () => {
      editor.value.chain().focus().toggleHeading({ level: 6 }).run()
    },
  },
  {
    divider: true,
  },
  {
    id: 'bold',
    label: 'B',
    class: {
      'font-bold': true,
    },
    active: editor.value.isActive('bold'),
    action: () => {
      editor.value.chain().focus().toggleBold().run()
    },
  },
  {
    id: 'italic',
    label: 'I',
    class: {
      italic: true,
    },
    active: editor.value.isActive('italic'),
    action: () => {
      editor.value.chain().focus().toggleItalic().run()
    },
  },
  {
    id: 'strike',
    label: 'T',
    class: {
      underline: true,
    },
    active: editor.value.isActive('strike'),
    action: () => {
      editor.value.chain().focus().toggleStrike().run()
    },
  },
  {
    id: 'clear',
    label: 'Clear',
    active: null,
    action: () => {
      editor.value.chain().focus().unsetAllMarks().run()
    },
  },
  {
    id: 'P',
    label: 'P',
    action: () => {
      editor.value.chain().focus().setParagraph().run()
    },
  },
  {
    id: 'bulletList',
    label: 'Bullet list',
    active: editor.value.isActive('bulletList'),
    action: () => {
      editor.value.chain().focus().toggleBulletList().run()
    },
    icon: IconBulletList,
  },
  {
    id: 'codeBlock',
    label: 'Code block',
    active: editor.value.isActive('codeBlock'),
    action: () => {
      editor.value.chain().focus().toggleCodeBlock().run()
    },
    icon: IconCodeBlock,
  },
  {
    id: 'horizontal',
    label: 'Horizontal',
    action: () => {
      editor.value.chain().focus().setHorizontalRule().run()
    },
    icon: IconHorizontalRule,
  },
  {
    id: 'highlight',
    label: 'Highlight',
    active: editor.value.isActive('highlight'),
    action: () => {
      editor.value.chain().focus().toggleHighlight().run()
    },
    icon: IconHightLight,
  },
  {
    id: 'quote',
    active: editor.value.isActive('blockquote'),
    action: () => {
      editor.value.chain().focus().toggleBlockquote().run()
    },
    label: 'Quote',
  },
  {
    id: 'left',
    label: 'Text left',
    active: editor.value.isActive({ textAlign: 'left' }),
    action: () => {
      editor.value.chain().focus().setTextAlign('left').run()
    },
    icon: IconTextLeft,
  },
  {
    id: 'center',
    label: 'Text center',
    active: editor.value.isActive({ textAlign: 'center' }),
    action: () => {
      editor.value.chain().focus().setTextAlign('center').run()
    },
    icon: IconTextCenter,
  },
  {
    id: 'right',
    label: 'Text right',
    active: editor.value.isActive({ textAlign: 'right' }),
    action: () => {
      editor.value.chain().focus().setTextAlign('right').run()
    },
    icon: IconTextRight,
  },
  {
    id: 'justify',
    label: 'Text justify',
    active: editor.value.isActive({ textAlign: 'justify' }),
    action: () => {
      editor.value.chain().focus().setTextAlign('justify').run()
    },
    icon: IconTextJustify,
  },
  {
    id: 'undo',
    disabled: !editor.value.can().chain().focus().undo().run(),
    action: () => {
      editor.value.chain().focus().undo().run()
    },
    label: 'Undo',
    icon: IconUndo,
  },
  {
    id: 'redo',
    disabled: !editor.value.can().chain().focus().redo().run(),
    action: () => {
      editor.value.chain().focus().redo().run()
    },
    label: 'Redo',
    icon: IconRedo,
  },
])
</script>

<template>
  <div v-if="editor" class="border">
    <div class="flex gap-1 flex-wrap p-1 w-full">
      <div v-for="(item, index) of options" :key="index">
        <button
          v-if="!item.divider"
          class="border h-10 min-w-10 px-3"
          :class="{
            'bg-primary hover:bg-secondary text-white border-primary':
              item.active,
            'opacity-80 cursor-not-allowed': item.disabled,
            ...item.class,
          }"
          :title="item.label"
          :disabled="item.disabled"
          @click.prevent="item.action"
        >
          {{ item.icon ? '' : item.label }}
          <component :is="item.icon" v-if="item.icon" />
        </button>

        <el-divider
          v-else
          style="height: 100% !important"
          direction="vertical"
        />
      </div>
    </div>

    <hr />
    <editor-content :editor="editor" class="p-3 p-inputtext" />
  </div>
</template>

<style scoped lang="scss">
.p-tiptap :focus {
  outline-offset: 2px;
  outline: 2px solid transparent;
}
#bold {
  font-weight: 900;
}

#italic {
  font-style: italic;
}

#strike {
  text-decoration: line-through;
}

:deep(.tiptap) {
  > * + * {
    margin-top: 0.75em;
  }
  ul {
    list-style-type: disc !important;
    margin-block-start: 1em !important;
    margin-block-end: 1em !important;
    margin-inline-start: 0px !important;
    margin-inline-end: 0px !important;
    padding-inline-start: 40px !important;
  }
  h1 {
    font-size: 2rem !important;
    font-weight: bold !important;
  }
  h2 {
    font-size: 1.5rem !important;
    font-weight: bold !important;
  }
  h3 {
    font-size: 1.17rem !important;
  }
  h4 {
    font-weight: bold !important;
  }
  h5 {
    font-size: 0.83em !important;
    font-weight: bold !important;
  }
  h6 {
    font-size: 0.67rem !important;
    font-weight: initial !important;
  }
  blockquote {
    padding-left: 1rem;
    border-left: 2px solid rgba(#0d0d0d, 0.1);
  }

  pre {
    background: #0d0d0d;
    color: #fff;
    font-family: 'JetBrainsMono', monospace;
    padding: 0.75rem 1rem;
    border-radius: 0.5rem;

    code {
      color: inherit;
      padding: 0;
      background: none;
      font-size: 0.8rem;
    }

    .hljs-comment,
    .hljs-quote {
      color: #616161;
    }

    .hljs-variable,
    .hljs-template-variable,
    .hljs-attribute,
    .hljs-tag,
    .hljs-name,
    .hljs-regexp,
    .hljs-link,
    .hljs-name,
    .hljs-selector-id,
    .hljs-selector-class {
      color: #f98181;
    }

    .hljs-number,
    .hljs-meta,
    .hljs-built_in,
    .hljs-builtin-name,
    .hljs-literal,
    .hljs-type,
    .hljs-params {
      color: #fbbc88;
    }

    .hljs-string,
    .hljs-symbol,
    .hljs-bullet {
      color: #b9f18d;
    }

    .hljs-title,
    .hljs-section {
      color: #faf594;
    }

    .hljs-keyword,
    .hljs-selector-tag {
      color: #70cff8;
    }

    .hljs-emphasis {
      font-style: italic;
    }

    .hljs-strong {
      font-weight: 700;
    }
  }
}
</style>
