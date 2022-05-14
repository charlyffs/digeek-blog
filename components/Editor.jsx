import '@remirror/styles/all.css'

import { css } from '@emotion/css'
import { createContextState } from 'create-context-state'
import jsx from 'refractor/lang/jsx'
import md from 'refractor/lang/markdown'
import typescript from 'refractor/lang/typescript'
import { ExtensionPriority, getThemeVar } from 'remirror'
import {
  BlockquoteExtension,
  BoldExtension,
  BulletListExtension,
  CodeBlockExtension,
  CodeExtension,
  DocExtension,
  HardBreakExtension,
  HeadingExtension,
  ItalicExtension,
  LinkExtension,
  ListItemExtension,
  MarkdownExtension,
  OrderedListExtension,
  StrikeExtension,
  TableExtension,
  TrailingNodeExtension,
} from 'remirror/extensions'
import {
  ComponentItem,
  ReactExtensions,
  Remirror,
  ThemeProvider,
  Toolbar,
  ToolbarItemUnion,
  useHelpers,
  useRemirror,
  UseRemirrorReturn,
} from '@remirror/react'
import { useEffect } from 'react'

function MarkdownPreview() {
  const { getMarkdown } = useHelpers(true)

  return (
    <pre>
      <code>{getMarkdown()}</code>
    </pre>
  )
}


const [DualEditorProvider, useDualEditor] = createContextState(({ props }) => {
  return {
    ...props,

    setMarkdown: (text) => {
      return props.markdown.getContext()?.setContent({
        type: 'doc',
        content: [
          {
            type: 'codeBlock',
            attrs: { language: 'markdown' },
            content: text ? [{ type: 'text', text }] : undefined,
          },
        ],
      })
    },
    setVisual: (markdown) => {
      return props.visual.getContext()?.setContent(markdown)
    },
  }
})

const MarkdownTextEditor = ({setText}) => {
  const { markdown, setVisual } = useDualEditor()

  return (
    <Remirror
      manager={markdown.manager}
      autoRender="end"
      onChange={({ helpers, state }) => {
        const text = helpers.getText({ state })
        setText(text)
        return setVisual(text)
      }}
      classNames={[
        css`
          &.ProseMirror {
            padding: 0;
            pre {
              height: 100%;
              padding: ${getThemeVar('space', 3)};
              margin: 0;
            }
          }
        `,
      ]}
    ></Remirror>
  )
}

const VisualEditor = ({setText}) => {
  const { visual, setMarkdown } = useDualEditor()

  return (
    <Remirror
      autoFocus
      manager={visual.manager}
      autoRender="end"
      onChange={({ helpers, state }) => {
        setText(helpers.getMarkdown(state))
        return setMarkdown(helpers.getMarkdown(state))
      }}
      initialContent={visual.state}
      classNames={[
        css`
          &.ProseMirror {
            p,
            h3,
            h4 {
              margin-top: ${getThemeVar('space', 2)};
              margin-bottom: ${getThemeVar('space', 2)};
            }
            h1,
            h2 {
              margin-bottom: ${getThemeVar('space', 3)};
              margin-top: ${getThemeVar('space', 3)};
            }
          }
        `,
      ]}
    >
      <Toolbar items={toolbarItems} refocusEditor label="Top Toolbar" />
    </Remirror>
  )
}

/**
 * The editor which is used to create the annotation. Supports formatting.
 */
const DualEditor = ({setText}) => {
  const visual = useRemirror({
    extensions,
    stringHandler: 'markdown',
    content: '',
  })
  const markdown = useRemirror({
    extensions: () => [
      new DocExtension({ content: 'codeBlock' }),
      new CodeBlockExtension({
        supportedLanguages: [md, typescript],
        defaultLanguage: 'markdown',
        syntaxTheme: 'base16_ateliersulphurpool_light',
        defaultWrap: true,
      }),
    ],
    builtin: {
      exitMarksOnArrowPress: false,
    },

    stringHandler: 'html',
  })

  return (
    <DualEditorProvider visual={visual} markdown={markdown}>
      <ThemeProvider>
        <VisualEditor setText={setText} />
      </ThemeProvider>
    </DualEditorProvider>
  )
}

const extensions = () => [
  new LinkExtension({ autoLink: true }),
  new BoldExtension(),
  new StrikeExtension(),
  new ItalicExtension(),
  new HeadingExtension(),
  new LinkExtension(),
  new BlockquoteExtension(),
  new BulletListExtension({ enableSpine: true }),
  new OrderedListExtension(),
  new ListItemExtension({ priority: ExtensionPriority.High, enableCollapsible: true }),
  new CodeExtension(),
  new CodeBlockExtension({ supportedLanguages: [jsx, typescript] }),
  new TrailingNodeExtension(),
  new TableExtension(),
  new MarkdownExtension({ copyAsMarkdown: false }),
  /**
   * `HardBreakExtension` allows us to create a newline inside paragraphs.
   * e.g. in a list item
   */
  new HardBreakExtension(),
]

const toolbarItems = [
  {
    type: ComponentItem.ToolbarGroup,
    label: 'Simple Formatting',
    items: [
      { type: ComponentItem.ToolbarCommandButton, commandName: 'toggleBold', display: 'icon' },
      { type: ComponentItem.ToolbarCommandButton, commandName: 'toggleItalic', display: 'icon' },
      { type: ComponentItem.ToolbarCommandButton, commandName: 'toggleStrike', display: 'icon' },
      { type: ComponentItem.ToolbarCommandButton, commandName: 'toggleCode', display: 'icon' },
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
        attrs: { level: 1 },
      },
      {
        type: ComponentItem.ToolbarCommandButton,
        commandName: 'toggleHeading',
        display: 'icon',
        attrs: { level: 2 },
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
        commandName: 'toggleBlockquote',
        display: 'icon',
      },
      { type: ComponentItem.ToolbarCommandButton, commandName: 'toggleCodeBlock', display: 'icon' },
    ],
    separator: 'end',
  },
  {
    type: ComponentItem.ToolbarGroup,
    label: 'History',
    items: [
      { type: ComponentItem.ToolbarCommandButton, commandName: 'undo', display: 'icon' },
      { type: ComponentItem.ToolbarCommandButton, commandName: 'redo', display: 'icon' },
      {
        type: ComponentItem.ToolbarCommandButton,
        commandName: 'toggleColumns',
        display: 'icon',
        attrs: { count: 2 },
      },
    ],
    separator: 'none',
  },
]

export default DualEditor