import React from 'react'

import AccordionGroup from './Group'

const AccordionContainer = ({ list, children, className, fetch }) => (
    <div className={className}>
        {list.map((group, idx) => (
            <AccordionGroup fetch={fetch} key={idx.toString()} group={group} render={children} />
        ))}
    </div>
)

export default AccordionContainer
