// Imports
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

// UI Imports
import Typography from '@material-ui/core/Typography'
import Tooltip from '@material-ui/core/Tooltip'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import IconClose from '@material-ui/icons/Close'
import IconRadioButtonChecked from '@material-ui/icons/RadioButtonChecked'
import { withStyles } from '@material-ui/core/styles'
import styles from './styles'

// App Imports
import params from '../../../../../setup/config/params'
import { messageShow } from '../../../../common/api/actions'
import { get } from '../../../../kanban/api/actions/query'
import { remind } from '../../../../interview/api/actions/mutation'
import Loading from '../../../../common/Loading'
import EmptyMessage from '../../../../common/EmptyMessage'
import CandidateViewFields from '../../../../candidate/Manage/View/ViewFields'
import InterviewViewFields from '../../../../interview/Manage/View/ViewFields'

// Component
class Details extends PureComponent {

  constructor(props) {
    super(props)

    this.state = {
      tab: 'candidate'
    }
  }

  componentDidMount() {
    this.refresh()
  }

  refresh = (isLoading = true) => {
    const { kanbanId, get } = this.props

    get(kanbanId, isLoading)
  }

  tabSwitch = (event, tab) => {
    this.setState({ tab })
  }

  status = (status) => {
    return params.kanban.columns.filter(column => column.key === status)[0]
  }

  modeName = (mode) => {
    return params.interview.modes.filter(item => item.key === mode)[0].name
  }

  remind = interview => async () => {
    let check = confirm('Are you sure you want to send reminder email to the candidate and interviewer?')

    if(check) {
      const { messageShow, remind } = this.props

      messageShow('Sending reminder emails, please wait..')

      try {
        const { data } = await remind({ id: interview._id })

        if(data.errors && data.errors.length > 0) {
          messageShow(data.errors[0].message)
        } else {
          messageShow('Reminder emails sent successfully.')
        }
      } catch(error) {
        messageShow('There was some error. Please try again.')
      }
    }
  }

  render() {
    const { classes, kanban: { isLoading, item: { candidateId, interviews, status, highlight } }, toggleDrawer } = this.props
    const { tab } = this.state

    return (
      <div className={classes.root}>
        {
          isLoading
            ? <Loading />
            : <React.Fragment>
                <div className={classes.tabs}>
                  <Tabs
                    value={tab}
                    onChange={this.tabSwitch}
                  >
                    <Tab label={'Candidate'} value={'candidate'} style={{ minWidth: 'auto' }} />
                    <Tab label={'Interview'} value={'interview'} style={{ minWidth: 'auto' }} />
                  </Tabs>
                </div>

                <div className={classes.tabContent}>
                  {
                    {
                      candidate:
                        <React.Fragment>
                          {
                            candidateId && candidateId._id &&
                            <div>
                              {/* Status */}
                              <div className={classes.item}>
                                <Typography variant={'caption'} gutterBottom>
                                  Status
                                </Typography>

                                <Typography gutterBottom>
                                  { this.status(status).name }

                                  <IconRadioButtonChecked style={{ color: this.status(status).color, float: 'right', paddingBottom: 4 }} />
                                </Typography>
                              </div>

                              <CandidateViewFields candidate={candidateId} />
                            </div>
                          }
                        </React.Fragment>,

                      interview:
                        <React.Fragment>
                          {
                            interviews && interviews.length > 0
                              ? <React.Fragment>
                                  { interviews.map((interview, i) => (
                                    <div key={interview._id} className={classes.interview} style={ i === interviews.length - 1 ? { marginBottom: 0 } : {} }>
                                      <div className={classes.interviewNumber}>
                                        <Typography variant={'button'}>
                                          Interview #{ i+1 }
                                        </Typography>
                                      </div>

                                      <div className={classes.interviewContent}>
                                        <InterviewViewFields interview={interview} />

                                        <div className={classes.interviewContentActions}>
                                          <Button color={'primary'} onClick={this.remind(interview)}>Remind</Button>
                                        </div>
                                      </div>
                                    </div>
                                  )) }
                                </React.Fragment>
                              : <EmptyMessage message={'No interview has been scheduled for this candidate.'} />
                          }
                        </React.Fragment>
                    }[tab]
                  }


                </div>
              </React.Fragment>
        }

        <div className={classes.action}>
          <Tooltip title={'Close'} placement={'top'} enterDelay={500}>
            <IconButton
              aria-label={'Close'}
              onClick={toggleDrawer(false)}
            >
              <IconClose />
            </IconButton>
          </Tooltip>
        </div>
      </div>
    )
  }
}

// Component Properties
Details.propTypes = {
  classes: PropTypes.object.isRequired,
  kanbanId: PropTypes.string,
  toggleDrawer: PropTypes.func.isRequired,
  kanban: PropTypes.object.isRequired,
  get: PropTypes.func.isRequired,
  remind: PropTypes.func.isRequired,
  messageShow: PropTypes.func.isRequired
}

// Component State
function detailsState(state) {
  return {
    kanban: state.kanban
  }
}

export default connect(detailsState, { get, remind, messageShow })(withStyles(styles)(Details))