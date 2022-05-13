import '@remirror/styles/all.css'
import { useCallback } from 'react'
import jsx from 'refractor/lang/jsx'
import typescript from 'refractor/lang/typescript'
import { ExtensionPriority } from 'remirror'
import {
  PlaceholderExtension,
  LinkExtension,
  BoldExtension,
  StrikeExtension,
  ItalicExtension,
  HeadingExtension,
  BlockquoteExtension,
  BulletListExtension,
  OrderedListExtension,
  ListItemExtension,
  CodeExtension,
  CodeBlockExtension,
  TrailingNodeExtension,
  TableExtension,
  MarkdownExtension,
  HardBreakExtension,
  ImageExtension,
  TaskListExtension,
} from 'remirror/extensions'
import {
  useRemirror,
  ThemeProvider,
  Remirror,
  Toolbar,
  EditorComponent,
  ComponentItem,
  FloatingToolbar,
} from '@remirror/react'
import { AllStyledComponent } from '@remirror/styles/emotion'
import { jsx as jsx$1, jsxs } from 'react/jsx-runtime'

/**
 * The editor which is used to create the annotation. Supports formatting.
 */
var MarkdownEditor = (_ref) => {
  var placeholder = _ref.placeholder,
    initialContent = _ref.initialContent,
    children = _ref.children
  var extensions = useCallback(
    () => [
      new PlaceholderExtension({
        placeholder,
      }),
      new LinkExtension({
        autoLink: true,
      }),
      new BoldExtension(),
      new StrikeExtension(),
      new ItalicExtension(),
      new HeadingExtension(),
      new LinkExtension(),
      new BlockquoteExtension(),
      new BulletListExtension({
        enableSpine: true,
      }),
      new OrderedListExtension(),
      new ListItemExtension({
        priority: ExtensionPriority.High,
      }),
      new CodeExtension(),
      new CodeBlockExtension({
        supportedLanguages: [jsx, typescript],
      }),
      new TrailingNodeExtension(),
      new TableExtension(),
      new MarkdownExtension({
        copyAsMarkdown: true,
      }),
      /**
       * `HardBreakExtension` allows us to create a newline inside paragraphs.
       * e.g. in a list item
       */
      new HardBreakExtension(),
      new ImageExtension(),
      new TableExtension(),
      new TaskListExtension(),
    ],
    [placeholder]
  )

  var _useRemirror = useRemirror({
      extensions,
      stringHandler: 'markdown',
    }),
    manager = _useRemirror.manager

  return /*#__PURE__*/ jsx$1(AllStyledComponent, {
    children: /*#__PURE__*/ jsx$1(ThemeProvider, {
      children: /*#__PURE__*/ jsxs(Remirror, {
        manager: manager,
        autoFocus: true,
        initialContent: initialContent,
        children: [
          /*#__PURE__*/ jsx$1(TopToolbar, {}),
          /*#__PURE__*/ jsx$1(EditorComponent, {}),
          /*#__PURE__*/ jsx$1(BubbleMenu, {}),
        ],
      }),
    }),
  })
}

var floatingToolbarItems = [
  {
    type: ComponentItem.ToolbarGroup,
    label: 'Simple Formatting',
    items: [
      {
        type: ComponentItem.ToolbarCommandButton,
        commandName: 'toggleBold',
        display: 'icon',
      },
      {
        type: ComponentItem.ToolbarCommandButton,
        commandName: 'toggleItalic',
        display: 'icon',
      },
      {
        type: ComponentItem.ToolbarCommandButton,
        commandName: 'toggleUnderline',
        display: 'icon',
      },
      {
        type: ComponentItem.ToolbarCommandButton,
        commandName: 'toggleStrike',
        display: 'icon',
      },
      {
        type: ComponentItem.ToolbarCommandButton,
        commandName: 'toggleCode',
        display: 'icon',
      },
    ],
  },
]
/**
 * Bubble menu for the pre-packaged editors
 */

var BubbleMenu = () => {
  return /*#__PURE__*/ jsx$1(FloatingToolbar, {
    items: floatingToolbarItems,
    positioner: 'selection',
    placement: 'bottom',
  })
}

var toolbarItems = [
  {
    type: ComponentItem.ToolbarGroup,
    label: 'History',
    items: [
      {
        type: ComponentItem.ToolbarCommandButton,
        commandName: 'undo',
        display: 'icon',
      },
      {
        type: ComponentItem.ToolbarCommandButton,
        commandName: 'redo',
        display: 'icon',
      },
    ],
    separator: 'end',
  },
  {
    type: ComponentItem.ToolbarGroup,
    label: 'Clipboard',
    items: [
      {
        type: ComponentItem.ToolbarCommandButton,
        commandName: 'copy',
        display: 'icon',
      },
      {
        type: ComponentItem.ToolbarCommandButton,
        commandName: 'cut',
        display: 'icon',
      },
      {
        type: ComponentItem.ToolbarCommandButton,
        commandName: 'paste',
        display: 'icon',
      },
    ],
    separator: 'end',
  },
  {
    type: ComponentItem.ToolbarGroup,
    label: 'Heading Formatting',
    items: [
      {
        type: ComponentItem.ToolbarCommandButton,
        commandName: 'toggleHeading',
        display: 'icon',
        attrs: {
          level: 1,
        },
      },
      {
        type: ComponentItem.ToolbarCommandButton,
        commandName: 'toggleHeading',
        display: 'icon',
        attrs: {
          level: 2,
        },
      },
      {
        type: ComponentItem.ToolbarCommandButton,
        commandName: 'toggleHeading',
        attrs: { level: 3 },
      },
      {
        type: ComponentItem.ToolbarCommandButton,
        commandName: 'toggleHeading',
        attrs: { level: 4 },
      },
    ],
    separator: 'end',
  },
  {
    type: ComponentItem.ToolbarGroup,
    label: 'Simple Formatting',
    items: [
      {
        type: ComponentItem.ToolbarCommandButton,
        commandName: 'toggleBold',
        display: 'icon',
      },
      {
        type: ComponentItem.ToolbarCommandButton,
        commandName: 'toggleItalic',
        display: 'icon',
      },
      {
        type: ComponentItem.ToolbarCommandButton,
        commandName: 'toggleUnderline',
        display: 'icon',
      },
      { type: ComponentItem.ToolbarCommandButton, commandName: 'toggleStrike', display: 'icon' },
      { type: ComponentItem.ToolbarCommandButton, commandName: 'toggleCode', display: 'icon' },
    ],
    separator: 'end',
  },
  {
    type: ComponentItem.ToolbarGroup,
    label: 'Lists',
    items: [
      {
        type: ComponentItem.ToolbarCommandButton,
        commandName: 'toggleBulletList',
        display: 'icon',
      },
      {
        type: ComponentItem.ToolbarCommandButton,
        commandName: 'toggleOrderedList',
        display: 'icon',
      },
    ],
    separator: 'none',
  },
]

var TopToolbar = () => {
  return /*#__PURE__*/ jsx$1(Toolbar, {
    items: toolbarItems,
    refocusEditor: true,
    label: 'Top Toolbar',
  })
}

export const Basic = () => {
  return <MarkdownEditor placeholder="Escribe algo..." initialContent=""></MarkdownEditor>
}

export default Basic
