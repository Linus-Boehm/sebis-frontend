import { withRouter } from 'next/router'
import Link from 'next/link'
import React, { Children } from 'react'

const ActiveLink = ({ router, children, ...props }) => {
    const child = Children.only(children)
    let acl = props.activeClassName || 'is-active';
    let className = child.props.className || null
    if (router.pathname === props.href || router.asPath === props.href) {
        className = `${className !== null ? className : ''} ${acl}`.trim()
    }

    delete props.activeClassName

    return <Link {...props}>{React.cloneElement(child, { className })}</Link>
}

export default withRouter(ActiveLink)