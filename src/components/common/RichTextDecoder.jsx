import React from 'react'

export function RichTextDecoder({content}) {
    //

    function isJSONString(data) {
        try {
            const parsed = JSON.parse(data)
            return typeof parsed === 'object' && parsed !== null
        } catch (error) {
            return false
        }
    }

    function renderContent() {
        if (!isJSONString(content)) {
            return <span>{content}</span>
        }

        return JSON.parse(content).blocks.map(block => {
            switch (block.type) {
                case 'header':
                    return React.createElement(
                        `h${block.data.level}`,
                        {key: block.id},
                        block.data.text
                    )
                case 'paragraph':
                    return <p key={block.id} dangerouslySetInnerHTML={{__html: block.data.text}} />
                default:
                    return null
            }
        })
    }

    return <div> {renderContent()}</div>
}
