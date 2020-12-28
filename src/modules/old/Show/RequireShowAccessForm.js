import React from 'react'

import ShowAPI from 'src/api/shows'

import * as S from './styled'

export class RequireShowAccessForm extends React.Component {
    state = {
        password: '',
        error: null,
    }

    onSubmit = async e => {
        e.preventDefault()
        const res = await ShowAPI.verifyPassword(this.props.show.id, this.state.password)
        if (res.data.isValidPassword) {
            this.props.getShowById(this.props.show.id)
        } else {
            this.setState({ error: true })
        }
    }

    onChange = e => this.setState({ password: e.target.value, error: false })

    render() {
        return (
            <div css={{ textAlign: 'center', padding: 10 }}>
                <h2>This show is protected</h2>
                <p>In order to access this show, you have to enter a password.</p>
                <div>
                    <form onSubmit={this.onSubmit}>
                        Enter a password:{' '}
                        <S.PasswordInput
                            type="password"
                            onChange={this.onChange}
                            value={this.state.password}
                        />
                        <S.AccessButton>Access</S.AccessButton>
                    </form>
                </div>
                {this.state.error && <span css={{ color: 'tomato' }}>Invalid password</span>}
            </div>
        )
    }
}
