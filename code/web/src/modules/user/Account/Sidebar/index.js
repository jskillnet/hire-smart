// Imports
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'

// UI Imports
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListSubheader from '@material-ui/core/ListSubheader'
import ListItemText from '@material-ui/core/ListItemText'
import Avatar from '@material-ui/core/Avatar'
import IconErrorOutline from '@material-ui/icons/ErrorOutline'
import InboxPerson from '@material-ui/icons/Person'
import InboxExitToApp from '@material-ui/icons/ExitToApp'
import red from '@material-ui/core/colors/red'
import green from '@material-ui/core/colors/green'
import { withStyles } from '@material-ui/core/styles'
import styles from './styles'

// App Imports
import routes from '../../../../setup/routes'
import { messageShow } from '../../../common/api/actions'
import { logout } from '../../api/actions/mutation'

// Component
class Sidebar extends PureComponent {
  isActiveMenu = (path) => {
    const { location } = this.props

    return location.pathname === path
  }

  onLogout = () => {
    let check = confirm('Are you sure you want to log out?')

    if(check) {
      const {logout, messageShow} = this.props

      logout()

      messageShow('You have been logged out successfully.')
    }
  }

  render() {
    const { classes } = this.props

    return (
      <div className={classes.sidebar}>
        <List
          component={'nav'}
          subheader={<ListSubheader component={'div'} className={classes.title}>Account</ListSubheader>}
        >
          <Link to={routes.account.child.demo.path}>
            <ListItem button style={ this.isActiveMenu(routes.account.child.demo.path)  ? { backgroundColor: '#ddd' } : {}}>
              <Avatar style={ this.isActiveMenu(routes.account.child.demo.path) ? { backgroundColor: red[500] } : {}}>
                <IconErrorOutline />
              </Avatar>

              <ListItemText primary={'Demo Account'} />
            </ListItem>
          </Link>

          <Link to={routes.account.path}>
            <ListItem button style={ this.isActiveMenu(routes.account.path)  ? { backgroundColor: '#ddd' } : {}}>
              <Avatar style={ this.isActiveMenu(routes.account.path) ? { backgroundColor: green[500] } : {}}>
                <InboxPerson />
              </Avatar>

              <ListItemText primary={'My Profile'} />
            </ListItem>
          </Link>

          <Link to={routes.account.path}>
            <ListItem button onClick={this.onLogout}>
              <Avatar><InboxExitToApp /></Avatar>
              <ListItemText primary={'Logout'} />
            </ListItem>
          </Link>
        </List>
      </div>
    )
  }
}

// Component Properties
Sidebar.propTypes = {
  classes: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
  messageShow: PropTypes.func.isRequired
}

export default withRouter(connect(null, { logout, messageShow })(withStyles(styles)(Sidebar)))