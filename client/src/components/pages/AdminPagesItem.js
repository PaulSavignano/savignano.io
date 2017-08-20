import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { reduxForm, Field } from 'redux-form'
import { Card } from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'

import renderSuccessableTextField from '../../components/fields/renderSuccessableTextField'
import { fetchUpdate, fetchDelete } from '../../actions/pages'

class AdminPagesItem extends Component {
  state = {
    elevation: 1
  }
  handleMouseEnter = () => this.setState({ elevation: 4 })
  handleMouseLeave = () => this.setState({ elevation: 1 })
  render() {
    const { dispatch, handleSubmit, item, dirty } = this.props
    const { _id, slug } = item
    return (
      <Card
        zDepth={this.state.elevation}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        className="vertical-card"
      >
        <form
          onBlur={handleSubmit((values) => {
            if (dirty) return dispatch(fetchUpdate(_id, values))
          })}
          style={{ display: 'flex', flexFlow: 'row wrap', alignItems: 'center', padding: '8px 8px 16px 8px' }}
        >
          <Field
            name="name"
            label="Name"
            type="text"
            component={renderSuccessableTextField}
          />
          <div>
            <RaisedButton
              onTouchTap={() => dispatch(push(`/admin/pages/${slug}`))}
              type="button"
              label="Edit"
              style={{ margin: 4 }}
              primary={true}
            />
            <RaisedButton
              onTouchTap={() => dispatch(fetchDelete(_id))}
              type="button"
              label="X"
              className="delete-button"
              style={{ margin: 4 }}
              primary={true}
            />
          </div>
        </form>
      </Card>
    )
  }
}

AdminPagesItem = compose(
  connect((state, { item: { _id, name }}) => ({
    form: `page_${_id}`,
    initialValues: { name }
  })),
  reduxForm({
    destroyOnUnmount: false,
    asyncBlurFields: []
  })
)(AdminPagesItem)

export default AdminPagesItem
